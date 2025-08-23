<script lang="ts">
  import chara from '../../assets/chara.png';
</script>

<div class="bg-color-accent rounded-2xl p-6 mb-6 relative overflow-hidden h-32">
  <!-- 배경 장식 -->
  <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
  <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
  
  <div class="flex items-center relative z-10 h-full">
    <!-- 왼쪽: 캐릭터 이미지 (크게, 위아래 잘리도록) -->
    <div class="flex items-center gap-6 flex-1">
      <div class="relative">
        <img src={chara} alt="캐릭터" class="w-32 h-36 object-contain -my-2" />
      </div>
      <div>
        <h2 class="text-white text-2xl font-bold mb-2">김와옹 <span class="text-lg font-normal">21세 여성</span></h2>
        <p class="text-white/90 text-base">토익 800점 받자! 할 수 있다! 하루에 단어 10개 이상 외우기</p>
      </div>
    </div>
  </div>
</div>