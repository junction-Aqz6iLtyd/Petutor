import { writable } from 'svelte/store';

export type Route = 'main' | 'vocabulary' | 'petshop' | 'settings' | 'simulation' | 'onboarding1' | 'onboarding2' | 'onboarding3' | 'onboarding-finish';

export const currentRoute = writable<Route>('main');

export function navigateTo(route: Route) {
  currentRoute.set(route);
}
