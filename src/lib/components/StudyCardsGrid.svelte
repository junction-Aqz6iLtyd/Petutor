<script lang="ts">
  import StudyCard from './StudyCard.svelte';
  
  const studyCards = [
    {
      category: '단어',
      count: 50,
      unit: '개',
      frequency: '매일'
    },
    {
      category: '문법',
      count: 1,
      unit: '시간',
      frequency: '매일'
    },
    {
      category: '리딩',
      count: 2,
      unit: '시간',
      frequency: '월수금'
    },
    {
      category: '스피킹',
      count: 50,
      unit: '개',
      frequency: '매일'
    }
  ];
  
  function handleEdit(category: string) {
    console.log(`편집: ${category}`);
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
          onEdit={() => handleEdit(card.category)}
        />
      </div>
    {/each}
  </div>
</div>