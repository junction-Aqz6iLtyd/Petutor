import { writable } from 'svelte/store';

export type Route = 'main' | 'vocabulary' | 'petshop' | 'settings';

export const currentRoute = writable<Route>('main');

export function navigateTo(route: Route) {
  currentRoute.set(route);
}