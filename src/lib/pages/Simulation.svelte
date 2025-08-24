<script lang="ts">
  import { onMount } from 'svelte';
  
  let characterVisible = $state(false);
  let showQuestion1 = $state(false);
  let showQuestion2 = $state(false);
  let selectedAnswer1 = $state('');
  let selectedAnswer2 = $state('');

  // New animation state variables
  let currentFrame = $state(1);
  let animationInterval: number | undefined;
  let animationState = $state<'idle' | 'entering' | 'exiting'>('idle');

  // Helper to get frame path
  function getFramePath(frame: number): string {
    const frameNumber = String(frame).padStart(4, '0');
    return `/assets/animation/Wawong_2_${frameNumber}.webp`;
  }

  function playAnimation(start: number, end: number, onComplete?: () => void) {
    if (animationInterval) {
      clearInterval(animationInterval);
    }
    currentFrame = start;
    animationInterval = setInterval(() => {
      if (currentFrame < end) {
        currentFrame++;
      } else {
        clearInterval(animationInterval);
        animationInterval = undefined;
        if (onComplete) {
          onComplete();
        }
      }
    }, 50); // Adjust frame rate as needed
  }

  onMount(() => {
    setTimeout(() => {
      characterVisible = true;
      animationState = 'entering';
      playAnimation(1, 90, () => {
        animationState = 'idle'; // Character is now idle after entering
      });
    }, 500);
    
    setTimeout(() => {
      showQuestion1 = true;
    }, 1500);
    
    setTimeout(() => {
      showQuestion2 = true;
    }, 2500);
  });

  const question1Options = [
    { id: '1', text: '사과' },
    { id: '2', text: '오렌지' },
    { id: '3', text: '남자욱' }
  ];

  const question2Options = [
    { id: '1', text: '"There used to be ~<S + V : 1형식>"' },
    { id: '2', text: '랜덤하게 다른 seq의 "eng_expression"' },
    { id: '3', text: '랜덤하게 다른 seq의 "eng_expression"' }
  ];

  function handleAnswer1(optionId: string) {
    selectedAnswer1 = optionId;
  }

  function handleAnswer2(optionId: string) {
    selectedAnswer2 = optionId;
  }

  function handleSkip() {
    console.log('건너뛰기 클릭됨');
  }

  function handleConfirm() {
    if (selectedAnswer1 === '2' && selectedAnswer2 === '1') {
      console.log('정답! 🟡 50 획득!');
      animationState = 'exiting';
      playAnimation(90, 165, () => {
        characterVisible = false; // Hide character after exiting
        animationState = 'idle';
      });
    } else {
      console.log('오답!');
    }
  }
</script>

<div class="simulation-container">
  <!-- 캐릭터 -->
  <div class="character-container" class:visible={characterVisible} class:exiting={animationState === 'exiting'}>
    <img src={getFramePath(currentFrame)} alt="캐릭터" class="character" />
  </div>

  <!-- 질문 1 (상단) -->
  {#if showQuestion1}
    <div class="question-container question1" class:show={showQuestion1}>
      <div class="question-bubble">
        <div class="question-text">Q. apple 의 뜻은 뭘까?</div>
        <div class="options">
          {#each question1Options as option}
            <button 
              class="option-button"
              class:selected={selectedAnswer1 === option.id}
              onclick={() => handleAnswer1(option.id)}
            >
              <span class="option-number">{option.id}</span>
              {option.text}
            </button>
          {/each}
        </div>
        <div class="action-buttons">
          <button class="skip-button" onclick={handleSkip}>건너뛰기</button>
          <button class="confirm-button" onclick={handleConfirm}>확인</button>
        </div>
      </div>
    </div>
  {/if}

  <!-- 질문 2 (하단) -->
  {#if showQuestion2}
    <div class="question-container question2" class:show={showQuestion2}>
      <div class="question-bubble">
        <div class="question-text">Q: "내가 어렸을 때 우리 동네엔 오래된 절이 하나 있었다." 이 문장에서는 어떤 영어 패턴이 사용될까?</div>
        <div class="options">
          {#each question2Options as option}
            <button 
              class="option-button"
              class:selected={selectedAnswer2 === option.id}
              onclick={() => handleAnswer2(option.id)}
            >
              <span class="option-number">{option.id}</span>
              {option.text}
            </button>
          {/each}
        </div>
        <div class="action-buttons">
          <button class="skip-button" onclick={handleSkip}>건너뛰기</button>
          <button class="confirm-button" onclick={handleConfirm}>확인</button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .simulation-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    overflow: hidden;
  }

  .character-container {
    position: absolute;
    left: -200px;
    top: 50%;
    transform: translateY(-50%);
    transition: left 1s ease-out;
    z-index: 10;
  }

  .character-container.visible {
    left: 50px;
  }

  .character-container.exiting {
    left: 100vw; /* Move off-screen to the right */
    transition: left 1s ease-in; /* Smooth transition for exiting */
  }

  .character {
    width: 150px;
    height: 150px;
    object-fit: contain;
  }

  .question-container {
    position: absolute;
    opacity: 0;
    transform: translateX(50px);
    transition: all 0.5s ease-out;
  }

  .question-container.show {
    opacity: 1;
    transform: translateX(0);
  }

  .question1 {
    top: 50px;
    right: 50px;
    left: 250px;
  }

  .question2 {
    bottom: 50px;
    right: 50px;
    left: 250px;
  }

  .question-bubble {
    background: rgba(45, 55, 72, 0.95);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .question-text {
    color: #e2e8f0;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 20px;
    line-height: 1.4;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
  }

  .option-button {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: rgba(45, 55, 72, 0.8);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #e2e8f0;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .option-button:hover {
    border-color: rgba(66, 153, 225, 0.5);
    background: rgba(66, 153, 225, 0.1);
  }

  .option-button.selected {
    border-color: #4299e1;
    background: rgba(66, 153, 225, 0.2);
  }

  .option-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    font-size: 14px;
    font-weight: 600;
  }

  .action-buttons {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }

  .skip-button, .confirm-button {
    padding: 10px 24px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }

  .skip-button {
    background: transparent;
    color: #a0aec0;
    border: 1px solid rgba(160, 174, 192, 0.3);
  }

  .skip-button:hover {
    background: rgba(160, 174, 192, 0.1);
  }

  .confirm-button {
    background: #4299e1;
    color: white;
  }

  .confirm-button:hover {
    background: #3182ce;
  }
</style>