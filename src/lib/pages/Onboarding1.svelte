<script lang="ts">
import { navigateTo } from '../stores/router';


let userId = '';
let password = '';
let confirmPassword = '';
let name = '';

function goNext() {
  if (userId && password && confirmPassword && name && password === confirmPassword) {
    navigateTo('onboarding2');
  } else {
    alert('모든 필드를 올바르게 입력해주세요.');
  }
}

</script>

<main class="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
  <!-- 상단 프로그래스 바 -->
  <div class="absolute top-8 left-8 right-8">
    <div class="w-full bg-gray-700 rounded-full h-2">
      <div class="bg-blue-600 h-2 rounded-full" style="width: 25%"></div>
    </div>
  </div>

  <div class="w-full max-w-lg flex flex-col items-center">
    <!-- 캐릭터와 말풍선 -->
    <div class="relative mb-8">
      <img src="assets/chara.png" alt="와옹이" class="w-32 h-32 mb-4" />
      <div class="absolute -top-8 left-32 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2">
        <span class="text-sm whitespace-nowrap">안녕! 난 너의 학습 코치 펫 와옹이야</span>
      </div>
    </div>

    <!-- 폼 -->
    <div class="w-full space-y-4">
      <!-- 아이디 -->
      <div>
        <label class="block text-sm font-medium mb-2">아이디</label>
        <input 
          type="text" 
          class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          bind:value={userId}
        />
      </div>

      <!-- 비밀번호 -->
      <div>
        <label class="block text-sm font-medium mb-2">비밀번호</label>
        <input 
          type="password" 
          class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          bind:value={password}
        />
      </div>

      <!-- 비밀번호 확인 -->
      <div>
        <label class="block text-sm font-medium mb-2">비밀번호 확인</label>
        <input 
          type="password" 
          class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          bind:value={confirmPassword}
        />
      </div>

      <!-- 이름 -->
      <div>
        <label class="block text-sm font-medium mb-2">이름</label>
        <input 
          type="text" 
          class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          bind:value={name}
        />
      </div>
    </div>

    <!-- 계속하기 버튼 -->
    <button 
      class="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors self-end"
      onclick={goNext}
    >
      계속하기
    </button>
  </div>
</main>