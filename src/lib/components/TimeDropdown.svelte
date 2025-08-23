<script lang="ts">
  import { generateTimeOptions, generateSimpleTimeOptions, extractDurationFromSimpleValue, findValueByDuration, findSimpleValueByDuration, HEADER_OPTION, DEFAULT_DURATION } from '../utils/time';
  
  interface Props {
    duration?: number; // 분 단위
    onSelect?: (duration: number) => void;
  }

  let { duration = DEFAULT_DURATION, onSelect }: Props = $props();
  let isOpen = $state(false);
  let selectedTime = $state('');
  let selectedSimpleTime = $state('');
  
  // 실시간으로 시간 옵션 생성
  $effect(() => {
    const options = generateTimeOptions();
    const currentValue = findValueByDuration(duration);
    selectedTime = currentValue || options[1].value; // 기본값: 2시간 (상세 형식)
    
    const simpleCurrentValue = findSimpleValueByDuration(duration);
    selectedSimpleTime = simpleCurrentValue || generateSimpleTimeOptions()[1].value; // 기본값: 2시간 (간단 형식)
  });

  // 드롭다운 옵션들 (헤더 + 간단한 형식의 옵션들)
  let timeOptions = $derived([HEADER_OPTION, ...generateSimpleTimeOptions().map(option => option.value)]);

  function selectTime(option: string) {
    if (option !== HEADER_OPTION) {
      selectedSimpleTime = option;
      const selectedDuration = extractDurationFromSimpleValue(option);
      if (selectedDuration !== null) {
        // 상세 형식도 업데이트
        const detailedValue = findValueByDuration(selectedDuration);
        if (detailedValue) {
          selectedTime = detailedValue;
        }
        onSelect?.(selectedDuration);
      }
      isOpen = false;
    }
  }

  function isSelected(option: string): boolean {
    return selectedSimpleTime === option;
  }

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  // 5초마다 시간 업데이트 (실시간 시간 반영)
  let intervalId: number | null = null;
  
  $effect(() => {
    intervalId = setInterval(() => {
      // 현재 선택된 duration으로 새로운 값 생성
      const currentValue = findValueByDuration(duration);
      if (currentValue) {
        selectedTime = currentValue;
      }
    }, 5000); // 5초마다 업데이트

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  });
</script>

<div class="relative">
  <button 
    class="w-full text-left p-3 bg-color-surface border border-color-border rounded-lg text-color-text hover:bg-color-hover transition-colors duration-200 flex items-center justify-between"
    onclick={toggleDropdown}
  >
    <span>{selectedTime}</span>
    <svg 
      class="w-5 h-5 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </button>

  {#if isOpen}
    <div class="absolute top-full left-0 w-full mt-1 bg-color-surface border border-color-border rounded-lg shadow-lg z-10">
      {#each timeOptions as option, index}
        <button
          class="w-full text-left p-3 hover:bg-color-hover transition-colors duration-200 text-color-text flex items-center justify-between {
            index === 0 
              ? 'text-color-text-secondary font-medium cursor-default' 
              : isSelected(option) 
                ? 'bg-color-hover text-color-text' 
                : ''
          }"
          onclick={() => selectTime(option)}
          disabled={index === 0}
        >
          <span>{option}</span>
          {#if isSelected(option) && index !== 0}
            <div class="w-4 h-4 bg-color-accent rounded-full flex items-center justify-center">
              <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>