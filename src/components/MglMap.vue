<template>
	<v-container class="ma-0 pa-0 fill-height">
		<div ref="map" id="map"></div>
		<v-card class="tool-card mt-3 ml-3" max-width="200">
			<v-list density="compact" v-model="activeItem">
				<v-list-item
					v-for="item in items"
					:key="item.value"
					:value="item.value"
					:class="{ 'bg-info': item.value === -1 }"
					@click="zoomTo(item.value)"
				>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-card>
	</v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl'

import { pulsingDot } from '@/assets/scripts/pulsingDot'

import { SATELLITES_GEOJSON, LINE_GEOJSON } from '@/constants'

/** data */
const items = [
	{
		title: 'View All',
		value: -1,
	},
	{
		title: 'Taipei',
		value: 0,
	},
	{
		title: 'Hsinchu-1',
		value: 1,
	},
	{
		title: 'Hsinchu-2',
		value: 2,
	},
	{
		title: 'Tokyo',
		value: 3,
	},
	{
		title: 'San Jose',
		value: 4,
	},
]

import cloud from '@/assets/images/cloud.png'
const cloudImage = new Image()
cloudImage.src = cloud

const map = ref(null)
const activeItem = ref(-1)

const origCenter = [-175, 29]
const origZoom = 2.3
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

const enableLineAnimation = (layerId) => {
	var step = 0
	let dashArraySeq = [
		[0, 4, 3],
		[1, 4, 2],
		[2, 4, 1],
		[3, 4, 0],
		[0, 1, 3, 3],
		[0, 2, 3, 2],
		[0, 3, 3, 1],
	]
	setInterval(() => {
		step = (step + 1) % dashArraySeq.length
		map.value.setPaintProperty(layerId, 'line-dasharray', dashArraySeq[step])
	}, 50)
}

const setActiveLine = (idx) => {
	LINE_GEOJSON.features.forEach((f) => {
		f.properties.active = false
	})
	if (idx !== -1) LINE_GEOJSON.features[idx].properties.active = true
	map.value.getSource('line').setData(LINE_GEOJSON)
}

const zoomTo = (idx) => {
	activeItem.value = idx
	setActiveLine(idx)

	const coordinates = idx < 0 ? origCenter : SATELLITES_GEOJSON.features[idx].geometry.coordinates

	const zoom = idx < 0 ? origZoom : idx < 3 ? (idx === 0 ? 8 : 13) : 6
	map.value.flyTo({
		center: coordinates,
		duration: 3000,
		zoom: zoom,
		essential: true, // this animation is considered essential with respect to prefers-reduced-motion
	})

	if (idx > -1) {
		new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(
				`Name: ?<br>Link: <a href="">https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addlayer</a>`
			)
			.addTo(map.value)
	}
}
/** end of methods */

/** lifecycles */
onMounted(() => {
	mapboxgl.accessToken =
		'pk.eyJ1IjoiYmFja3RvMTk5NyIsImEiOiJjbGE0NTZid2YwOTI4M25tbGJkMXdoZTMxIn0.hHOxXEG2GlwC0vw3IEGWiw'
	map.value = new mapboxgl.Map({
		container: 'map', // container ID
		style: 'mapbox://styles/mapbox/dark-v10', // style URL
		center: origCenter, // starting position [lng, lat]
		zoom: origZoom, // starting zoom
		minZoom: 1.5,
	})

	map.value.on('load', () => {
		loadPulsingDots(map.value)

		// satellites
		map.value.addSource('satellites', {
			type: 'geojson',
			data: SATELLITES_GEOJSON,
			cluster: true,
			clusterMaxZoom: 14, // Max zoom to cluster points on
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
				map.value.easeTo({
					center: features[0].geometry.coordinates,
					zoom: zoom,
				})
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

		// cloud
		map.value.addImage('cloud', cloudImage, {
			pixelRatio: 2.2,
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
							coordinates: origCenter,
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
</style>

<style>
.mapboxgl-popup-content {
	padding: 12px 24px 12px 12px;
}

.mapboxgl-popup-close-button {
	height: 20px;
	width: 20px;
	margin: 4px 4px 0 0;
}
</style>
