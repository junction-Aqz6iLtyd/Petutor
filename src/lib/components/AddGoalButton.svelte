<script lang="ts">
  function handleAddGoal() {
    console.log('목표 추가하기 클릭');
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