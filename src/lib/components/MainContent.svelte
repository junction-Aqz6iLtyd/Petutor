<script lang="ts">
  import { onMount } from 'svelte';

  let count = $state(0)

  function increment() {
    count++;
    console.log('increment', count);
  }

  onMount(() => {
    console.log('MainContent mounted');
  });
</script>

<div class="bg-chrome-surface rounded-lg border border-chrome-border shadow-lg">
  <div class="p-6">
    <h2 class="text-xl font-medium text-chrome-text mb-2">Chrome Extension</h2>
    <p class="text-chrome-text-secondary mb-6">Welcome to your Svelte-powered Chrome extension!</p>
    <div class="flex items-center gap-4">
      <button 
        class="px-4 py-2 bg-chrome-accent hover:bg-opacity-80 text-white rounded-md transition-all duration-200 hover:shadow-md font-medium" 
        onclick={increment}
      >
        Count: {count}
      </button>
    </div>
  </div>
</div>
