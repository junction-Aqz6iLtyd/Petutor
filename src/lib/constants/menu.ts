import type { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  { icon: '🏠', label: 'Home', action: () => console.log('Home clicked') },
  { icon: '⚙️', label: 'Settings', action: () => console.log('Settings clicked') },
  { icon: '❓', label: 'Help', action: () => console.log('Help clicked') },
];