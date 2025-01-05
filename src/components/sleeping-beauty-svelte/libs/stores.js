import { writable } from 'svelte/store';

export const currentStage = writable('intro');
export const history = writable([]);
export const probability = writable(null);
export const skipTyping = writable(false);