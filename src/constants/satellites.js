import sanJose from '@/assets/images/san-jose.png'
import tokyo from '@/assets/images/tokyo.png'
import taipei from '@/assets/images/taipei.png'
import hsinchu1 from '@/assets/images/hsinchu-1.png'
import hsinchu2 from '@/assets/images/hsinchu-2.png'
import fishingVessel from '@/assets/images/fishing-vessel.png'

export const SATELLITES_GEOJSON = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: {
				id: 'san-jose',
				index: 0,
				title: '工研院北美公司',
				addr: '2880 Zanker Rd., Suite 103, San Jose, CA 95134, USA',
				link: 'https://cn.vuejs.org/guide/extras/render-function.html#creating-vnodes',
				imgSrc: sanJose,
				zoomInOffset: 0.5,
			},
			geometry: {
				type: 'Point',
				coordinates: [-121.92837365593896, 37.39600619363903],
			},
		},
		{
			type: 'Feature',
			properties: {
				id: 'tokyo',
				index: 1,
				title: 'Japan NSW',
				addr: '31-11, Sakuragaoka-cho, Shibuya-ku,Tokyo 150-8577, Japan',
				link: 'https://cn.vuejs.org/guide/extras/render-function.html#creating-vnodes',
				imgSrc: tokyo,
				zoomInOffset: 0.6,
			},
			geometry: {
				type: 'Point',
				coordinates: [139.69761973819297, 35.65602275982115],
			},
		},
		{
			type: 'Feature',
			properties: {
				id: 'taipei',
				index: 2,
				title: '台北科技大樓',
				addr: '台北市大安區和平東路二段106號',
				link: 'https://cn.vuejs.org/guide/extras/render-function.html#creating-vnodes',
				imgSrc: taipei,
				zoomInOffset: 0.1,
			},
			geometry: {
				type: 'Point',
				coordinates: [121.54191961050292, 25.02487552113985],
			},
		},
		{
			type: 'Feature',
			properties: {
				id: 'hsinchu-1',
				index: 3,
				title: '工研院中興院區 52館',
				addr: '新竹縣竹東鎮中興路四段195號',
				link: 'https://cn.vuejs.org/guide/extras/render-function.html#creating-vnodes',
				imgSrc: hsinchu1,
				zoomInOffset: 0.0045,
			},
			geometry: {
				type: 'Point',
				coordinates: [121.04558344530174, 24.774150883364698],
			},
		},
		{
			type: 'Feature',
			properties: {
				id: 'hsinchu-2',
				index: 4,
				title: '工研院中興院區 11館',
				addr: '新竹縣竹東鎮中興路四段195號',
				link: 'https://cn.vuejs.org/guide/extras/render-function.html#creating-vnodes',
				imgSrc: hsinchu2,
				zoomInOffset: -0.002,
			},
			geometry: {
				type: 'Point',
				coordinates: [121.04198203090866, 24.7766090283384],
			},
		},
		{
			type: 'Feature',
			properties: {
				id: 'samoa',
				index: 5,
				title: '漁船 滿福財168號',
				addr: '美屬薩摩亞',
				link: 'https://cn.vuejs.org/guide/extras/render-function.html#creating-vnodes',
				imgSrc: fishingVessel,
				zoomInOffset: 2,
			},
			geometry: {
				type: 'Point',
				coordinates: [-170.728521060946, -14.304210114554248],
			},
		},
	],
}
