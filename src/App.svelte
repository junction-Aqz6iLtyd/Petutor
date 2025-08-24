<script lang="ts">
  import Sidebar from "./lib/components/Sidebar.svelte";
  import MainContent from "./lib/components/MainContent.svelte";
  import VocabularyPage from "./lib/pages/Vocabulary.svelte";
  import PetShopPage from "./lib/pages/PetShop.svelte";
  import HomePage from "./lib/pages/Home.svelte";
  import SimulationPage from "./lib/pages/Simulation.svelte";
  import Onboarding1 from "./lib/pages/Onboarding1.svelte";
  import Onboarding2 from "./lib/pages/Onboarding2.svelte";
  import Onboarding3 from "./lib/pages/Onboarding3.svelte";
  import OnboardingFinish from "./lib/pages/OnboardingFinish.svelte";
  import { currentRoute } from "./lib/stores/router";
</script>

{#if $currentRoute === 'main'}
  <div class="h-screen bg-color-bg text-color-text" data-theme="chrome">
    <div class="p-4">
      <MainContent />
    </div>
  </div>
{:else if $currentRoute === 'onboarding1'}
  <div class="h-screen bg-color-bg text-color-text" data-theme="chrome">
    <Onboarding1 />
  </div>
{:else if $currentRoute === 'onboarding2'}
  <div class="h-screen bg-color-bg text-color-text" data-theme="chrome">
    <Onboarding2 />
  </div>
{:else if $currentRoute === 'onboarding3'}
  <div class="h-screen bg-color-bg text-color-text" data-theme="chrome">
    <Onboarding3 />
  </div>
{:else if $currentRoute === 'onboarding-finish'}
  <div class="h-screen bg-color-bg text-color-text" data-theme="chrome">
    <OnboardingFinish />
  </div>
{:else if $currentRoute === 'simulation'}
  <SimulationPage />
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
