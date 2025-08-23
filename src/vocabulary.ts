import './app.css'
import { mount } from 'svelte'
import VocabularyApp from './VocabularyApp.svelte'

// Vocabulary page functionality
document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('app')
  if (target) {
    mount(VocabularyApp, { target })
  }
})