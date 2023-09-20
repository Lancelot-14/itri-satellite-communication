<template>
	<v-container class="ma-0 pa-0 fill-height">
		<div ref="map" id="map"></div>
		<v-card class="tool-card mt-3 ml-3" max-width="200">
			<v-list variant="tonal" density="compact" active-class="bg-info" class="pa-0">
				<v-list-item
					v-for="item in items"
					:key="item.value"
					:value="item.value"
					:active="activeItem === item.value"
					@click="zoomTo(item.value)"
				>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-card>
	</v-container>
</template>

<script setup>
import { onMounted, onUnmounted, ref, h, render } from 'vue'
import mapboxgl from 'mapbox-gl'

import PopupContent from '@/components/PopupContent.vue'

import { pulsingDot } from '@/assets/scripts/pulsingDot'

import { SATELLITES_GEOJSON, LINE_GEOJSON } from '@/constants'
import { ORIG_CENTER, ORIG_ZOOM } from '@/constants'

import cloud from '@/assets/images/cloud-network.png'

/** data */
const items = [
	{
		title: 'View All',
		value: -1,
	},
	...SATELLITES_GEOJSON.features.map((f) => ({
		title: f.properties.title,
		value: f.properties.index,
	})),
]

const map = ref(null)
const activeItem = ref(-1)
/** end of data */

/** methods */
const loadPulsingDots = (map) => {
	map.addImage('pulsing-dot', pulsingDot(map, 200, '72, 202, 228', '138, 226, 234', 0.3), {
		pixelRatio: 2,
	})
	map.addImage('pulsing-dot-cluster-1', pulsingDot(map, 200, '0, 119, 182', '0, 119, 182', 0.35), {
		pixelRatio: 2,
	})
	map.addImage('pulsing-dot-cluster-2', pulsingDot(map, 200, '0, 119, 182', '0, 119, 182', 0.45), {
		pixelRatio: 2,
	})
}

// const createPopupContent = (title, addr, link) => h(PopupContent, { title, addr, link })
// console.log(createPopupContent('1', '2', '3'))

// const enableLineAnimation = (layerId) => {
// 	var step = 0
// 	let dashArraySeq = [
// 		[0, 4, 3],
// 		[1, 4, 2],
// 		[2, 4, 1],
// 		[3, 4, 0],
// 		[0, 1, 3, 3],
// 		[0, 2, 3, 2],
// 		[0, 3, 3, 1],
// 	]
// 	setInterval(() => {
// 		step = (step + 1) % dashArraySeq.length
// 		map.value.setPaintProperty(layerId, 'line-dasharray', dashArraySeq[step])
// 	}, 50)
// }

const setActiveLine = (idx) => {
	LINE_GEOJSON.features.forEach((f) => {
		f.properties.active = false
	})
	if (idx !== -1) LINE_GEOJSON.features[idx].properties.active = true
	map.value.getSource('line').setData(LINE_GEOJSON)
}

const zoomTo = (idx) => {
	const slowFly = (activeItem.value < 2 && idx > 1) || (activeItem.value > 1 && idx < 2)

	activeItem.value = idx
	setActiveLine(idx)

	const coordinates = idx < 0 ? ORIG_CENTER : SATELLITES_GEOJSON.features[idx].geometry.coordinates
	const offset = idx < 0 ? 0 : SATELLITES_GEOJSON.features[idx].properties.zoomInLngOffset
	map.value.flyTo({
		center: [coordinates[0] + offset, coordinates[1]],
		duration: slowFly && idx !== -1 ? 6000 : 3500,
		zoom: idx === -1 ? ORIG_ZOOM : SATELLITES_GEOJSON.features[idx].properties.zoom,
		essential: true, // this animation is considered essential with respect to prefers-reduced-motion
	})

	showPopup(idx, coordinates)
}

const showPopup = (idx, coordinates) => {
	for (let popup of document.getElementsByClassName('mapboxgl-popup')) {
		popup.remove()
	}
	if (idx > -1) {
		new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(
				`
				<div class="text-h6 font-weight-bold text-primary mb-2">
					${SATELLITES_GEOJSON.features[idx].properties.title}
				</div>
				<div class="text-caption text-grey mb-2">
					<div>${SATELLITES_GEOJSON.features[idx].properties.addr}</div>
				</div>
				<div class="text-right">
					<a href="${
						SATELLITES_GEOJSON.features[idx].properties.link
					}" target="_blank" class="text-info text-decoration-none">More Info ➜</a>
				</div>
				<img class="popup-img ${idx === 4 ? 'popup-img--left' : ''}" width="600" src="${
					SATELLITES_GEOJSON.features[idx].properties.imgSrc
				}" />
				`
			)
			.addTo(map.value)
	}
}

const loadSatellites = () => {
	// satellites
	map.value.addSource('satellites', {
		type: 'geojson',
		data: SATELLITES_GEOJSON,
		cluster: true,
		clusterMaxZoom: 20, // Max zoom to cluster points on
		clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
	})

	map.value.addLayer({
		id: 'clusters',
		type: 'symbol',
		source: 'satellites',
		filter: ['has', 'point_count'],
		layout: {
			'icon-image': [
				'step',
				['get', 'point_count'],
				'pulsing-dot-cluster-1',
				3,
				'pulsing-dot-cluster-2',
			],
			'icon-allow-overlap': true,
		},
	})

	map.value.addLayer({
		id: 'unclustered-point',
		type: 'symbol',
		source: 'satellites',
		filter: ['!', ['has', 'point_count']],
		layout: {
			'icon-image': 'pulsing-dot',
			'icon-allow-overlap': true,
		},
	})

	map.value.addLayer({
		id: 'cluster-count',
		type: 'symbol',
		source: 'satellites',
		filter: ['has', 'point_count'],
		layout: {
			'text-field': ['get', 'point_count_abbreviated'],
			'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
			'text-size': 16,
		},
		paint: {
			'text-color': '#ffffff',
		},
	})

	map.value.on('click', 'clusters', (e) => {
		const features = map.value.queryRenderedFeatures(e.point, {
			layers: ['clusters'],
		})
		const clusterId = features[0].properties.cluster_id
		map.value.getSource('satellites').getClusterExpansionZoom(clusterId, (err, zoom) => {
			if (err) return

			if (clusterId === 11) zoom = 8
			if (clusterId === 50) zoom = 14
			map.value.easeTo({
				center: features[0].geometry.coordinates,
				zoom: zoom,
			})
			map.value.triggerRepaint()
		})
	})

	map.value.on('click', 'unclustered-point', (e) => {
		const activeIdx = e.features[0].properties.index
		zoomTo(activeIdx)
		// map.value.setPaintProperty(layerId, 'line-dasharray', dashArraySeq[step])
	})

	// change cursor style
	map.value.on('mouseenter', 'clusters', () => {
		map.value.getCanvas().style.cursor = 'pointer'
	})
	map.value.on('mouseleave', 'clusters', () => {
		map.value.getCanvas().style.cursor = ''
	})
	map.value.on('mouseenter', 'unclustered-point', () => {
		map.value.getCanvas().style.cursor = 'pointer'
	})
	map.value.on('mouseleave', 'unclustered-point', () => {
		map.value.getCanvas().style.cursor = ''
	})
}

const loadLines = () => {
	// line
	map.value.addSource('line', {
		type: 'geojson',
		data: LINE_GEOJSON,
	})

	// add the line which will be modified in the animation
	map.value.addLayer(
		{
			id: 'internet-line',
			type: 'line',
			source: 'line',
			layout: {
				// 'line-cap': 'round',
				// 'line-join': 'round',
			},
			paint: {
				'line-color': ['case', ['boolean', ['get', 'active'], false], '#FFE66F', '#fff'],
				'line-width': 4,
				'line-opacity': ['case', ['boolean', ['get', 'active'], false], 1, 0.6],
				'line-dasharray': [3, 2],
			},
		},
		'clusters'
	)
}

const loadClouds = async () => {
	// cloud
	await map.value.loadImage(cloud, (err, image) => {
		if (err) throw err

		map.value.addImage('cloud', image, {
			pixelRatio: 1.5,
		})

		map.value.addSource('cloud', {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: {
							type: 'Point',
							coordinates: [187, 29],
						},
					},
				],
			},
		})

		map.value.addLayer({
			id: 'internet-cloud',
			type: 'symbol',
			source: 'cloud',
			layout: {
				'icon-image': 'cloud',
				'icon-allow-overlap': true,
			},
		})
	})
}
/** end of methods */

/** lifecycles */
onMounted(() => {
	mapboxgl.accessToken =
		'pk.eyJ1IjoiYmFja3RvMTk5NyIsImEiOiJjbGE0NTZid2YwOTI4M25tbGJkMXdoZTMxIn0.hHOxXEG2GlwC0vw3IEGWiw'
	map.value = new mapboxgl.Map({
		container: 'map', // container ID
		style: 'mapbox://styles/mapbox/dark-v10', // style URL
		center: ORIG_CENTER, // starting position [lng, lat]
		zoom: ORIG_ZOOM, // starting zoom
		minZoom: 1.8,
	})

	map.value.on('load', () => {
		loadPulsingDots(map.value)
		loadSatellites()
		loadClouds()
		loadLines()

		// enableLineAnimation('internet-line')
	})
})
</script>

<style lang="scss" scoped>
#map {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.tool-card {
	position: absolute;
	top: 0;
	left: 0;
}

.v-list-item:first-of-type {
	border-bottom: 3px solid #fff;
	padding: 12px;
}
</style>

<style>
* {
	font-family: 'Noto Sans TC' !important;
}

.mapboxgl-popup-content {
	padding: 28px 16px 16px 16px;
	font-size: 14px;
	line-height: 1.5;
}

.mapboxgl-popup-close-button {
	height: 20px;
	width: 20px;
	margin: 8px 8px 0 0;
}

.popup-img {
	position: absolute;
	top: -50%;
	left: 102%;
	max-width: 500px;
	transform: translateY(-15%);
}

.popup-img--left {
	left: -230%;
}
</style>
