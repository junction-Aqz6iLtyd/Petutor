<script lang="ts">
  let isOpen = $state(false);
  let selectedTime = $state("2시간 뒤에 다시 만나요(오후 11:19)");
  
  const timeOptions = [
    "재활성화까지:",
    "1시간 (오후 10:19)",
    "2시간 (오후 11:19)",
    "4시간 (오전 1:19)",
    "12시간 (오전 10:19)",
    "24시간"
  ];

  function selectTime(option: string) {
    if (option !== "재활성화까지:") {
      selectedTime = option;
      isOpen = false;
    }
  }

  function isSelected(option: string): boolean {
    return selectedTime === option;
  }

  function toggleDropdown() {
    isOpen = !isOpen;
  }
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