<script lang="ts">
  import VocabularyCard from "../components/VocabularyCard.svelte";
</script>

<!-- 메인 콘텐츠 영역 -->
<main class="flex-1 p-6 overflow-auto flex flex-col min-w-0">
  <h1 class="text-3xl font-bold text-white mb-8">단어장</h1>
  
  <!-- 단어 목록 -->
  <div class="flex-1">
    <VocabularyCard />
  </div>
</main>