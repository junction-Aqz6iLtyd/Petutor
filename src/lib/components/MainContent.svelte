<script lang="ts">
  import TimeDropdown from './TimeDropdown.svelte';
  import CharacterGrid from './CharacterGrid.svelte';
  import { settings, updatePauseDuration, updateSelectedCharacter } from '../stores/settings';

  function handleDurationSelect(duration: number) {
    updatePauseDuration(duration);
    console.log('시간 설정 저장:', duration, '분');
  }

  function handleCharacterSelect(characterId: number) {
    updateSelectedCharacter(characterId);
    console.log('캐릭터 설정 저장:', characterId);
  }

  function saveSettings() {
    // 현재 설정들이 이미 자동으로 저장되므로 사용자에게 피드백만 제공
    console.log('모든 설정이 저장되었습니다');
    // TODO: 성공 메시지 표시
  }

  function openVocabulary() {
    console.log('Opening vocabulary');
  }
</script>

<div class="space-y-6">
  <!-- 헤더 -->
  <div class="flex items-center justify-between">
    <h1 class="text-xl font-medium text-color-text">와우이와 영어해요</h1>
    <button class="text-color-text-secondary hover:text-color-text transition-colors" aria-label="닫기">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>

  <!-- 와우이 잠시 꺼두기 섹션 -->
  <div class="space-y-4">
    <h2 class="text-lg font-medium text-color-text">와우이 잠시 꺼두기</h2>
    <p class="text-color-text-secondary text-sm">
      잠깐! 집중해서 해야 할 일이 있나요? 잠시 뒤에 다시 만나요!
    </p>
    
    <div class="space-y-3">
      <TimeDropdown 
        duration={$settings.pauseDuration} 
        onSelect={handleDurationSelect} 
      />
      <div class="flex justify-end">
        <button 
          class="px-6 py-2 bg-color-accent hover:bg-opacity-90 text-white rounded-lg transition-all duration-200 font-medium"
          onclick={saveSettings}
        >
          저장
        </button>
      </div>
    </div>
  </div>

  <!-- 와우이의 옷장 섹션 -->
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <h2 class="text-lg font-medium text-color-text">와우이의 옷장</h2>
    </div>
    <p class="text-color-text-secondary text-sm flex items-center gap-1">
      와우이의 옷을 골라주세요 
      <span class="text-lg">😎</span>
    </p>
    
    <CharacterGrid 
      selectedId={$settings.selectedCharacter}
      onSelect={handleCharacterSelect}
    />
  </div>

  <!-- 하단 구분선과 링크 -->
  <div class="border-t border-color-border pt-4">
    <button 
      class="flex items-center justify-between w-full text-color-text hover:text-color-accent transition-colors"
      onclick={openVocabulary}
    >
      <span class="font-medium">단어장 바로가기</span>
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
</div>
