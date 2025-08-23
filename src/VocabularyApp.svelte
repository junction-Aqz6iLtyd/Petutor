<script lang="ts">
  import Sidebar from "./lib/components/Sidebar.svelte";
</script>

<div class="h-screen bg-color-bg text-color-text flex" data-theme="chrome">
  <Sidebar />
  
  <!-- 메인 콘텐츠 영역 -->
  <main class="flex-1 p-6 overflow-auto">
    <div class="w-full">
      <h1 class="text-2xl font-bold text-color-text mb-6">단어장</h1>
      
      <!-- 단어장 콘텐츠 -->
      <div class="bg-color-surface border border-color-border rounded-lg p-6">
        <div class="text-center py-12">
          <div class="text-6xl mb-4">📚</div>
          <h2 class="text-xl font-semibold text-color-text mb-2">단어장 기능 준비중</h2>
          <p class="text-color-text-secondary">곧 단어장 기능이 추가될 예정입니다!</p>
        </div>
      </div>
    </div>
  </main>
</div>