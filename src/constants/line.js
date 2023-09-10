const origCenter = [185, 29]

const generateCoordinates = (loc) => {
	const lngOffset = origCenter[0] - loc[0]
	const latOffset = origCenter[1] - loc[1]
}

export const LINE_GEOJSON = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: { active: false },
			geometry: {
				type: 'LineString',
				coordinates: [[121.5598, 25.09108], origCenter],
			},
		},
		{
			type: 'Feature',
			properties: { active: false },
			geometry: {
				type: 'LineString',
				coordinates: [[120.9647, 24.80395], origCenter],
			},
		},
		{
			type: 'Feature',
			properties: { active: false },
			geometry: {
				type: 'LineString',
				coordinates: [[120.9647, 24.81395], origCenter],
			},
		},
		{
			type: 'Feature',
			properties: { active: false },
			geometry: {
				type: 'LineString',
				coordinates: [[139.7036319, 35.6937632], origCenter],
			},
		},
		{
			type: 'Feature',
			properties: { active: false },
			geometry: {
				type: 'LineString',
				// coordinates: [[-121.872734, 37.304051], origCenter],
				coordinates: [[238.127266, 37.304051], origCenter],
			},
		},
	],
}
