<script lang="ts">
  interface Props {
    selectedDays?: string[];
    label?: string;
    id?: string;
  }
  
  let { selectedDays = $bindable([]), label = "", id }: Props = $props();
  
  const groupId = id || `weekday-group-${Math.random().toString(36).substr(2, 9)}`;
  
  const weekdays = [
    { id: 'mon', label: '월' },
    { id: 'tue', label: '화' },
    { id: 'wed', label: '수' },
    { id: 'thu', label: '목' },
    { id: 'fri', label: '금' },
    { id: 'sat', label: '토' },
    { id: 'sun', label: '일' }
  ];
  
  function toggleDay(dayId: string) {
    if (selectedDays.includes(dayId)) {
      selectedDays = selectedDays.filter(id => id !== dayId);
    } else {
      selectedDays = [...selectedDays, dayId];
    }
  }
  
  function isSelected(dayId: string): boolean {
    return selectedDays.includes(dayId);
  }
</script>

<div class="space-y-3">
  {#if label}
    <span id="{groupId}-label" class="block text-white text-lg font-medium">{label}</span>
  {/if}
  <div class="flex gap-3" role="group" aria-labelledby="{groupId}-label">
    {#each weekdays as day}
      <button
        class="w-12 h-12 min-w-12 min-h-12 rounded-full border-2 flex items-center justify-center text-white text-xl font-bold transition-all duration-200 flex-shrink-0 aspect-square hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 {isSelected(day.id) ? 'bg-indigo-600 border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700' : 'bg-transparent border-indigo-500 hover:border-indigo-400 hover:bg-indigo-500/10'}"
        aria-pressed={isSelected(day.id)}
        aria-label="{day.label}요일 선택"
        onclick={() => toggleDay(day.id)}
      >
        {day.label}
      </button>
    {/each}
  </div>
</div>