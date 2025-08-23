<script lang="ts">
  import Sidebar from "./lib/components/Sidebar.svelte";
  import MainContent from "./lib/components/MainContent.svelte";
  import VocabularyPage from "./lib/pages/Vocabulary.svelte";
  import PetShopPage from "./lib/pages/PetShop.svelte";
  import SettingsPage from "./lib/pages/Settings.svelte";
  import SignPage from "./lib/pages/Sign.svelte";
  import LoginPage from "./lib/pages/Login.svelte";
  import Onboarding1Page from "./lib/pages/Onboarding1.svelte";
  import Onboarding2Page from "./lib/pages/Onboarding2.svelte";
  import Onboarding3Page from "./lib/pages/Onboarding3.svelte";
  import OnboardingFinishPage from "./lib/pages/OnboardingFinish.svelte";
  import { currentRoute, router } from "./lib/stores/router";
</script>

<!-- 로그인 플로우 페이지들 -->
{#if $router === 'sign'}
  <SignPage />
{:else if $router === 'login'}
  <LoginPage />
{:else if $router === 'onboarding1'}
  <Onboarding1Page />
{:else if $router === 'onboarding2'}
  <Onboarding2Page />
{:else if $router === 'onboarding3'}
  <Onboarding3Page />
{:else if $router === 'onboarding-finish'}
  <OnboardingFinishPage />
<!-- 메인 앱 화면들 -->
{:else if $router === 'home' || $currentRoute === 'main'}
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
      <SettingsPage />
    {/if}
  </div>
{/if}