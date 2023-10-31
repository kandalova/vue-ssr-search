import { createSSRApp } from 'vue'
import './style.css'
import App from './App.vue'

export function createApp() {
	const app = createSSRApp(App);
	return { app };
}
