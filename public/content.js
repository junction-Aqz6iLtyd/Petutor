// Content script for adding elements to web pages

console.log('Petutor content script loaded');

// 메시지 리스너 설정
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  if (request.action === 'addElement') {
    addGoalElement(request.data);
    sendResponse({ success: true });
    return true;
  } else if (request.action === 'startSimulation') {
    startSimulation();
    sendResponse({ success: true });
    return true;
  }
});

function addGoalElement(data) {
  console.log('addGoalElement called with data:', data);
  
  // 기존 요소가 있다면 제거
  const existingElement = document.getElementById('petutor-goal-widget');
  if (existingElement) {
    existingElement.remove();
    console.log('Existing element removed');
  }

  // 새로운 목표 위젯 생성
  const goalWidget = document.createElement('div');
  goalWidget.id = 'petutor-goal-widget';
  
  console.log('Creating new element...');
  goalWidget.innerHTML = `
    <!-- 전체 오버레이 컨테이너 -->
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10000;
      pointer-events: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
      
      <!-- 왼쪽 캐릭터 -->
      <div id="petutor-character" style="
        position: absolute;
        left: -200px;
        top: 50%;
        transform: translateY(-50%);
        width: 150px;
        height: 200px;
        background-image: url('${chrome.runtime.getURL('assets/chara.png')}');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        animation: walkIn 2s ease-out 0.5s both;
        pointer-events: none;
        z-index: 10001;
      "></div>
      
      <!-- 상단 ask1 퀴즈 -->
      <div id="petutor-top-quiz" style="
        position: absolute;
        top: 120px;
        left: 50%;
        transform: translateX(-50%);
        background: #3A3A3A;
        border-radius: 24px;
        padding: 32px;
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
        color: white;
        width: 900px;
        max-width: 80vw;
        animation: slideInFromRight 1s ease-out 1s both;
        pointer-events: auto;
      ">
        <!-- 말풍선 꼬리 (왼쪽) -->
        <div style="
          position: absolute;
          left: -12px;
          top: 60px;
          width: 0;
          height: 0;
          border-top: 12px solid transparent;
          border-bottom: 12px solid transparent;
          border-right: 12px solid #3A3A3A;
        "></div>
        
        <div style="margin-bottom: 24px;">
          <div style="font-size: 20px; font-weight: 500; margin-bottom: 24px; color: #ffffff;">
            Q. ${data.name}의 뜻은 무엇일까요?
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px;">
            <div style="
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(255, 255, 255, 0.15);
              border-radius: 16px;
              padding: 20px;
              cursor: pointer;
              transition: all 0.3s ease;
              display: flex;
              align-items: center;
              gap: 16px;
              min-height: 60px;
            " onmouseover="this.style.background='rgba(255, 255, 255, 0.12)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(255, 255, 255, 0.08)'; this.style.transform='translateY(0)'">
              <div style="
                width: 32px;
                height: 32px;
                border: 2px solid rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.8);
                flex-shrink: 0;
              ">1</div>
              <span style="font-size: 16px; font-weight: 400;">휴식</span>
            </div>
            
            <div style="
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(255, 255, 255, 0.15);
              border-radius: 16px;
              padding: 20px;
              cursor: pointer;
              transition: all 0.3s ease;
              display: flex;
              align-items: center;
              gap: 16px;
              min-height: 60px;
            " onmouseover="this.style.background='rgba(255, 255, 255, 0.12)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(255, 255, 255, 0.08)'; this.style.transform='translateY(0)'">
              <div style="
                width: 32px;
                height: 32px;
                border: 2px solid rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.8);
                flex-shrink: 0;
              ">2</div>
              <span style="font-size: 16px; font-weight: 400;">집중</span>
            </div>
            
            <div style="
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(255, 255, 255, 0.15);
              border-radius: 16px;
              padding: 20px;
              cursor: pointer;
              transition: all 0.3s ease;
              display: flex;
              align-items: center;
              gap: 16px;
              min-height: 60px;
            " onmouseover="this.style.background='rgba(255, 255, 255, 0.12)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(255, 255, 255, 0.08)'; this.style.transform='translateY(0)'">
              <div style="
                width: 32px;
                height: 32px;
                border: 2px solid rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.8);
                flex-shrink: 0;
              ">3</div>
              <span style="font-size: 16px; font-weight: 400;">학습</span>
            </div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <button style="
            background: none;
            border: 2px solid #4285f4;
            color: #4285f4;
            padding: 14px 28px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
          " onmouseover="this.style.background='rgba(66, 133, 244, 0.1)'" onmouseout="this.style.background='none'">
            건너뛰기
          </button>
          
          <button style="
            background: #4285f4;
            border: none;
            color: white;
            padding: 14px 28px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
          " onmouseover="this.style.background='#3367d6'; this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#4285f4'; this.style.transform='translateY(0)'">
            확인
          </button>
        </div>
      </div>

      <!-- 하단 ask2 퀴즈 -->
      <div id="petutor-bottom-quiz" style="
        position: absolute;
        bottom: 120px;
        left: 50%;
        transform: translateX(-50%);
        background: #3A3A3A;
        border-radius: 24px;
        padding: 32px;
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
        color: white;
        width: 900px;
        max-width: 80vw;
        animation: slideInFromRight 1.2s ease-out 1.5s both;
        pointer-events: auto;
      ">
        <!-- 말풍선 꼬리 (왼쪽) -->
        <div style="
          position: absolute;
          left: -12px;
          bottom: 80px;
          width: 0;
          height: 0;
          border-top: 12px solid transparent;
          border-bottom: 12px solid transparent;
          border-right: 12px solid #3A3A3A;
        "></div>
        
        <div style="margin-bottom: 24px;">
          <div style="font-size: 18px; font-weight: 400; margin-bottom: 24px; line-height: 1.4; color: #ffffff;">
            Q: "${data.description} 동안 집중해서 공부해보세요!" 이 문장에서는 어떤 영어 패턴이 사용될까요?
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
            <div style="
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(255, 255, 255, 0.15);
              border-radius: 16px;
              padding: 20px;
              cursor: pointer;
              transition: all 0.3s ease;
              display: flex;
              align-items: center;
              gap: 20px;
              min-height: 60px;
            " onmouseover="this.style.background='rgba(255, 255, 255, 0.12)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(255, 255, 255, 0.08)'; this.style.transform='translateY(0)'">
              <div style="
                width: 32px;
                height: 32px;
                border: 2px solid rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.8);
                flex-shrink: 0;
              ">1</div>
              <span style="font-size: 16px; font-weight: 400;">"Focus for + 시간"</span>
            </div>
            
            <div style="
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(255, 255, 255, 0.15);
              border-radius: 16px;
              padding: 20px;
              cursor: pointer;
              transition: all 0.3s ease;
              display: flex;
              align-items: center;
              gap: 20px;
              min-height: 60px;
            " onmouseover="this.style.background='rgba(255, 255, 255, 0.12)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(255, 255, 255, 0.08)'; this.style.transform='translateY(0)'">
              <div style="
                width: 32px;
                height: 32px;
                border: 2px solid rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.8);
                flex-shrink: 0;
              ">2</div>
              <span style="font-size: 16px; font-weight: 400;">"Let's study + 부사구"</span>
            </div>
            
            <div style="
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(255, 255, 255, 0.15);
              border-radius: 16px;
              padding: 20px;
              cursor: pointer;
              transition: all 0.3s ease;
              display: flex;
              align-items: center;
              gap: 20px;
              min-height: 60px;
            " onmouseover="this.style.background='rgba(255, 255, 255, 0.12)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(255, 255, 255, 0.08)'; this.style.transform='translateY(0)'">
              <div style="
                width: 32px;
                height: 32px;
                border: 2px solid rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.8);
                flex-shrink: 0;
              ">3</div>
              <span style="font-size: 16px; font-weight: 400;">"명령문 + for + 기간"</span>
            </div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <button style="
            background: none;
            border: 2px solid #4285f4;
            color: #4285f4;
            padding: 14px 28px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
          " onmouseover="this.style.background='rgba(66, 133, 244, 0.1)'" onmouseout="this.style.background='none'">
            건너뛰기
          </button>
          
          <button id="petutor-close-btn" style="
            background: #4285f4;
            border: none;
            color: white;
            padding: 14px 28px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
          " onmouseover="this.style.background='#3367d6'; this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#4285f4'; this.style.transform='translateY(0)'">
            확인
          </button>
        </div>
      </div>
    </div>
  `;

  // 애니메이션 키프레임 추가
  if (!document.getElementById('petutor-styles')) {
    const style = document.createElement('style');
    style.id = 'petutor-styles';
    style.textContent = `
      @keyframes walkIn {
        0% {
          left: -200px;
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          left: 80px;
          opacity: 1;
        }
      }
      
      @keyframes slideInFromRight {
        from {
          transform: translateX(100px);
          opacity: 0;
        }
        to {
          transform: translateX(-50%);
          opacity: 1;
        }
      }
      
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // 닫기 버튼 이벤트 리스너
  const closeBtn = goalWidget.querySelector('#petutor-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      goalWidget.style.animation = 'fadeOut 0.5s ease-out';
      setTimeout(() => goalWidget.remove(), 500);
    });
  }

  // 자동 제거 (20초 후)
  setTimeout(() => {
    if (document.getElementById('petutor-goal-widget')) {
      goalWidget.style.animation = 'fadeOut 0.5s ease-out';
      setTimeout(() => goalWidget.remove(), 500);
    }
  }, 20000);

  // DOM에 추가
  document.body.appendChild(goalWidget);
  console.log('Element added to DOM successfully');
}

// 시뮬레이션 기능
let simulationContainer = null;
let selectedAnswer1 = '';
let selectedAnswer2 = '';

function startSimulation() {
  console.log('Starting simulation...');
  
  // 기존 시뮬레이션 요소가 있다면 제거
  const existingSimulation = document.getElementById('petutor-simulation-widget');
  if (existingSimulation) {
    existingSimulation.remove();
  }

  addSimulationElement();
}

function addSimulationElement() {
  console.log('Adding simulation element...');
  
  // 새로운 시뮬레이션 위젯 생성
  const simulationWidget = document.createElement('div');
  simulationWidget.id = 'petutor-simulation-widget';
  
  // HTML 구조 생성
  const overlayDiv = document.createElement('div');
  overlayDiv.style.cssText = '' +
    'position: fixed;' +
    'top: 0;' +
    'left: 0;' +
    'right: 0;' +
    'bottom: 0;' +
    'z-index: 999999;' +
    'background: transparent;' +
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;' +
    'pointer-events: none;';

  // 캐릭터 생성
  const characterDiv = document.createElement('div');
  characterDiv.id = 'petutor-character';
  characterDiv.style.cssText = '' +
    'position: absolute;' +
    'left: -200px;' +
    'top: 50%;' +
    'transform: translateY(-50%);' +
    'width: 180px;' +
    'height: 180px;' +
    'background-image: url("' + chrome.runtime.getURL('assets/chara.png') + '");' +
    'background-size: contain;' +
    'background-repeat: no-repeat;' +
    'background-position: center;' +
    'animation: walkIn 2s ease-out 0.5s both;' +
    'pointer-events: none;' +
    'z-index: 10001;';

  // 상단 퀴즈 생성 (말풍선 형태)
  const topQuizDiv = document.createElement('div');
  topQuizDiv.id = 'petutor-top-quiz';
  topQuizDiv.style.cssText = '' +
    'position: absolute;' +
    'top: calc(50% - 100px);' +
    'left: 250px;' +
    'right: 80px;' +
    'background: #3A3A3A;' +
    'border-radius: 30px;' +
    'padding: 30px 40px;' +
    'color: white;' +
    'animation: slideInFromRight 1s ease-out 1s both;' +
    'pointer-events: auto;';
  
  // 말풍선 꼬리 추가 (왼쪽으로)
  const topTail = document.createElement('div');
  topTail.style.cssText = '' +
    'position: absolute;' +
    'left: -15px;' +
    'top: 80px;' +
    'width: 0;' +
    'height: 0;' +
    'border-top: 15px solid transparent;' +
    'border-bottom: 15px solid transparent;' +
    'border-right: 15px solid #3A3A3A;';
  topQuizDiv.appendChild(topTail);

  const topContent = document.createElement('div');
  topContent.innerHTML = '' +
    '<div style="font-size: 18px; font-weight: 500; margin-bottom: 24px; color: white;">' +
      'Q. apple 의 뜻은 뭘까?' +
    '</div>' +
    '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 24px;">' +
      '<div class="simulation-option" data-question="1" data-answer="1" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 25px; padding: 16px 20px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 12px; min-height: 50px;">' +
        '<div style="width: 28px; height: 28px; border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: rgba(255, 255, 255, 0.8); flex-shrink: 0; background: rgba(255, 255, 255, 0.1);">1</div>' +
        '<span style="font-size: 16px; font-weight: 400; color: white;">사과</span>' +
      '</div>' +
      '<div class="simulation-option" data-question="1" data-answer="2" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 25px; padding: 16px 20px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 12px; min-height: 50px;">' +
        '<div style="width: 28px; height: 28px; border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: rgba(255, 255, 255, 0.8); flex-shrink: 0; background: rgba(255, 255, 255, 0.1);">2</div>' +
        '<span style="font-size: 16px; font-weight: 400; color: white;">오렌지</span>' +
      '</div>' +
      '<div class="simulation-option" data-question="1" data-answer="3" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 25px; padding: 16px 20px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 12px; min-height: 50px;">' +
        '<div style="width: 28px; height: 28px; border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: rgba(255, 255, 255, 0.8); flex-shrink: 0; background: rgba(255, 255, 255, 0.1);">3</div>' +
        '<span style="font-size: 16px; font-weight: 400; color: white;">남지윤</span>' +
      '</div>' +
    '</div>' +
    '<div style="display: flex; justify-content: space-between; align-items: center;">' +
      '<button class="simulation-skip" style="background: none; border: 2px solid #4285f4; color: #4285f4; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s ease;">건너뛰기</button>' +
      '<button class="simulation-confirm" style="background: #4285f4; border: none; color: white; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s ease;">확인</button>' +
    '</div>';
  topQuizDiv.appendChild(topContent);

  // 하단 퀴즈 생성 (말풍선 형태) - 처음에는 숨김
  const bottomQuizDiv = document.createElement('div');
  bottomQuizDiv.id = 'petutor-bottom-quiz';
  bottomQuizDiv.style.cssText = '' +
    'position: absolute;' +
    'top: calc(50% - 100px);' +
    'left: 250px;' +
    'right: 80px;' +
    'background: #3A3A3A;' +
    'border-radius: 30px;' +
    'padding: 30px 40px;' +
    'color: white;' +
    'opacity: 0;' +
    'transform: translateX(50px);' +
    'pointer-events: none;';
  
  // 말풍선 꼬리 추가 (왼쪽으로)
  const bottomTail = document.createElement('div');
  bottomTail.style.cssText = '' +
    'position: absolute;' +
    'left: -15px;' +
    'top: 80px;' +
    'width: 0;' +
    'height: 0;' +
    'border-top: 15px solid transparent;' +
    'border-bottom: 15px solid transparent;' +
    'border-right: 15px solid #3A3A3A;';
  bottomQuizDiv.appendChild(bottomTail);

  const bottomContent = document.createElement('div');
  bottomContent.innerHTML = '' +
    '<div style="font-size: 16px; font-weight: 400; margin-bottom: 24px; line-height: 1.4; color: white;">' +
      'Q: "내가 어렸을 때 우리 동네엔 오래된 절이 하나 있었다." 이 문장에서는 어떤 영어 패턴이 사용될까?' +
    '</div>' +
    '<div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">' +
      '<div class="simulation-option" data-question="2" data-answer="1" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 25px; padding: 16px 20px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 16px; min-height: 50px;">' +
        '<div style="width: 28px; height: 28px; border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: rgba(255, 255, 255, 0.8); flex-shrink: 0; background: rgba(255, 255, 255, 0.1);">1</div>' +
        '<span style="font-size: 16px; font-weight: 400; color: white;">"There used to be ~<S + V : 1형식>"</span>' +
      '</div>' +
      '<div class="simulation-option" data-question="2" data-answer="2" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 25px; padding: 16px 20px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 16px; min-height: 50px;">' +
        '<div style="width: 28px; height: 28px; border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: rgba(255, 255, 255, 0.8); flex-shrink: 0; background: rgba(255, 255, 255, 0.1);">2</div>' +
        '<span style="font-size: 16px; font-weight: 400; color: white;">랜덤하게 다른 seq의 "eng_expression"</span>' +
      '</div>' +
      '<div class="simulation-option" data-question="2" data-answer="3" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 25px; padding: 16px 20px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 16px; min-height: 50px;">' +
        '<div style="width: 28px; height: 28px; border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: rgba(255, 255, 255, 0.8); flex-shrink: 0; background: rgba(255, 255, 255, 0.1);">3</div>' +
        '<span style="font-size: 16px; font-weight: 400; color: white;">랜덤하게 다른 seq의 "eng_expression"</span>' +
      '</div>' +
    '</div>' +
    '<div style="display: flex; justify-content: space-between; align-items: center;">' +
      '<button class="simulation-skip" style="background: none; border: 2px solid #4285f4; color: #4285f4; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s ease;">건너뛰기</button>' +
      '<button class="simulation-close-btn" style="background: #4285f4; border: none; color: white; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s ease;">확인</button>' +
    '</div>';
  bottomQuizDiv.appendChild(bottomContent);

  // 닫기 버튼 생성
  const closeButton = document.createElement('button');
  closeButton.className = 'simulation-close';
  closeButton.innerHTML = '×';
  closeButton.style.cssText = '' +
    'position: absolute;' +
    'top: 20px;' +
    'right: 20px;' +
    'width: 40px;' +
    'height: 40px;' +
    'background: rgba(255, 255, 255, 0.1);' +
    'border: 1px solid rgba(255, 255, 255, 0.2);' +
    'border-radius: 50%;' +
    'color: #e2e8f0;' +
    'font-size: 24px;' +
    'cursor: pointer;' +
    'display: flex;' +
    'align-items: center;' +
    'justify-content: center;' +
    'transition: all 0.2s;' +
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';

  // 요소들을 오버레이에 추가
  overlayDiv.appendChild(characterDiv);
  overlayDiv.appendChild(topQuizDiv);
  overlayDiv.appendChild(bottomQuizDiv);
  overlayDiv.appendChild(closeButton);
  
  // 시뮬레이션 위젯에 오버레이 추가
  simulationWidget.appendChild(overlayDiv);

  // 애니메이션 키프레임 추가
  if (!document.getElementById('petutor-simulation-styles')) {
    const style = document.createElement('style');
    style.id = 'petutor-simulation-styles';
    style.textContent = '' +
      '@keyframes walkIn {' +
        '0% { left: -200px; opacity: 0; }' +
        '100% { left: 80px; opacity: 1; }' +
      '}' +
      '@keyframes slideInFromRight {' +
        'from { transform: translateX(50px); opacity: 0; }' +
        'to { transform: translateX(0); opacity: 1; }' +
      '}' +
      '@keyframes fadeOut {' +
        'from { opacity: 1; }' +
        'to { opacity: 0; }' +
      '}' +
      '.simulation-option:hover {' +
        'background: rgba(66, 133, 244, 0.15) !important;' +
        'border-color: #4285f4 !important;' +
      '}' +
      '.simulation-option.selected {' +
        'background: rgba(66, 133, 244, 0.2) !important;' +
        'border-color: #4285f4 !important;' +
      '}' +
      '.simulation-skip:hover {' +
        'background: rgba(66, 133, 244, 0.1) !important;' +
      '}' +
      '.simulation-confirm:hover, .simulation-close-btn:hover {' +
        'background: #3367d6 !important;' +
      '}';
    document.head.appendChild(style);
  }

  // 선택 상태 변수
  let selectedAnswer1 = '';
  let selectedAnswer2 = '';

  // 이벤트 리스너 추가
  simulationWidget.addEventListener('click', (e) => {
    // 선택지 클릭
    if (e.target.closest('.simulation-option')) {
      const option = e.target.closest('.simulation-option');
      const question = option.dataset.question;
      const answer = option.dataset.answer;
      
      // 같은 질문의 다른 선택지들에서 selected 클래스 제거
      const sameQuestionOptions = simulationWidget.querySelectorAll('.simulation-option[data-question="' + question + '"]');
      sameQuestionOptions.forEach(opt => opt.classList.remove('selected'));
      
      // 클릭된 선택지에 selected 클래스 추가
      option.classList.add('selected');
      
      if (question === '1') {
        selectedAnswer1 = answer;
      } else if (question === '2') {
        selectedAnswer2 = answer;
      }
    }
    
    // 건너뛰기 버튼 클릭
    if (e.target.matches('.simulation-skip')) {
      simulationWidget.style.animation = 'fadeOut 0.5s ease-out';
      setTimeout(() => simulationWidget.remove(), 500);
    }
    
    // 확인 버튼 클릭 (상단 퀴즈)
    if (e.target.matches('.simulation-confirm')) {
      if (selectedAnswer1 === '1') {
        // 정답이면 상단 퀴즈를 숨기고 하단 퀴즈를 보여줌
        showQuizResult('정답이야! ✓', 'success', false, () => {
          // 상단 퀴즈 페이드아웃
          const topQuiz = simulationWidget.querySelector('#petutor-top-quiz');
          if (topQuiz) {
            topQuiz.style.transition = 'all 0.5s ease-out';
            topQuiz.style.opacity = '0';
            topQuiz.style.transform = 'translateX(-50px)';
            topQuiz.style.pointerEvents = 'none';
            
            // 0.5초 후 하단 퀴즈 페이드인
            setTimeout(() => {
              const bottomQuiz = simulationWidget.querySelector('#petutor-bottom-quiz');
              if (bottomQuiz) {
                bottomQuiz.style.transition = 'all 0.5s ease-out';
                bottomQuiz.style.opacity = '1';
                bottomQuiz.style.transform = 'translateX(0)';
                bottomQuiz.style.pointerEvents = 'auto';
              }
            }, 500);
          }
        });
      } else {
        showQuizResult('아쉬워요! 다시 시도해보세요 😅', 'fail', true);
      }
    }
    
    // 확인 버튼 클릭 (하단 퀴즈 - 최종 제출)
    if (e.target.matches('.simulation-close-btn')) {
      if (selectedAnswer2 === '1') {
        showQuizResult('정답이야 🟡 50 획득!', 'success', true);
      } else {
        showQuizResult('아쉬워요! 다시 도전해보세요 😅', 'fail', true);
      }
    }
    
    // 닫기 버튼 클릭
    if (e.target.matches('.simulation-close')) {
      simulationWidget.style.animation = 'fadeOut 0.5s ease-out';
      setTimeout(() => simulationWidget.remove(), 500);
    }
  });

  // DOM에 추가
  document.body.appendChild(simulationWidget);
  console.log('Simulation widget added to DOM successfully');
}

function showQuizResult(message, type, isLastQuestion, callback) {
  const resultDiv = document.createElement('div');
  const bgColor = type === 'success' ? 'rgba(34, 197, 94, 0.95)' : 'rgba(239, 68, 68, 0.95)';
  
  resultDiv.innerHTML = '' +
    '<div style="' +
      'position: fixed;' +
      'top: 50%;' +
      'left: 50%;' +
      'transform: translate(-50%, -50%);' +
      'background: ' + bgColor + ';' +
      'color: white;' +
      'padding: 20px 40px;' +
      'border-radius: 12px;' +
      'font-size: 18px;' +
      'font-weight: 600;' +
      'z-index: 10000000;' +
      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;' +
    '">' +
      message +
    '</div>';
  
  document.body.appendChild(resultDiv);
  
  setTimeout(() => {
    resultDiv.remove();
    
    if (callback) {
      callback();
    }
    
    // 마지막 문제이거나 오답인 경우 시뮬레이션 종료
    if (isLastQuestion || type === 'fail') {
      const simulationWidget = document.getElementById('petutor-simulation-widget');
      if (simulationWidget) {
        simulationWidget.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => simulationWidget.remove(), 500);
      }
    }
  }, isLastQuestion ? 3000 : 1500); // 마지막 문제는 3초, 중간 문제는 1.5초
}

function showSimulationResult(message, type) {
  showQuizResult(message, type, true);
}


function addSimulationStyles() {
  if (document.getElementById('petutor-simulation-styles')) return;

  const style = document.createElement('style');
  style.id = 'petutor-simulation-styles';
  style.textContent = '' +
    '#petutor-simulation-container {' +
      'position: fixed;' +
      'top: 0;' +
      'left: 0;' +
      'width: 100vw;' +
      'height: 100vh;' +
      'z-index: 999999;' +
      'pointer-events: auto;' +
    '}' +
    '.petutor-simulation-overlay {' +
      'position: relative;' +
      'width: 100%;' +
      'height: 100%;' +
      'background: rgba(45, 55, 72, 0.95);' +
      'backdrop-filter: blur(10px);' +
    '}' +
    '.petutor-character-container {' +
      'position: absolute;' +
      'left: -200px;' +
      'top: 50%;' +
      'transform: translateY(-50%);' +
      'transition: left 1s ease-out;' +
      'z-index: 10;' +
    '}' +
    '.petutor-character-container.visible {' +
      'left: 50px;' +
    '}' +
    '.petutor-character {' +
      'width: 150px;' +
      'height: 150px;' +
      'object-fit: contain;' +
    '}' +
    '.petutor-question-container {' +
      'position: absolute;' +
      'opacity: 0;' +
      'transform: translateX(50px);' +
      'transition: all 0.5s ease-out;' +
    '}' +
    '.petutor-question-container.show {' +
      'opacity: 1;' +
      'transform: translateX(0);' +
    '}' +
    '.petutor-question1 {' +
      'top: 50px;' +
      'right: 50px;' +
      'left: 250px;' +
    '}' +
    '.petutor-question2 {' +
      'bottom: 50px;' +
      'right: 50px;' +
      'left: 250px;' +
    '}' +
    '.petutor-question-bubble {' +
      'background: rgba(45, 55, 72, 0.95);' +
      'border-radius: 16px;' +
      'padding: 24px;' +
      'border: 1px solid rgba(255, 255, 255, 0.1);' +
      'backdrop-filter: blur(10px);' +
    '}' +
    '.petutor-question-text {' +
      'color: #e2e8f0;' +
      'font-size: 18px;' +
      'font-weight: 500;' +
      'margin-bottom: 20px;' +
      'line-height: 1.4;' +
      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;' +
    '}' +
    '.petutor-options {' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 12px;' +
      'margin-bottom: 20px;' +
    '}' +
    '.petutor-option-button {' +
      'display: flex;' +
      'align-items: center;' +
      'gap: 12px;' +
      'padding: 12px 16px;' +
      'background: rgba(45, 55, 72, 0.8);' +
      'border: 2px solid rgba(255, 255, 255, 0.1);' +
      'border-radius: 8px;' +
      'color: #e2e8f0;' +
      'font-size: 16px;' +
      'cursor: pointer;' +
      'transition: all 0.2s;' +
      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;' +
    '}' +
    '.petutor-option-button:hover {' +
      'border-color: rgba(66, 153, 225, 0.5);' +
      'background: rgba(66, 153, 225, 0.1);' +
    '}' +
    '.petutor-option-button.selected {' +
      'border-color: #4299e1;' +
      'background: rgba(66, 153, 225, 0.2);' +
    '}' +
    '.petutor-option-number {' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: center;' +
      'width: 24px;' +
      'height: 24px;' +
      'background: rgba(255, 255, 255, 0.1);' +
      'border-radius: 50%;' +
      'font-size: 14px;' +
      'font-weight: 600;' +
    '}' +
    '.petutor-action-buttons {' +
      'display: flex;' +
      'justify-content: space-between;' +
      'gap: 12px;' +
    '}' +
    '.petutor-skip-button, .petutor-confirm-button {' +
      'padding: 10px 24px;' +
      'border-radius: 6px;' +
      'font-size: 14px;' +
      'font-weight: 600;' +
      'cursor: pointer;' +
      'transition: all 0.2s;' +
      'border: none;' +
      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;' +
    '}' +
    '.petutor-skip-button {' +
      'background: transparent;' +
      'color: #a0aec0;' +
      'border: 1px solid rgba(160, 174, 192, 0.3);' +
    '}' +
    '.petutor-skip-button:hover {' +
      'background: rgba(160, 174, 192, 0.1);' +
    '}' +
    '.petutor-confirm-button {' +
      'background: #4299e1;' +
      'color: white;' +
    '}' +
    '.petutor-confirm-button:hover {' +
      'background: #3182ce;' +
    '}' +
    '.petutor-close-button {' +
      'position: absolute;' +
      'top: 20px;' +
      'right: 20px;' +
      'width: 40px;' +
      'height: 40px;' +
      'background: rgba(255, 255, 255, 0.1);' +
      'border: 1px solid rgba(255, 255, 255, 0.2);' +
      'border-radius: 50%;' +
      'color: #e2e8f0;' +
      'font-size: 24px;' +
      'cursor: pointer;' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: center;' +
      'transition: all 0.2s;' +
      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;' +
    '}' +
    '.petutor-close-button:hover {' +
      'background: rgba(255, 255, 255, 0.2);' +
    '}';
  
  document.head.appendChild(style);
}

function addSimulationEventListeners() {
  // 선택지 클릭 이벤트
  simulationContainer.addEventListener('click', (e) => {
    if (e.target.matches('.petutor-option-button') || e.target.closest('.petutor-option-button')) {
      const button = e.target.matches('.petutor-option-button') ? e.target : e.target.closest('.petutor-option-button');
      const question = button.dataset.question;
      const id = button.dataset.id;
      
      // 같은 질문의 다른 버튼들에서 selected 클래스 제거
      const sameQuestionButtons = simulationContainer.querySelectorAll('.petutor-option-button[data-question="' + question + '"]');
      sameQuestionButtons.forEach(btn => btn.classList.remove('selected'));
      
      // 클릭된 버튼에 selected 클래스 추가
      button.classList.add('selected');
      
      if (question === '1') {
        selectedAnswer1 = id;
      } else if (question === '2') {
        selectedAnswer2 = id;
      }
    }
    
    // 건너뛰기 버튼 클릭
    if (e.target.matches('.petutor-skip-button')) {
      removeSimulation();
    }
    
    // 확인 버튼 클릭
    if (e.target.matches('.petutor-confirm-button')) {
      handleConfirm();
    }
    
    // 닫기 버튼 클릭
    if (e.target.matches('.petutor-close-button')) {
      removeSimulation();
    }
  });
}

function handleConfirm() {
  if (selectedAnswer1 === '1' && selectedAnswer2 === '1') {
    showSuccessMessage();
  } else {
    showFailureMessage();
  }
}

function showSuccessMessage() {
  const successDiv = document.createElement('div');
  successDiv.innerHTML = '' +
    '<div style="' +
      'position: fixed;' +
      'top: 50%;' +
      'left: 50%;' +
      'transform: translate(-50%, -50%);' +
      'background: rgba(34, 197, 94, 0.95);' +
      'color: white;' +
      'padding: 20px 40px;' +
      'border-radius: 12px;' +
      'font-size: 18px;' +
      'font-weight: 600;' +
      'z-index: 1000000;' +
      'backdrop-filter: blur(10px);' +
      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;' +
    '">' +
      '정답이야 🟡 50 획득!' +
    '</div>';
  
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.remove();
    removeSimulation();
  }, 3000);
}

function showFailureMessage() {
  const failDiv = document.createElement('div');
  failDiv.innerHTML = '' +
    '<div style="' +
      'position: fixed;' +
      'top: 50%;' +
      'left: 50%;' +
      'transform: translate(-50%, -50%);' +
      'background: rgba(239, 68, 68, 0.95);' +
      'color: white;' +
      'padding: 20px 40px;' +
      'border-radius: 12px;' +
      'font-size: 18px;' +
      'font-weight: 600;' +
      'z-index: 1000000;' +
      'backdrop-filter: blur(10px);' +
      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;' +
    '">' +
      '아쉬워요! 다시 도전해보세요 😅' +
    '</div>';
  
  document.body.appendChild(failDiv);
  
  setTimeout(() => {
    failDiv.remove();
    removeSimulation();
  }, 3000);
}

function removeSimulation() {
  if (simulationContainer) {
    simulationContainer.remove();
    simulationContainer = null;
  }
  
  // 상태 리셋
  selectedAnswer1 = '';
  selectedAnswer2 = '';
  
  console.log('Simulation removed');
}