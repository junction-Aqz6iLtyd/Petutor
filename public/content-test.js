// 간단한 테스트용 content script
console.log('🎯 Petutor content script loaded successfully');

// 페이지 로드 즉시 테스트 요소 생성 (디버깅용)
window.addEventListener('load', () => {
  console.log('🎯 Page loaded, creating test element');
  createTestElement();
});

function createTestElement() {
  console.log('🎯 Creating test element...');
  
  // 기존 요소 제거
  const existing = document.getElementById('petutor-test');
  if (existing) {
    existing.remove();
    console.log('🎯 Existing element removed');
  }
  
  // 간단한 테스트 요소 생성
  const testDiv = document.createElement('div');
  testDiv.id = 'petutor-test';
  testDiv.style.cssText = `
    position: fixed !important;
    top: 50px !important;
    right: 50px !important;
    background: red !important;
    color: white !important;
    padding: 20px !important;
    border-radius: 10px !important;
    z-index: 999999 !important;
    font-size: 16px !important;
    font-family: Arial, sans-serif !important;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5) !important;
    cursor: pointer !important;
    border: 2px solid white !important;
  `;
  testDiv.innerHTML = `
    <div>🎯 TEST: 시뮬레이션 작동!</div>
    <div style="font-size: 12px; margin-top: 5px;">클릭하면 사라집니다</div>
  `;
  
  // 클릭시 제거
  testDiv.addEventListener('click', () => {
    testDiv.remove();
    console.log('🎯 Test element removed by click');
  });
  
  // DOM에 추가
  document.body.appendChild(testDiv);
  console.log('🎯 Test element added to DOM');
  
  // 10초 후 자동 제거
  setTimeout(() => {
    if (document.getElementById('petutor-test')) {
      testDiv.remove();
      console.log('🎯 Test element auto-removed');
    }
  }, 10000);
}

// 메시지 리스너 설정
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('🎯 Message received:', request);
  
  if (request.action === 'addElement') {
    console.log('🎯 addElement action triggered');
    createTestElement();
    sendResponse({ success: true });
    return true;
  }
  
  sendResponse({ success: false, error: 'Unknown action' });
  return true;
});

// 디버깅용: 스크립트가 로드되었음을 확인하기 위해 페이지에 표시
setTimeout(() => {
  console.log('🎯 Content script fully initialized');
}, 1000);