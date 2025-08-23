<script lang="ts">
  import ProfileHeader from './ProfileHeader.svelte';
  import StudyCardsGrid from './StudyCardsGrid.svelte';
  import AddGoalButton from './AddGoalButton.svelte';
</script>

<div class="flex-1 p-6">
  <div class="space-y-6">
    <!-- 프로필 섹션 -->
    <div class="flex items-center gap-3 mb-6">
      <h1 class="text-2xl font-bold text-white">프로필</h1>
    </div>
    
    <!-- 프로필 헤더 -->
    <ProfileHeader />
    
    <!-- 학습 카드 그리드 -->
    <StudyCardsGrid />
    
    <!-- 목표 추가하기 버튼 -->
    <AddGoalButton />
  </div>
</div>