<script lang="ts">
  import iconVoca from '../../assets/icon-voca.svg';
  import iconPet from '../../assets/icon-pet.svg';
  import iconSettings from '../../assets/icon-settings.svg';
  import coin from '../../assets/coin.svg';
  import profileImage from '../../assets/profile-image.svg';

  interface MenuItem {
    icon: string;
    label: string;
    action: () => void;
  }

  const menuItems: MenuItem[] = [
    { 
      icon: iconVoca, 
      label: '단어장', 
      action: () => {
        if (typeof chrome !== 'undefined' && chrome.runtime) {
          chrome.runtime.sendMessage({ action: 'openVocabulary' });
        }
      }
    },
    { icon: iconPet, label: '펫상점', action: () => {} },
    { icon: iconSettings, label: '설정', action: () => {} },
  ];

  let selectedMenuItem = $state('단어장');

  function handleMenuClick(item: MenuItem) {
    selectedMenuItem = item.label;
    item.action();
  }
</script>

<aside class="w-64 bg-color-surface border-r border-color-border flex flex-col h-full">
  <!-- 헤더 -->
  <div class="p-4 border-b border-color-border">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-white rounded flex-shrink-0"></div>
        <span class="text-color-text font-medium">와옹이랑 영어해요</span>
      </div>
      <button class="text-color-text-secondary hover:text-color-text">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>

  <!-- 메뉴 리스트 -->
  <nav class="flex-1 p-4">
    <div class="space-y-2">
      {#each menuItems as item}
        <button
          class="w-full flex items-center gap-3 p-3 text-left transition-all duration-200 group relative
                 {selectedMenuItem === item.label 
                   ? 'text-white' 
                   : 'text-[#ACB6B9] hover:text-white'}"
          onclick={() => handleMenuClick(item)}
        >
          {#if selectedMenuItem === item.label}
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r"></div>
          {/if}
          <img 
            src={item.icon} 
            alt={item.label}
            class="w-6 h-6 flex-shrink-0 transition-opacity
                   {selectedMenuItem === item.label 
                     ? 'opacity-100 brightness-0 invert' 
                     : 'opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert'}"
          />
          <span class="font-medium">{item.label}</span>
        </button>
      {/each}
    </div>
  </nav>

  <!-- 하단 사용자 정보 -->
  <div class="p-4 border-t border-color-border">
    <div class="flex items-center gap-3 p-3">
      <img src={profileImage} alt="프로필" class="w-8 h-8 rounded-full" />
      <div class="flex-1">
        <div class="text-color-text font-medium text-sm">와옹짱님</div>
      </div>
      <div class="flex items-center gap-1">
        <img src={coin} alt="코인" class="w-4 h-4" />
        <span class="text-yellow-400 font-bold text-sm">1,000</span>
      </div>
    </div>
    
    <!-- 로그아웃 버튼 -->
    <button class="w-full mt-3 p-2 border border-color-border rounded-lg text-[#ACB6B9] hover:text-color-text hover:border-color-text transition-all duration-200 flex items-center justify-center gap-2">
      <span class="text-sm">로그아웃</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
      </svg>
    </button>
  </div>
</aside>
