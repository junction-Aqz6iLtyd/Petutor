<script lang="ts">
  import TimeDropdown from './TimeDropdown.svelte';
  import CharacterGrid from './CharacterGrid.svelte';
  import CharacterAnimation from './CharacterAnimation.svelte';
  import { settings, updatePauseDuration, updateSelectedCharacter, startTimer, stopTimer, getRemainingTime } from '../stores/settings';
  import { navigateTo } from '../stores/router';

  let showSaveMessage = $state(false);
  let animationMode: 'none' | 'walk' | 'exit' = 'none';
  let isAnimationVisible = false;

  function handleDurationSelect(duration: number) {
    updatePauseDuration(duration);
  }

  function handleCharacterSelect(characterId: number) {
    updateSelectedCharacter(characterId);
  }

  async function saveSettings() {
    try {
      // 타이머 시작
      await startTimer($settings.pauseDuration);
      
      // 성공 메시지 표시
      showSaveMessage = true;
      setTimeout(() => {
        showSaveMessage = false;
      }, 3000); // 3초 후 메시지 숨김
      
    } catch (error) {
    }
  }

  function handleSimulation() {
    // 크롬 익스텐션 API를 사용하여 활성 탭에 메시지 전송
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'startSimulation'
          });
        }
      });
    }
    animationMode = 'walk';
    isAnimationVisible = true;
  }

  function handleAnimationEnd() {
    // 등장 애니메이션 끝났을 때 추가 동작 필요시 구현
  }

  function triggerExitAnimation() {
    animationMode = 'exit';
  }

  function handleExitEnd() {
    isAnimationVisible = false;
  }

  async function cancelTimer() {
    try {
      await stopTimer();
    } catch (error) {
    }
  }

  function openVocabulary() {
    chrome.tabs.create({ url: 'vocabulary.html' });
  }

  // 남은 시간 계산 (실시간 업데이트)
  let remainingMinutes = $derived(getRemainingTime($settings.timerStartTime, $settings.timerDuration));

  // 실시간 업데이트를 위한 interval
  let intervalId: number | null = null;
  
  $effect(() => {
    if ($settings.isTimerActive) {
      intervalId = setInterval(() => {
        // 강제로 리렌더링을 위해 settings를 조회
        const remaining = getRemainingTime($settings.timerStartTime, $settings.timerDuration);
        if (remaining === 0) {
          // 타이머가 만료되었으면 상태 정리
          stopTimer();
        }
      }, 1000); // 1초마다 체크
    } else if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  });
</script>

<div class="space-y-6">
  <!-- 헤더 -->
  <div class="flex items-center justify-between">
    <h1 class="text-xl font-medium text-color-text">Petutor</h1>
    <button class="text-color-text-secondary hover:text-color-text transition-colors" aria-label="닫기">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>

  <!-- 와옹이 잠시 꺼두기 섹션 -->
  <div class="space-y-4">
    <h2 class="text-lg font-medium text-color-text">와옹이 잠시 꺼두기</h2>
    <p class="text-color-text-secondary text-sm">
      잠깐! 집중해서 해야 할 일이 있나요? 잠시 뒤에 다시 만나요!
    </p>
    
    <div class="space-y-3">
      <TimeDropdown 
        duration={$settings.pauseDuration} 
        onSelect={handleDurationSelect} 
      />
      
      <!-- 타이머 상태 표시 -->
      {#if $settings.isTimerActive}
        <div class="bg-color-surface border border-color-border rounded-lg p-3">
          <div class="flex items-center justify-between text-sm">
            <div class="text-color-text">
              <div class="font-medium">타이머 실행 중</div>
              <div class="text-color-text-secondary">
                {#if remainingMinutes > 60}
                  약 {Math.floor(remainingMinutes / 60)}시간 {remainingMinutes % 60}분 남음
                {:else}
                  약 {remainingMinutes}분 남음
                {/if}
              </div>
            </div>
            <button 
              class="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
              onclick={cancelTimer}
            >
              취소
            </button>
          </div>
        </div>
      {:else}
        <div class="flex justify-end gap-3">
          <button 
            class="px-6 py-2 border-2 border-green-500 text-color-text hover:border-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-200 font-medium"
            onclick={handleSimulation}
          >
            시뮬레이션
          </button>
          <button 
            class="px-6 py-2 bg-color-accent hover:bg-opacity-90 text-white rounded-lg transition-all duration-200 font-medium"
            onclick={saveSettings}
          >
            저장
          </button>
        </div>
      {/if}

      <!-- 저장 완료 메시지 -->
      {#if showSaveMessage}
        <div class="bg-green-600 text-white text-sm p-2 rounded text-center">
          타이머가 시작되었습니다!
        </div>
      {/if}
    </div>
  </div>

  <!-- 와옹이의 옷장 섹션 -->
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <h2 class="text-lg font-medium text-color-text">와옹이의 옷장</h2>
    </div>
    <p class="text-color-text-secondary text-sm flex items-center gap-1">
      와옹이의 옷을 골라주세요
      <span class="text-lg">😎</span>
    </p>
    
    <CharacterGrid 
      selectedId={$settings.selectedCharacter}
      onSelect={handleCharacterSelect}
      hideCharacterImage={isAnimationVisible}
    />
  </div>

  <!-- 캐릭터 애니메이션 -->
  {#if isAnimationVisible}
    <CharacterAnimation mode={animationMode === 'walk' ? 'walk' : 'exit'}
      onEnd={animationMode === 'walk' ? handleAnimationEnd : handleExitEnd} />
  {/if}

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
