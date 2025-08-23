<script lang="ts">
  import StudyCard from './StudyCard.svelte';
  import EditGoalDialog from './EditGoalDialog.svelte';
  
  interface Goal {
    name: string;
    description: string;
    selectedDays: string[];
    isDaily: boolean;
  }
  
  const studyCards = [
    {
      category: '단어',
      count: 50,
      unit: '개',
      frequency: '매일',
      goal: {
        name: '단어',
        description: '50개',
        selectedDays: [],
        isDaily: true
      }
    },
    {
      category: '문법',
      count: 1,
      unit: '시간',
      frequency: '매일',
      goal: {
        name: '문법',
        description: '1시간',
        selectedDays: [],
        isDaily: true
      }
    },
    {
      category: '리딩',
      count: 2,
      unit: '시간',
      frequency: '월수금',
      goal: {
        name: '리딩',
        description: '2시간',
        selectedDays: ['mon', 'wed', 'fri'],
        isDaily: false
      }
    },
    {
      category: '스피킹',
      count: 50,
      unit: '개',
      frequency: '매일',
      goal: {
        name: '스피킹',
        description: '50개',
        selectedDays: [],
        isDaily: true
      }
    }
  ];
  
  let isEditDialogOpen = $state(false);
  let currentEditGoal = $state<Goal | null>(null);
  
  function handleEdit(goal: Goal) {
    currentEditGoal = goal;
    isEditDialogOpen = true;
  }
  
  function handleEditClose() {
    isEditDialogOpen = false;
    currentEditGoal = null;
  }
  
  function handleEditSave(updatedGoal: Goal) {
    console.log('Updated goal:', updatedGoal);
    // 실제 저장 로직은 여기에 구현
  }
</script>

<div class="overflow-x-auto">
  <div class="flex gap-4 pb-2 min-w-max">
    {#each studyCards as card}
      <div class="flex-shrink-0 w-64">
        <StudyCard 
          category={card.category}
          count={card.count}
          unit={card.unit}
          frequency={card.frequency}
          onEdit={() => handleEdit(card.goal)}
        />
      </div>
    {/each}
  </div>
</div>

<!-- 수정 다이얼로그 -->
<EditGoalDialog
  isOpen={isEditDialogOpen}
  goal={currentEditGoal}
  onClose={handleEditClose}
  onSave={handleEditSave}
/>