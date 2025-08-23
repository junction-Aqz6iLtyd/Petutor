<script lang="ts">
  import InputField from './InputField.svelte';
  import WeekdaySelector from './WeekdaySelector.svelte';
  import ToggleSwitch from './ToggleSwitch.svelte';
  
  interface Goal {
    name: string;
    description: string;
    selectedDays: string[];
    isDaily: boolean;
  }
  
  interface Props {
    isOpen?: boolean;
    goal?: Goal;
    onClose?: () => void;
    onSave?: (goal: Goal) => void;
  }
  
  let { isOpen = false, goal = null, onClose = () => {}, onSave = () => {} }: Props = $props();
  
  let goalName = $state("");
  let goalDescription = $state("");
  let selectedDays = $state<string[]>([]);
  let isDaily = $state(false);
  
  // goal이 변경될 때마다 폼 데이터 업데이트
  $effect(() => {
    if (goal) {
      goalName = goal.name;
      goalDescription = goal.description;
      selectedDays = [...goal.selectedDays];
      isDaily = goal.isDaily;
    }
  });
  
  function handleClose() {
    // 폼 리셋
    goalName = "";
    goalDescription = "";
    selectedDays = [];
    isDaily = false;
    onClose();
  }
  
  function handleSave() {
    // 입력 검증
    if (!goalName.trim()) {
      alert('목표 이름을 입력해주세요.');
      return;
    }
    if (!goalDescription.trim()) {
      alert('목표 수량을 입력해주세요.');
      return;
    }
    if (!isDaily && selectedDays.length === 0) {
      alert('매일이 아닌 경우 반복 일정을 선택해주세요.');
      return;
    }
    
    const updatedGoal: Goal = {
      name: goalName,
      description: goalDescription,
      selectedDays: isDaily ? [] : selectedDays,
      isDaily
    };
    onSave(updatedGoal);
    handleClose();
  }
  
  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  }
  
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      handleClose();
    }
  }
  
  // 다이얼로그가 열릴 때 키보드 이벤트 리스너 추가
  $effect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // 첫 번째 입력 필드에 포커스
      setTimeout(() => {
        const firstInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (firstInput) firstInput.focus();
      }, 100);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

{#if isOpen}
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="edit-goal-title"
    onclick={handleBackdropClick}
    onkeydown={(e) => e.key === 'Escape' && handleClose()}
  >
    <div class="bg-[#1D2023] border border-white/[0.12] rounded-2xl p-12 w-[900px] max-h-[90vh] overflow-y-auto">
      <!-- 헤더 -->
      <div class="mb-12">
        <h2 id="edit-goal-title" class="text-white text-3xl font-bold">목표 수정</h2>
      </div>
      
      <!-- 폼 컨텐츠 - 2컬럼 레이아웃 -->
      <div class="grid grid-cols-2 gap-16">
        <!-- 왼쪽 컬럼 -->
        <div class="space-y-8">
          <!-- 목표 이름 -->
          <InputField
            label="목표 이름"
            bind:value={goalName}
            placeholder="단어"
          />
          
          <!-- 목표 수량 -->
          <InputField
            label="목표 수량"
            bind:value={goalDescription}
            placeholder="예: 1시간, 50개"
          />
        </div>
        
        <!-- 오른쪽 컬럼 -->
        <div class="space-y-8">
          <!-- 반복 일정 -->
          <div class="space-y-3">
            <span id="edit-weekday-group-label" class="block text-white text-lg font-medium">반복 일정</span>
            <div class="flex gap-3" role="group" aria-labelledby="edit-weekday-group-label">
              {#each [
                { id: 'mon', label: '월' },
                { id: 'tue', label: '화' },
                { id: 'wed', label: '수' },
                { id: 'thu', label: '목' },
                { id: 'fri', label: '금' },
                { id: 'sat', label: '토' },
                { id: 'sun', label: '일' }
              ] as day}
                <button
                  class="w-12 h-12 min-w-12 min-h-12 rounded-full border-2 flex items-center justify-center text-white text-xl font-bold transition-all duration-200 flex-shrink-0 aspect-square focus:outline-none focus:ring-2 focus:ring-indigo-400/20 {isDaily ? 'opacity-40 cursor-not-allowed bg-gray-600 border-gray-600' : selectedDays.includes(day.id) ? 'bg-indigo-600 border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700 hover:scale-110' : 'bg-transparent border-indigo-500 hover:border-indigo-400 hover:bg-indigo-500/10 hover:scale-110'}"
                  onclick={() => {
                    if (!isDaily) {
                      if (selectedDays.includes(day.id)) {
                        selectedDays = selectedDays.filter(id => id !== day.id);
                      } else {
                        selectedDays = [...selectedDays, day.id];
                      }
                    }
                  }}
                  disabled={isDaily}
                >
                  {day.label}
                </button>
              {/each}
            </div>
          </div>
          
          <!-- 매일 스위치 -->
          <ToggleSwitch
            label="매일"
            bind:checked={isDaily}
          />
        </div>
      </div>
      
      <!-- 버튼 -->
      <div class="flex gap-4 justify-end mt-12">
        <button
          class="px-8 py-3 border-2 border-indigo-500 text-white rounded-lg hover:border-indigo-400 hover:bg-indigo-500/10 transition-all duration-200 text-lg font-medium"
          onclick={handleClose}
        >
          취소
        </button>
        <button
          class="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-200 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          onclick={handleSave}
          disabled={!goalName.trim() || !goalDescription.trim()}
        >
          수정
        </button>
      </div>
    </div>
  </div>
{/if}