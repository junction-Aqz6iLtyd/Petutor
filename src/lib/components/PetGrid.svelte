<script lang="ts">
import type { Character } from '../types';
import { createEventDispatcher } from 'svelte';

interface Props {
  characters: Character[];
  selectedId: number;
}

let { characters, selectedId }: Props = $props();

const dispatch = createEventDispatcher();

function selectPet(id: number) {
  dispatch('select', { id });
}
</script>

<div class="grid grid-cols-3 gap-4 w-full max-w-2xl">
  {#each characters as pet (pet.id)}
    <div
      class="relative aspect-square bg-gray-800 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 flex items-center justify-center overflow-hidden border-2"
      class:border-blue-500={pet.id === selectedId}
      class:border-gray-600={pet.id !== selectedId}
      class:bg-blue-900={pet.id === selectedId}
      onclick={() => selectPet(pet.id)}
      onkeydown={(e) => e.key === 'Enter' && selectPet(pet.id)}
      role="button"
      tabindex="0"
    >
      <!-- 캐릭터 이미지 -->
      <div class="relative w-full h-full flex items-center justify-center p-4">
        <img 
          src="/src/assets/chara.png" 
          alt="펫 캐릭터" 
          class="w-full h-full object-contain max-w-24 max-h-24"
          class:opacity-100={pet.unlocked}
          class:opacity-30={!pet.unlocked}
        />
        
        <!-- 잠금 표시 -->
        {#if !pet.unlocked}
          <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-lg">
            <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4V6H16C17.1 6 18 6.9 18 8V20C18 21.1 17.1 22 16 22H8C6.9 22 6 21.1 6 20V8C6 6.9 6.9 6 8 6H10V4C10 2.9 10.9 2 12 2M12 4C11.4 4 11 4.4 11 5V6H13V5C13 4.4 12.6 4 12 4Z"/>
            </svg>
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>