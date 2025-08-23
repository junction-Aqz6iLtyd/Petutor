<script lang="ts">
import { router } from '../stores/router';

function goToLogin() {
  router.set('login');
}

function startOnboarding() {
  router.set('onboarding1');
}
</script>

<main class="flex h-screen bg-gray-200 text-black">
  <!-- 왼쪽: 설명 텍스트 -->
  <div class="flex-1 flex items-center justify-center p-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        효우야 깜싹하게 캐릭터 컨셉포토 만들어줘
      </h1>
    </div>
  </div>

  <!-- 오른쪽: 로그인/회원가입 영역 -->
  <div class="w-96 bg-gray-900 text-white flex flex-col items-center justify-center p-8">
    <!-- 앱 로고와 제목 -->
    <div class="flex items-center mb-8">
      <img src="/src/assets/chara.png" alt="와옹이" class="w-8 h-8 mr-2" />
      <span class="text-lg font-semibold">와옹이랑 영어해요</span>
    </div>

    <!-- 메인 텍스트 -->
    <div class="text-center mb-12">
      <h2 class="text-2xl font-bold mb-2">학습 펫 와옹이와</h2>
      <h3 class="text-2xl font-bold mb-4">언제나 함께하는 영어 공부 !</h3>
    </div>

    <!-- 버튼들 -->
    <div class="w-full space-y-4">
      <!-- 시작하기 버튼 -->
      <button 
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
        onclick={startOnboarding}
      >
        시작하기
      </button>

      <!-- 이미 계정이 있어요 버튼 -->
      <button 
        class="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
        onclick={goToLogin}
      >
        이미 계정이 있어요!
      </button>
    </div>
  </div>
</main>