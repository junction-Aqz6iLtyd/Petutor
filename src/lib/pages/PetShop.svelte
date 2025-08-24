<script lang="ts">
import { CHARACTERS } from '../constants/characters';
import PetGrid from '../components/PetGrid.svelte';
import { writable } from 'svelte/store';

const selectedId = writable(CHARACTERS.find(c => c.unlocked)?.id ?? 0);

let selectedPet = CHARACTERS[0];

selectedId.subscribe(id => {
  selectedPet = CHARACTERS.find(c => c.id === id) ?? CHARACTERS[0];
});

function handleSelect(event: any) {
  selectedId.set(event.detail.id);
}

const isSelectedPetLocked = $derived(!selectedPet.unlocked);
</script>

<main class="flex-1 p-6 overflow-auto min-w-0 bg-gray-900 text-white">
  <!-- 타이틀 -->
  <h1 class="text-2xl font-bold mb-6">펫상점</h1>

  <div class="flex gap-8 h-full">
    <!-- 왼쪽: 선택된 펫 표시 -->
    <div class="bg-gray-800 border border-gray-600 rounded-xl p-8 flex flex-col items-center w-80 h-fit">
      <h2 class="text-xl font-semibold mb-6">
        {isSelectedPetLocked ? '신난 와옹이' : '여행가는 야옹이'}
      </h2>
      
      <!-- 큰 캐릭터 표시 영역 -->
      <div class="w-56 h-56 flex items-center justify-center rounded-xl border-2 border-gray-600 bg-gray-700 shadow-xl mb-6 p-4">
        <img 
          src="/assets/chara.png" 
          alt="선택된 캐릭터" 
          class="w-full h-full object-contain"
          class:opacity-100={!isSelectedPetLocked}
          class:opacity-30={isSelectedPetLocked}
        />
        
        <!-- 잠금된 캐릭터 선택시 자물쇠 표시 -->
        {#if isSelectedPetLocked}
          <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl">
            <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4V6H16C17.1 6 18 6.9 18 8V20C18 21.1 17.1 22 16 22H8C6.9 22 6 21.1 6 20V8C6 6.9 6.9 6 8 6H10V4C10 2.9 10.9 2 12 2M12 4C11.4 4 11 4.4 11 5V6H13V5C13 4.4 12.6 4 12 4Z"/>
            </svg>
          </div>
        {/if}
      </div>
      
      <!-- 저장/구매 버튼 -->
      {#if isSelectedPetLocked}
        <button 
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full text-lg flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
          </svg>
          40
        </button>
      {:else}
        <button 
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors w-full text-lg"
        >
          저장
        </button>
      {/if}
    </div>

    <!-- 오른쪽: 펫 그리드 -->
    <div class="flex-1 flex justify-start">
      <div class="w-full max-w-4xl">
        <PetGrid
          characters={CHARACTERS}
          selectedId={$selectedId}
          on:select={handleSelect}
        />
      </div>
    </div>
  </div>
</main>