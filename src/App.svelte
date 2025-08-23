<script lang="ts">
  import Sidebar from "./lib/components/Sidebar.svelte";
  import MainContent from "./lib/components/MainContent.svelte";
  import VocabularyPage from "./lib/pages/Vocabulary.svelte";
  import PetShopPage from "./lib/pages/PetShop.svelte";
  import HomePage from "./lib/pages/Home.svelte";
  import { currentRoute } from "./lib/stores/router";
</script>

{#if $currentRoute === 'main'}
  <div class="h-screen bg-color-bg text-color-text" data-theme="chrome">
    <div class="p-4">
      <MainContent />
    </div>
  </div>
{:else}
  <div class="h-screen bg-color-bg text-color-text flex min-w-0" data-theme="chrome">
    <Sidebar />
    
    {#if $currentRoute === 'vocabulary'}
      <VocabularyPage />
    {:else if $currentRoute === 'petshop'}
      <PetShopPage />
    {:else if $currentRoute === 'settings'}
      <HomePage />
    {/if}
  </div>
{/if}