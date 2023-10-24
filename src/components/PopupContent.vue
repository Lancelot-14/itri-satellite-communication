<template>
	<v-sheet style="position: relative">
		<div class="text-h6 font-weight-bold text-primary mb-2">
			{{ title }}
		</div>
		<v-btn variant="tonal" color="secondary" block @click="videoDialog = true">Video</v-btn>

		<v-img
			min-width="600"
			min-height="600"
			:src="imgSrc"
			style="position: absolute; left: calc(100% + 20px); top: 0; transform: translateY(-40%)"
		></v-img>

		<v-dialog min-width="700" max-width="1000" v-model="videoDialog">
			<v-card>
				<video controls>
					<source :src="videoSrc" type="video/mp4" />
				</video>
			</v-card>
		</v-dialog>
	</v-sheet>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { VSheet, VBtn, VImg, VDialog, VCard } from 'vuetify/components'

export default defineComponent({
	name: 'Component',
	components: {},
	emits: {},
	props: {
		title: String,
		videoSrc: String,
		imgSrc: String,
	},
	data() {
		return { count: 1 }
	},
	methods: {
		increment() {
			this.count++
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
