<script lang="ts">
  import { generateTimeOptions, extractDurationFromValue, findValueByDuration, HEADER_OPTION, DEFAULT_DURATION } from '../utils/time';
  
  interface Props {
    duration?: number; // 분 단위
    onSelect?: (duration: number) => void;
  }

  let { duration = DEFAULT_DURATION, onSelect }: Props = $props();
  let isOpen = $state(false);
  let selectedTime = $state('');
  
  // 실시간으로 시간 옵션 생성
  $effect(() => {
    const options = generateTimeOptions();
    const currentValue = findValueByDuration(duration);
    selectedTime = currentValue || options[1].value; // 기본값: 2시간
  });

  // 드롭다운 옵션들 (헤더 + 실제 옵션들)
  let timeOptions = $derived([HEADER_OPTION, ...generateTimeOptions().map(option => option.value)]);

  function selectTime(option: string) {
    if (option !== HEADER_OPTION) {
      selectedTime = option;
      const selectedDuration = extractDurationFromValue(option);
      if (selectedDuration !== null) {
        onSelect?.(selectedDuration);
      }
      isOpen = false;
    }
  }

  function isSelected(option: string): boolean {
    return selectedTime === option;
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
            <svg class="w-4 h-4 text-color-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>