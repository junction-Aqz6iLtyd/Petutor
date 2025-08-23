<script lang="ts">
import { router } from '../stores/router';

function completeOnboarding() {
  // Mark user as logged in (in real app, this would be stored)
  // Close this tab and let user use the popup
  window.close();
}
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
  <!-- 상단 프로그래스 바 (100% 완료) -->
  <div class="absolute top-8 left-8 right-8">
    <div class="w-full bg-gray-700 rounded-full h-2">
      <div class="bg-blue-600 h-2 rounded-full" style="width: 100%"></div>
    </div>
  </div>

  <div class="w-full max-w-lg flex flex-col items-center">
    <!-- 완료된 캐릭터와 말풍선 -->
    <div class="relative mb-12">
      <img src="/src/assets/chara.png" alt="와옹이" class="w-48 h-48 mb-4" />
      <div class="absolute -top-8 left-48 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2">
        <span class="text-sm whitespace-nowrap">내가 항상 함께 해줄게! 꼭 목표를 이뤄보자!</span>
      </div>
    </div>

    <!-- 회원가입 완료하기 버튼 -->
    <button 
      class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg transition-colors text-lg"
      onclick={completeOnboarding}
    >
      회원가입 완료하기
    </button>
  </div>
</main>