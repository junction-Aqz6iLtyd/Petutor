<script lang="ts">
  interface Props {
    label?: string;
    value?: string;
    placeholder?: string;
    id?: string;
  }
  
  let { label = "", value = $bindable(""), placeholder = "", id }: Props = $props();
  
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
</script>

<div class="space-y-2">
  {#if label}
    <label for={inputId} class="block text-white text-lg font-medium">{label}</label>
  {/if}
  <input
    id={inputId}
    type="text"
    bind:value
    {placeholder}
    class="w-full px-6 py-4 bg-transparent border-2 border-indigo-500 rounded-lg text-white text-lg placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-200 hover:border-indigo-400"
  />
</div>