import { mount } from 'svelte'
import App from './App.svelte'
import { navigateTo } from './lib/stores/router'

// Settings page functionality
document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('app')
  if (target) {
    navigateTo('settings');
    mount(App, { target })
  }
})