<script lang="ts">
import { CHARACTERS } from '../constants/characters';
import PetGrid from '../components/PetGrid.svelte';
import { writable } from 'svelte/store';

const selectedId = writable(CHARACTERS.find(c => c.unlocked)?.id ?? 0);

let selectedPet = CHARACTERS[0];

selectedId.subscribe(id => {
  selectedPet = CHARACTERS.find(c => c.id === id) ?? CHARACTERS[0];
});

function handleSelect(event) {
  selectedId.set(event.detail.id);
}
</script>

<!-- 메인 콘텐츠 영역 -->
<main class="flex-1 p-6 overflow-auto flex flex-col min-w-0">
  <h1 class="text-2xl font-bold text-color-text mb-6">펫상점</h1>

  <!-- 펫상점 콘텐츠 -->
  <div class="bg-color-surface border border-color-border rounded-lg p-6 flex flex-col items-center min-w-0">
    <!-- 선택된 펫 모습 (chara-purchase 스타일) -->
    <div class="w-32 h-32 flex items-center justify-center rounded-full border-4 border-color-accent bg-white shadow mb-4">
      <span class="text-7xl">{selectedPet.emoji}</span>
    </div>
    <div class="mb-6 text-lg font-semibold text-color-text">
      {selectedPet.unlocked ? '보유 중' : '구매 필요'}
    </div>
    <!-- 펫 그리드 -->
    <PetGrid
      characters={CHARACTERS}
      selectedId={$selectedId}
      on:select={handleSelect}
    />
  </div>
</main>