<script lang="ts">
  import MainContent from './lib/components/MainContent.svelte';
  import { onMount } from 'svelte';

  // Check if user is logged in, if not redirect to tab
  function checkLoginStatus() {
    // For now, assume user needs to login and redirect to tab
    chrome.tabs.create({ url: chrome.runtime.getURL('index.html#sign') });
    window.close();
  }

  // For now, always show login check
  // In a real app, you'd check stored authentication state
  let isLoggedIn = false;

  onMount(() => {
    if (!isLoggedIn) {
      checkLoginStatus();
    }
  });
</script>

{#if isLoggedIn}
  <MainContent />
{:else}
  <div class="flex items-center justify-center p-8">
    <p class="text-gray-600">로그인 페이지로 이동 중...</p>
  </div>
{/if}