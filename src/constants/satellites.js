import sanJose from '@/assets/images/san_jose.png'
import tokyo from '@/assets/images/tokyo.png'
import taipei from '@/assets/images/taipei.png'
import itri11 from '@/assets/images/itri-11.png'
import itri14 from '@/assets/images/itri-14.png'
import itri51 from '@/assets/images/itri-51.png'
import itri52 from '@/assets/images/itri-52.png'
import itri53 from '@/assets/images/itri-53.png'
import fishingVessel from '@/assets/images/fishing_vessel.png'

import fishingVesselVideo1 from '@/assets/videos/168-1_fishing_vessel.mp4'
import JPVideo1 from '@/assets/videos/JP-1_pexip_Sat-StarlinkJP.mp4'
import JPVideo2 from '@/assets/videos/JP-2_Pexip_Starlink-JP_JP-NSW-Side.mp4'
import JPVideo3 from '@/assets/videos/JP-3_Streaming_Sat-StarlinkJP.mp4'
import MgnCenterVideo1 from '@/assets/videos/MgnCenter-1_pexip_SatMgnCenter.mp4'
import MgnCenterVideo2 from '@/assets/videos/MgnCenter-2_Pexip_Starlink-JP_TW-ITRI-Side.mp4'
import MgnCenterVideo3 from '@/assets/videos/MgnCenter-3_SatelliteManagementCenter-DEMO.mp4'

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
				videoSrc: [
					{
						title: '海上場域 滿福財168 漁船捕魚影片 (2023/10/24)',
						src: fishingVesselVideo1,
					},
				],
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
				videoSrc: [
					{
						title: '五方視訊會議 日本東京辦公室',
						src: JPVideo1,
					},
					{
						title: '兩方視訊會議 日本端',
						src: JPVideo2,
					},
					{
						title: '直播 日本端',
						src: JPVideo3,
					},
				],
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
				videoSrc: [
					{
						title: '海上場域 滿福財168 漁船捕魚影片 (2023/10/24)',
						src: fishingVesselVideo1,
					},
				],
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
				videoSrc: [
					{
						title: '海上場域 滿福財168 漁船捕魚影片 (2023/10/24)',
						src: fishingVesselVideo1,
					},
				],
				imgSrc: itri52,
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
				videoSrc: [
					{
						title: '海上場域 滿福財168 漁船捕魚影片 (2023/10/24)',
						src: fishingVesselVideo1,
					},
				],
				imgSrc: itri11,
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
				videoSrc: [
					{
						title: '海上場域 滿福財168 漁船捕魚影片 (2023/10/24)',
						src: fishingVesselVideo1,
					},
				],
				imgSrc: itri14,
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
				videoSrc: [
					{
						title: '五方視訊會議 網管中心端',
						src: MgnCenterVideo1,
					},
					{
						title: '兩方視訊會議 台灣端',
						src: MgnCenterVideo2,
					},
					{
						title: '網管操作',
						src: MgnCenterVideo3,
					},
				],
				imgSrc: itri51,
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
				videoSrc: [
					{
						title: '海上場域 滿福財168 漁船捕魚影片 (2023/10/24)',
						src: fishingVesselVideo1,
					},
				],
				imgSrc: itri53,
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
				videoSrc: [
					{
						title: '海上場域 滿福財168 漁船捕魚影片 (2023/10/24)',
						src: fishingVesselVideo1,
					},
				],
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
