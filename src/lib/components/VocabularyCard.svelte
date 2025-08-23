<script lang="ts">
  interface VocabularyItem {
    word: string;
    meaning: string;
    example: string;
  }

  interface Props {
    vocabularyList?: VocabularyItem[];
  }

  let { vocabularyList = [] }: Props = $props();

  // 각 단어의 뜻 표시 상태를 관리
  let hiddenMeanings = $state<Set<number>>(new Set());

  function toggleMeaning(index: number) {
    if (hiddenMeanings.has(index)) {
      hiddenMeanings.delete(index);
    } else {
      hiddenMeanings.add(index);
    }
    // Svelte 5에서 Set의 변경을 감지하기 위해 새로운 Set 생성
    hiddenMeanings = new Set(hiddenMeanings);
  }

  // 기본 데이터 (테스트용)
  const defaultVocabulary: VocabularyItem[] = [
    {
      word: "symbol",
      meaning: "상징(물), 부호[기호]",
      example: "Wow, this symbol means toilet!"
    },
    {
      word: "symbol",
      meaning: "상징(물), 부호[기호]",
      example: "Wow, this symbol means toilet!"
    },
    {
      word: "symbol",
      meaning: "상징(물), 부호[기호]",
      example: "Wow, this symbol means toilet!"
    },
    {
      word: "symbol",
      meaning: "상징(물), 부호[기호]",
      example: "Wow, this symbol means toilet!"
    },
    {
      word: "symbol",
      meaning: "상징(물), 부호[기호]",
      example: "Wow, this symbol means toilet!"
    },
    {
      word: "symbol",
      meaning: "상징(물), 부호[기호]",
      example: "Wow, this symbol means toilet!"
    },
    {
      word: "symbol",
      meaning: "상징(물), 부호[기호]",
      example: "Wow, this symbol means toilet!"
    },
    {
      word: "symbol",
      meaning: "상징(물), 부호[기호]",
      example: "Wow, this symbol means toilet!"
    },
    {
      word: "symbol",
      meaning: "상징(물), 부호[기호]",
      example: "Wow, this symbol means toilet!"
    },
    {
      word: "symbol",
      meaning: "상징(물), 부호[기호]",
      example: "Wow, this symbol means toilet!"
    }
  ];

  const displayList = vocabularyList.length > 0 ? vocabularyList : defaultVocabulary;
</script>

<div class="vocabulary-grid">
  <!-- 헤더 -->
  <div class="grid-header">
    <div class="header-cell word-header">단어</div>
    <div class="header-cell meaning-header">뜻</div>
    <div class="header-cell example-header">예문</div>
  </div>

  <!-- 단어 목록 -->
  <div class="grid-content">
    {#each displayList as item, index}
      <div class="grid-row">
        <!-- 단어 컬럼 -->
        <div class="cell word-cell">
          {item.word}
        </div>
        
        <!-- 뜻 컬럼 (클릭 가능) -->
        <button 
          class="cell meaning-cell {hiddenMeanings.has(index) ? 'hidden' : 'visible'}"
          onclick={() => toggleMeaning(index)}
          aria-label="{hiddenMeanings.has(index) ? '뜻 보이기' : '뜻 숨기기'}"
        >
          {#if hiddenMeanings.has(index)}
            <div class="hidden-indicator">뜻</div>
          {:else}
            {item.meaning}
          {/if}
        </button>
        
        <!-- 예문 컬럼 -->
        <div class="cell example-cell">
          {item.example}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .vocabulary-grid {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #1D2023;
    border-radius: 12px;
    overflow: hidden;
  }

  .grid-header {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    background: #2F3337;
  }

  .header-cell {
    padding: 16px;
    font-weight: 600;
    font-size: 16px;
    color: white;
    border-right: 1px solid #3A3F43;
  }

  .header-cell:last-child {
    border-right: none;
  }

  .grid-content {
    display: flex;
    flex-direction: column;
  }

  .grid-row {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    border-bottom: 1px solid #2F3337;
  }

  .grid-row:last-child {
    border-bottom: none;
  }

  .cell {
    padding: 16px;
    font-size: 14px;
    color: white;
    border-right: 1px solid #2F3337;
    display: flex;
    align-items: center;
  }

  .cell:last-child {
    border-right: none;
  }

  .word-cell {
    font-weight: 500;
    background: #272B30;
  }

  .meaning-cell {
    background: #2F3337;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    text-align: left;
    justify-content: center;
    position: relative;
  }

  .meaning-cell:hover {
    background: #3A3F43;
  }

  .meaning-cell:focus {
    outline: 2px solid #6366F1;
    outline-offset: -2px;
  }

  .meaning-cell.hidden {
    background: #6366F1;
    color: white;
  }

  .meaning-cell.hidden:hover {
    background: #5B5EF7;
  }

  .hidden-indicator {
    font-weight: 600;
    font-size: 16px;
  }

  .example-cell {
    background: #272B30;
    font-style: italic;
    color: #E5E7EB;
  }
</style>