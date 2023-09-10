/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Style
import '@/assets/styles/main.css'
import 'mapbox-gl/dist/mapbox-gl.css'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
