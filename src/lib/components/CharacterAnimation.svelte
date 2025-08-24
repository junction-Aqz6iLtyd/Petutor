<script lang="ts">
  import { onMount } from 'svelte';
  const { mode = 'walk', onEnd = () => {} } = $props<{ mode?: 'walk' | 'exit'; onEnd?: () => void }>();

  let frame = 1;
  let interval: any;
  let left = 0;
  let isVisible = true;

  // 등장 애니메이션 (1~90)
  function startWalk() {
    frame = 1;
    left = 0;
    isVisible = true;
    interval = setInterval(() => {
      if (frame < 90) {
        frame++;
        left += 2; // 걸어오는 느낌
      } else {
        clearInterval(interval);
        frame = 90;
        left += 2;
        onEnd?.();
      }
    }, 40); // 25fps
  }

  // 사라지는 애니메이션 (90~165)
  function startExit() {
    frame = 90;
    interval = setInterval(() => {
      if (frame < 165) {
        frame++;
        left += 6; // 오른쪽으로 빠르게 이동
      } else {
        clearInterval(interval);
        isVisible = false;
        onEnd?.();
      }
    }, 30); // 더 빠르게
  }

  $effect(() => {
    if (interval) clearInterval(interval);
    if (mode === 'walk') {
      startWalk();
    } else if (mode === 'exit') {
      startExit();
    }
  });

  onMount(() => {
    // 컴포넌트 언마운트 시 interval 정리
    return () => clearInterval(interval);
  });
</script>

{#if isVisible}
  <img
    src={`/assets/animation/Wawong_2_${String(frame).padStart(4, '0')}.webp`}
    alt="캐릭터 애니메이션"
    style="position: absolute; left: {left}px; bottom: 0; width: 180px; height: auto; transition: left 0.03s linear;"
  />
{/if}

<style>
  img {
    z-index: 10;
    pointer-events: none;
  }
</style>
