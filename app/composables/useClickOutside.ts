import { onBeforeUnmount, onMounted, type Ref } from 'vue';

/** Ferme un panneau flottant dès qu'un clic a lieu en dehors de son élément racine. */
export function useClickOutside(target: Ref<HTMLElement | null>, onOutside: () => void) {
  function handleClick(event: MouseEvent) {
    const element = target.value;
    if (!element || !(event.target instanceof Node)) return;
    if (!element.contains(event.target)) onOutside();
  }

  onMounted(() => document.addEventListener('mousedown', handleClick));
  onBeforeUnmount(() => document.removeEventListener('mousedown', handleClick));
}
