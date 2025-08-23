<script lang="ts">
import type { Character } from '../types';
import { createEventDispatcher } from 'svelte';

// runes 모드 호환: props() 사용
const props = () => ({ characters: [] as Character[], selectedId: 0 });

const dispatch = createEventDispatcher();

function selectPet(id: number) {
  dispatch('select', { id });
}
</script>

<div class="grid grid-cols-3 gap-4">
  {#each props().characters as pet}
    <div
      class="relative flex flex-col items-center cursor-pointer group"
      on:click={() => selectPet(pet.id)}
    >
      <div
        class="w-16 h-16 flex items-center justify-center rounded-lg border-2 transition-all"
        class:selected={pet.id === props().selectedId}
        class:opacity-50={!pet.unlocked}
        class:border-color-accent={pet.id === props().selectedId}
        class:border-color-border={pet.id !== props().selectedId}
        class:bg-gray-100={!pet.unlocked}
      >
        <span class="text-3xl">{pet.emoji}</span>
        {#if !pet.unlocked}
          <span class="absolute inset-0 flex items-center justify-center text-xl text-gray-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17v-1m0-4a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 0v1m0 4h.01" />
            </svg>
          </span>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
.selected {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px var(--color-accent);
}
</style>
