<script lang="ts">
  import Sidebar from "./lib/components/Sidebar.svelte";
  import MainContent from "./lib/components/MainContent.svelte";
</script>

<div class="h-screen bg-chrome-bg text-chrome-text" data-theme="chrome">
  <div class="flex h-full">
    <Sidebar />
    <main class="flex-1 p-4">
      <MainContent />
    </main>
  </div>
</div>
