import './app.css'
import PopupApp from './PopupApp.svelte'

const app = new PopupApp({
  target: document.getElementById('popup')!,
})

export default app