import './app.css'

// Vocabulary page functionality
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('vocabulary-app')
  if (app) {
    app.innerHTML = `
      <div class="min-h-screen bg-base-100 p-6">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-3xl font-bold text-center mb-8">와옹이와 영어해요 - 단어장</h1>
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">단어장 기능 준비중</h2>
              <p>곧 단어장 기능이 추가될 예정입니다!</p>
            </div>
          </div>
        </div>
      </div>
    `
  }
})