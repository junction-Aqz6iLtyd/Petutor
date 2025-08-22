export interface MenuItem {
  icon: string;
  label: string;
  action?: () => void;
}

export interface Character {
  id: number;
  unlocked: boolean;
  emoji: string;
}