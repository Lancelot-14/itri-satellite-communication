<template>
	<v-sheet>
		<div class="text-h6 text-primary mb-2">
			{{ title }}
		</div>
		<div class="text-caption text-grey mb-2">
			{{ addr }}
		</div>
		<a :href="link" target="_blank">{{ link }}</a>
	</v-sheet>
</template>

<script setup>
const props = defineProps(['title', 'addr', 'link'])
</script>
