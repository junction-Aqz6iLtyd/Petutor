<script lang="ts">
  
  
  interface StudyCardProps {
    category: string;
    count: number;
    unit: string;
    frequency: string;
    onEdit?: () => void;
  }
  
  let { category, count, unit, frequency, onEdit }: StudyCardProps = $props();
</script>

<div class="relative bg-[#2F3337] border border-white/[0.08] rounded-2xl p-6 min-h-[280px] flex flex-col">
  <!-- 카테고리 제목 -->
  <div class="text-center mb-4">
    <h3 class="text-white text-lg font-medium">{category}</h3>
  </div>
  
  <!-- 숫자와 단위 -->
  <div class="flex-1 flex flex-col justify-center">
    <div class="text-left mb-8">
      <div class="flex items-baseline gap-2">
        <span class="text-white text-6xl font-bold">{count}</span>
        <span class="text-white text-2xl">{unit}</span>
      </div>
      <div class="text-white text-lg mt-2">{frequency}</div>
    </div>
  </div>
  
  <!-- 캐릭터 이미지 -->
  <div class="absolute bottom-4 right-4">
    <img 
      src="/assets/chara.png" 
      alt="와옹이" 
      class="w-24 h-24 object-contain"
    />
  </div>
  
  <!-- 수정하기 버튼 -->
  <div class="mt-auto">
    <button 
      class="text-white text-base underline hover:text-gray-300 transition-colors"
      onclick={onEdit}
    >
      수정하기
    </button>
  </div>
</div>