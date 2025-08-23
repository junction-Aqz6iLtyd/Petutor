import { writable } from 'svelte/store';

export type Route = 
  | 'main' 
  | 'vocabulary' 
  | 'petshop' 
  | 'settings'
  | 'sign'
  | 'login' 
  | 'onboarding1' 
  | 'onboarding2' 
  | 'onboarding3' 
  | 'onboarding-finish'
  | 'home';

export const router = writable<Route>('sign');
export const currentRoute = writable<Route>('main');

export function navigateTo(route: Route) {
  currentRoute.set(route);
}