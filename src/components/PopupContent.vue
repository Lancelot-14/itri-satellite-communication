<template>
	<v-sheet style="position: relative">
		<div class="text-h6 font-weight-bold text-primary mb-2">
			{{ title }}
		</div>
		<v-btn
			v-for="(videoSrc, idx) in videoSrcList"
			:key="videoSrc.title"
			class="mb-1"
			variant="tonal"
			color="secondary"
			size="small"
			block
			@click="setVideoSrc(videoSrc.src)"
		>
			Video {{ idx + 1 }}

			<v-tooltip activator="parent" location="left">{{ videoSrc.title }}</v-tooltip>
		</v-btn>

		<v-img
			min-width="600"
			min-height="600"
			:src="imgSrc"
			style="position: absolute; left: calc(100% + 20px); top: 0; transform: translateY(-40%)"
		></v-img>

		<v-dialog v-model="videoDialog" min-width="700" max-width="1000" max-height="600">
			<v-card>
				<video height="600" controls>
					<source :src="selectedSrc" type="video/mp4" />
				</video>
			</v-card>
		</v-dialog>
	</v-sheet>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Component',
	components: {},
	emits: {},
	props: {
		title: String,
		videoSrcList: Array,
		imgSrc: String,
	},
	data() {
		return { selectedSrc: '', videoDialog: false }
	},
	methods: {
		setVideoSrc(src) {
			this.selectedSrc = src
			this.videoDialog = true
		},
	},
})
</script>

<style scoped>
.v-img {
	position: absolute;
	left: 100%;
}
</style>
