<script lang="ts">
import { navigateTo } from '../stores/router';

let goal = '';

function goNext() {
  if (goal.trim()) {
    navigateTo('onboarding-finish');
  } else {
    alert('목표를 입력해주세요.');
  }
}
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
  <!-- 상단 프로그래스 바 -->
  <div class="absolute top-8 left-8 right-8">
    <div class="w-full bg-gray-700 rounded-full h-2">
      <div class="bg-blue-600 h-2 rounded-full" style="width: 75%"></div>
    </div>
  </div>

  <div class="w-full max-w-lg flex flex-col items-center">
    <!-- 캐릭터와 말풍선 -->
    <div class="relative mb-8">
      <img src="assets/chara.png" alt="와옹이" class="w-32 h-32 mb-4" />
      <div class="absolute -top-8 left-32 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2">
        <span class="text-sm whitespace-nowrap">영어 학습으로 이루고싶은 목표를 작성해줘!</span>
      </div>
    </div>

    <!-- 목표 입력 영역 -->
    <div class="w-full mb-8">
      <div class="bg-gray-800 border border-gray-600 rounded-lg p-6">
        <label class="block text-lg font-semibold mb-4">목표</label>
        <textarea 
          class="w-full h-32 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
          bind:value={goal}
          placeholder="목표를 입력하세요..."
        ></textarea>
      </div>
    </div>

    <!-- 예시 텍스트 -->
    <div class="text-center text-gray-400 text-sm mb-8">
      <p>예) "토익 800점 받기", "단어 1000개 외우기"</p>
    </div>

    <!-- 회원가입 완료하기 버튼 -->
    <button 
      class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors self-end"
      onclick={goNext}
    >
      회원가입 완료하기
    </button>
  </div>
</main>