<script lang="ts">
  interface Props {
    checked?: boolean;
    label?: string;
    disabled?: boolean;
    id?: string;
  }
  
  let { checked = $bindable(false), label = "", disabled = false, id }: Props = $props();
  
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
  
  function toggle() {
    if (!disabled) {
      checked = !checked;
    }
  }
</script>

<div class="flex items-center justify-between">
  {#if label}
    <label for={switchId} class="text-white text-lg font-medium">{label}</label>
  {/if}
  <button
    id={switchId}
    role="switch"
    aria-checked={checked}
    aria-labelledby={label ? `${switchId}-label` : undefined}
    aria-label={!label ? "Toggle switch" : undefined}
    class="relative w-12 h-6 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 hover:scale-105 {checked ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-600 hover:bg-gray-500'} {disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : 'cursor-pointer'}"
    onclick={toggle}
    {disabled}
  >
    <div
      class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 {checked ? 'translate-x-6' : 'translate-x-0'}"
    ></div>
  </button>
</div>