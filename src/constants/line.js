import { SATELLITES_GEOJSON } from './satellites'

const ORIG_CENTER = [187, 29]

const coordinates = SATELLITES_GEOJSON.features.map((geo) => {
	if (geo.geometry.coordinates[0] < 0)
		return [geo.geometry.coordinates[0] + 360, geo.geometry.coordinates[1]]
	else return geo.geometry.coordinates
})

export const LINE_GEOJSON = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: { active: false },
			geometry: {
				type: 'LineString',
				coordinates: [coordinates[0], ORIG_CENTER],
			},
		},
		{
			type: 'Feature',
			properties: { active: false },
			geometry: {
				type: 'LineString',
				coordinates: [coordinates[1], ORIG_CENTER],
			},
		},
		{
			type: 'Feature',
			properties: { active: false },
			geometry: {
				type: 'LineString',
				coordinates: [coordinates[2], ORIG_CENTER],
			},
		},
		{
			type: 'Feature',
			properties: { active: false },
			geometry: {
				type: 'LineString',
				coordinates: [coordinates[3], ORIG_CENTER],
			},
		},
		{
			type: 'Feature',
			properties: { active: false },
			geometry: {
				type: 'LineString',
				// coordinates: [[-121.872734, 37.304051], ORIG_CENTER],
				coordinates: [coordinates[4], ORIG_CENTER],
			},
		},
	],
}
