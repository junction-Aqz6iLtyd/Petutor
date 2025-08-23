<script lang="ts">
  import Sidebar from './Sidebar.svelte';

  export let onClose: () => void;

  let selectedMenuItem = $state('vocabulary');

  function handleMenuItemSelect(itemId: string) {
    selectedMenuItem = itemId;
  }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
  <div class="bg-[#1D2023] rounded-3xl w-full max-w-6xl h-[90vh] flex overflow-hidden border border-white border-opacity-12">
    <!-- 사이드바 -->
    <Sidebar 
      selectedItem={selectedMenuItem} 
      onItemSelect={handleMenuItemSelect} 
    />
    
    <!-- 메인 콘텐츠 -->
    <div class="flex-1 bg-[#272B30] p-8">
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <h1 class="text-white text-2xl font-medium">단어장</h1>
          <button 
            class="text-white hover:text-gray-300 transition-colors"
            onclick={onClose}
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="text-white">
        {#if selectedMenuItem === 'vocabulary'}
          <div class="space-y-4">
            <div class="flex flex-col space-y-3">
              <button class="text-left p-3 bg-[#17191C] rounded-lg hover:bg-[#2A2E33] transition-colors">
                항목별 진 단어
              </button>
              <button class="text-left p-3 bg-[#17191C] rounded-lg hover:bg-[#2A2E33] transition-colors">
                나만의 단어장 1
              </button>
              <button class="text-left p-3 bg-[#17191C] rounded-lg hover:bg-[#2A2E33] transition-colors">
                나만의 단어장 2
              </button>
              <button class="text-left p-3 bg-[#17191C] rounded-lg hover:bg-[#2A2E33] transition-colors">
                나만의 단어장 23
              </button>
              <button class="text-left p-3 bg-[#17191C] rounded-lg hover:bg-[#2A2E33] transition-colors text-[#ACB6B9]">
                더보기
              </button>
            </div>
          </div>
        {:else if selectedMenuItem === 'pet'}
          <div class="text-center py-12">
            <p class="text-xl">펫상점 페이지 준비 중...</p>
          </div>
        {:else if selectedMenuItem === 'settings'}
          <div class="text-center py-12">
            <p class="text-xl">설정 페이지 준비 중...</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>