<script lang="ts">
import { router } from '../stores/router';


let userId = '';
let password = '';
let rememberLogin = false;

function handleLogin() {
  // 로그인 로직 구현
  console.log('로그인 시도:', { userId, password, rememberLogin });
  // 성공시 메인 페이지로 이동
  router.set('home');
}

function goToSignUp() {
  router.set('onboarding1');
}


function forgotPassword() {
  // 비밀번호 찾기 로직
  console.log('비밀번호 찾기');
}
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
  <div class="w-full max-w-md">
    <!-- 타이틀 -->
    <h1 class="text-2xl font-bold text-center mb-8">로그인</h1>

    <!-- 로그인 폼 -->
    <div class="space-y-6">
      <!-- 아이디 입력 -->
      <div>
        <input 
          type="text" 
          placeholder="아이디를 입력하세요"
          class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          bind:value={userId}
        />
      </div>

      <!-- 비밀번호 입력 -->
      <div>
        <input 
          type="password" 
          placeholder="비밀번호를 입력하세요"
          class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          bind:value={password}
        />
      </div>

      <!-- 로그인 유지 체크박스 -->
      <div class="flex items-center justify-between">
        <label class="flex items-center">
          <input 
            type="checkbox" 
            class="w-4 h-4 mr-3 rounded"
            bind:checked={rememberLogin}
          />
          <span class="text-sm">로그인 유지</span>
        </label>
        
        <button 
          class="text-sm text-blue-400 hover:text-blue-300 underline"
          onclick={forgotPassword}
        >
          비밀번호 찾기
        </button>
      </div>

      <!-- 로그인 버튼 -->
      <button 
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg"
        onclick={handleLogin}
      >
        아이디로 로그인
      </button>

      <!-- 회원가입 링크 -->
      <div class="text-center text-sm">
        <span class="text-gray-400">회원가입 아직 하지 않으셨나요? </span>
        <button 
          class="text-blue-400 hover:text-blue-300 underline"
          onclick={goToSignUp}
        >
          회원가입 하러가기
        </button>
      </div>
    </div>
  </div>
</main>