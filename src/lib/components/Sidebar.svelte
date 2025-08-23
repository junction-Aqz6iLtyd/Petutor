<script lang="ts">
  import iconVoca from '../../assets/icon-voca.svg';
  import iconPet from '../../assets/icon-pet.svg';
  import iconHome from '../../assets/icon-home.svg';
  import coin from '../../assets/coin.svg';
  import profileImage from '../../assets/profile-image.svg';
  import { navigateTo, currentRoute } from '../stores/router';
  import type { Route } from '../stores/router';
  import { isDeveloperMode } from '../stores/developerMode';

  interface MenuItem {
    icon: string;
    label: string;
    route: Route;
  }

  const menuItems: MenuItem[] = [
    { 
      icon: iconHome, 
      label: '홈',
      route: 'settings'
    },
    { 
      icon: iconVoca, 
      label: '단어장',
      route: 'vocabulary'
    },
    { 
      icon: iconPet, 
      label: '펫상점',
      route: 'petshop'
    },
  ];

  // 현재 라우트에 따라 선택된 메뉴 아이템 결정
  let selectedMenuItem = $derived(getSelectedMenuItem($currentRoute));
  
  function getSelectedMenuItem(route: Route): string {
    const item = menuItems.find(item => item.route === route);
    return item?.label || '홈';
  }

  function handleMenuClick(item: MenuItem) {
    navigateTo(item.route);
  }

  function handleKeyDown(event: KeyboardEvent, item: MenuItem) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleMenuClick(item);
    }
  }
</script>

<!-- 전체 배경 -->
<div class="w-72 h-full bg-color-bg flex flex-col">
  <!-- 사이드바 컨테이너 (여백과 둥근 모서리 적용) -->
  <div class="flex-1 p-4">
    <aside class="h-full bg-color-surface rounded-2xl flex flex-col overflow-hidden border border-color-border-sidebar">
      <!-- 헤더 -->
      <div class="p-4 border-b border-color-border">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img src="/icons/app-icon@48.png" alt="App Icon" class="w-8 h-8 rounded flex-shrink-0 border border-color-border">
            <span class="text-color-text font-medium text-sm">Petutor</span>
          </div>
          <button 
            class="text-color-text-secondary hover:text-color-text transition-colors duration-200 p-1 rounded hover:bg-color-hover"
            aria-label="닫기"
            onclick={() => window.close()}
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 메뉴 리스트 -->
      <nav class="flex-1 p-4" aria-label="메인 네비게이션">
        <div class="space-y-2">
          {#each menuItems as item}
            <button
              class="w-full flex items-center gap-3 p-3 text-left transition-all duration-200 group rounded-lg focus:outline-none
                     {selectedMenuItem === item.label 
                       ? 'text-white bg-color-active' 
                       : 'text-[#ACB6B9] hover:text-white hover:bg-color-hover'}"
              onclick={() => handleMenuClick(item)}
              onkeydown={(e) => handleKeyDown(e, item)}
              aria-current={selectedMenuItem === item.label ? 'page' : undefined}
              tabindex={0}
            >
              
              <img 
                src={item.icon} 
                alt=""
                class="w-6 h-6 flex-shrink-0 transition-all duration-200
                       {selectedMenuItem === item.label 
                         ? 'opacity-100 brightness-0 invert' 
                         : 'opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert'}"
              />
              <span class="font-medium text-sm">{item.label}</span>
            </button>
          {/each}
        </div>
      </nav>

      <!-- 하단 사용자 정보 -->
      <div class="p-4">
        <div class="bg-color-user-info-bg rounded-lg p-3 border border-color-border">
            <button 
              class="w-full flex items-center gap-3 transition-all duration-200 group"
              onclick={() => {}}
              aria-label="사용자 정보"
            >
              <div class="relative">
                <img src={profileImage} alt="프로필" class="w-8 h-8 rounded-full transition-transform duration-200 group-hover:scale-105" />
                <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-color-surface rounded-full"></div>
              </div>
              <div class="flex-1 text-left">
                <div class="text-color-text font-medium text-sm">와옹짱님</div>
              </div>
              <div class="flex items-center gap-1">
                <img src={coin} alt="코인" class="w-4 h-4" />
                <span class="text-yellow-400 font-bold text-sm">1,000</span>
              </div>
            </button>
        </div>
        
        <!-- 개발자 모드 버튼 -->
        <button 
          class="w-full mt-3 p-2 border border-color-border rounded-lg text-[#ACB6B9] hover:text-blue-400 hover:border-blue-400 hover:bg-blue-500 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center gap-2 group"
          onclick={() => isDeveloperMode.update(val => !val)}
          aria-label="개발자 모드"
        >
          <span class="text-sm font-medium">개발자 모드 {$isDeveloperMode ? 'ON' : 'OFF'}</span>
        </button>

        {#if $isDeveloperMode}
        <!-- 온보딩 버튼 -->
        <button 
          class="w-full mt-3 p-2 border border-color-border rounded-lg text-[#ACB6B9] hover:text-green-400 hover:border-green-400 hover:bg-green-500 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center gap-2 group"
          onclick={() => navigateTo('sign')}
          aria-label="온보딩"
        >
          <span class="text-sm font-medium">온보딩</span>
        </button>
        {/if}
        
        <!-- 로그아웃 버튼 -->
        <button 
          class="w-full mt-3 p-2 border border-color-border rounded-lg text-[#ACB6B9] hover:text-red-400 hover:border-red-400 hover:bg-red-500 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center gap-2 group"
          onclick={() => {}}
          aria-label="로그아웃"
        >
          <span class="text-sm font-medium">로그아웃</span>
          <svg class="w-4 h-4 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </aside>
  </div>
</div>