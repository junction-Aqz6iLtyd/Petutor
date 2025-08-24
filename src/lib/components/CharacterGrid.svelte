<script lang="ts">
  import { CHARACTERS } from '../constants/characters';
  
  interface Props {
    selectedId?: number;
    onSelect?: (id: number) => void;
    hideCharacterImage?: boolean;
  }

  let { selectedId = 0, onSelect, hideCharacterImage = false }: Props = $props();
  let selectedSkin = $state(selectedId);

  function selectSkin(id: number) {
    if (CHARACTERS[id].unlocked) {
      selectedSkin = id;
      onSelect?.(id);
    }
  }

  // selectedId prop이 변경되면 selectedSkin 업데이트
  $effect(() => {
    selectedSkin = selectedId;
  });
</script>

<div class="grid grid-cols-3 gap-3">
  {#each CHARACTERS as skin}
    <button
      class="aspect-square p-4 rounded-lg border-2 transition-all duration-200 relative {
        selectedSkin === skin.id 
          ? 'border-color-accent bg-color-hover' 
          : skin.unlocked 
            ? 'border-color-border bg-color-surface hover:border-color-accent hover:bg-color-hover' 
            : 'border-color-border bg-color-surface opacity-60 cursor-not-allowed'
      }"
      onclick={() => selectSkin(skin.id)}
      disabled={!skin.unlocked}
    >
      <div class="flex items-center justify-center h-full p-4">
        {#if !hideCharacterImage}
          <img
            src="/assets/chara.png"
            alt="캐릭터"
            class="w-full h-full object-contain"
          />
        {/if}
      </div>
      
      {#if !skin.unlocked}
        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
          </svg>
        </div>
      {/if}
      
      {#if selectedSkin === skin.id && skin.unlocked}
        <div class="absolute -top-1 -right-1">
          <div class="w-6 h-6 bg-color-accent rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
      {/if}
    </button>
  {/each}
</div>