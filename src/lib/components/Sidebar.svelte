<script lang="ts">
  import { MENU_ITEMS } from "../constants/menu";
</script>

<aside class="w-16 bg-color-surface border-r border-color-border p-2">
  <nav class="flex flex-col gap-2">
    {#each MENU_ITEMS as item}
      <button 
        class="w-12 h-12 flex items-center justify-center rounded-lg text-color-text-secondary hover:bg-color-hover hover:text-color-text transition-all duration-200 group"
        onclick={item.action}
        title={item.label}
      >
        <span class="text-lg group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
      </button>
    {/each}
  </nav>
</aside>
