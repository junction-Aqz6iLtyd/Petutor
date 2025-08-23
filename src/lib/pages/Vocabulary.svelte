<script lang="ts">
  import StudyCardsGrid from "../components/StudyCardsGrid.svelte";
</script>

<!-- 메인 콘텐츠 영역 -->
<main class="flex-1 p-6 overflow-auto flex flex-col min-w-0">
  <h1 class="text-2xl font-bold text-color-text mb-6">단어장</h1>
  
  <!-- 학습 카드 그리드 -->
  <div class="flex-1 min-w-0">
    <StudyCardsGrid />
  </div>
</main>