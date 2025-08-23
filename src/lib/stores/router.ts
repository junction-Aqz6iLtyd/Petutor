import { writable } from 'svelte/store';

export type Route = 'main' | 'vocabulary' | 'petshop' | 'settings' | 'onboarding1' | 'onboarding2' | 'onboarding3' | 'onboardingFinish' | 'login' | 'sign';

export const currentRoute = writable<Route>('main');

export function navigateTo(route: Route) {
  currentRoute.set(route);
}