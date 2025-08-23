import { mount } from 'svelte'
import App from './App.svelte'
import { navigateTo } from './lib/stores/router'

// Vocabulary page functionality
document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('app')
  if (target) {
    navigateTo('vocabulary');
    mount(App, { target })
  }
})