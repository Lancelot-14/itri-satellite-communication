import sanJose from '@/assets/images/san-jose.png'
import tokyo from '@/assets/images/tokyo.png'
import taipei from '@/assets/images/taipei.png'
import hsinchu1 from '@/assets/images/hsinchu-1.png'
import hsinchu2 from '@/assets/images/hsinchu-2.png'
import fishingVessel from '@/assets/images/fishing-vessel.png'

import video1 from '@/assets/videos/1.mp4'

export const SATELLITES_GEOJSON = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: {
				id: 'san-jose',
				index: 0,
				title: '北美聖荷西辦公室',
				addr: '2880 Zanker Rd., Suite 103, San Jose, CA 95134, USA',
				videoSrc: video1,
				imgSrc: sanJose,
				zoom: 8,
				zoomInLngOffset: 0.5,
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
				title: '日本東京辦公室',
				addr: '31-11, Sakuragaoka-cho, Shibuya-ku,Tokyo 150-8577, Japan',
				videoSrc: video1,
				imgSrc: tokyo,
				zoom: 8,
				zoomInLngOffset: 0.6,
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
				title: '台北科技大樓 (指揮中心)',
				addr: '台北市大安區和平東路二段106號',
				videoSrc: video1,
				imgSrc: taipei,
				zoom: 11,
				zoomInLngOffset: 0.1,
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
				title: '工研院 52館 (ST-2)',
				addr: '新竹縣竹東鎮中興路四段195號',
				videoSrc: video1,
				imgSrc: hsinchu1,
				zoom: 16,
				zoomInLngOffset: 0.0025,
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
				title: '工研院 11館 (銥衛星)',
				addr: '新竹縣竹東鎮中興路四段195號',
				videoSrc: video1,
				imgSrc: hsinchu2,
				zoom: 16,
				zoomInLngOffset: 0.003,
			},
			geometry: {
				type: 'Point',
				coordinates: [121.04198203090866, 24.7766090283384],
			},
		},
		{
			type: 'Feature',
			properties: {
				id: 'hsinchu-3',
				index: 5,
				title: '工研院 14館 衛星專網雲端中心',
				addr: '新竹縣竹東鎮中興路四段195號',
				videoSrc: video1,
				imgSrc: hsinchu1,
				zoom: 16,
				zoomInLngOffset: 0.0025,
			},
			geometry: {
				type: 'Point',
				coordinates: [121.04323110011892, 24.77708156728869],
			},
		},
		{
			type: 'Feature',
			properties: {
				id: 'hsinchu-4',
				index: 6,
				title: '工研院 51館 衛星專網網管中心',
				addr: '新竹縣竹東鎮中興路四段195號',
				videoSrc: video1,
				imgSrc: hsinchu1,
				zoom: 16,
				zoomInLngOffset: 0.0025,
			},
			geometry: {
				type: 'Point',
				coordinates: [121.04412155550291, 24.773624964402003],
			},
		},
		{
			type: 'Feature',
			properties: {
				id: 'hsinchu-5',
				index: 7,
				title: '工研院 53館 衛星專網測試中心',
				addr: '新竹縣竹東鎮中興路四段195號',
				videoSrc: video1,
				imgSrc: hsinchu1,
				zoom: 16,
				zoomInLngOffset: 0.0025,
			},
			geometry: {
				type: 'Point',
				coordinates: [121.04443540630373, 24.775067983213543],
			},
		},
		{
			type: 'Feature',
			properties: {
				id: 'samoa',
				index: 8,
				title: '漁船 滿福財168號',
				addr: '美屬薩摩亞',
				videoSrc: video1,
				imgSrc: fishingVessel,
				zoom: 6,
				zoomInLngOffset: 2,
			},
			geometry: {
				type: 'Point',
				coordinates: [-170.728521060946, -14.304210114554248],
			},
		},
	],
}
