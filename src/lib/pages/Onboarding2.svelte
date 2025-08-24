<script lang="ts">
import { navigateTo } from '../stores/router';

let selectedLevel = 0;

const levels = [
  { id: 1, title: 'level 1 기본 단어', description: '고교 필수 어휘를 학습합니다.' },
  { id: 2, title: 'level 2 기본 단어', description: '고교 필수 어휘를 학습합니다.' },
  { id: 3, title: 'level 3 기본 단어', description: '고교 필수 어휘를 학습합니다.' }
];

function selectLevel(levelId: number) {
  selectedLevel = levelId;
}

function goNext() {
  if (selectedLevel > 0) {
    navigateTo('onboarding3');
  } else {
    alert('레벨을 선택해주세요.');
  }
}
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
  <!-- 상단 프로그래스 바 -->
  <div class="absolute top-8 left-8 right-8">
    <div class="w-full bg-gray-700 rounded-full h-2">
      <div class="bg-blue-600 h-2 rounded-full" style="width: 50%"></div>
    </div>
  </div>

  <div class="w-full max-w-lg flex flex-col items-center">
    <!-- 캐릭터와 말풍선 -->
    <div class="relative mb-8">
      <img src="assets/chara.png" alt="와옹이" class="w-32 h-32 mb-4" />
      <div class="absolute -top-8 left-32 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2">
        <span class="text-sm whitespace-nowrap">어느 정도 level의 문제를 풀고 싶어?</span>
      </div>
    </div>

    <!-- 레벨 선택 옵션들 -->
    <div class="w-full space-y-4 mb-8">
      {#each levels as level}
        <div 
          class="p-4 bg-gray-800 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-700 flex items-center"
          class:border-blue-500={selectedLevel === level.id}
          class:border-gray-600={selectedLevel !== level.id}
          class:bg-blue-900={selectedLevel === level.id}
          onclick={() => selectLevel(level.id)}
        >
          <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
            <span class="text-xl font-bold">{level.id}</span>
          </div>
          <div>
            <h3 class="font-semibold text-lg">{level.title}</h3>
            <p class="text-gray-400 text-sm">{level.description}</p>
          </div>
        </div>
      {/each}
    </div>

    <!-- 계속하기 버튼 -->
    <button 
      class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors self-end"
      onclick={goNext}
    >
      계속하기
    </button>
  </div>
</main>