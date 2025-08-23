<script lang="ts">
  import AddGoalDialog from './AddGoalDialog.svelte';
  
  let isDialogOpen = $state(false);
  
  function handleAddGoal() {
    isDialogOpen = true;
  }
  
  function handleCloseDialog() {
    isDialogOpen = false;
  }
  
  function handleSaveGoal(goal: any) {
    console.log('새 목표 저장:', goal);
    // 여기서 목표를 저장하는 로직을 구현할 수 있습니다.
  }
</script>

<div class="flex justify-end mt-6">
  <button 
    class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
    onclick={handleAddGoal}
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
    목표 추가하기
  </button>
</div>

<AddGoalDialog
  isOpen={isDialogOpen}
  onClose={handleCloseDialog}
  onSave={handleSaveGoal}
/>