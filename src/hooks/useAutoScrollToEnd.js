import { useEffect } from 'react';

/**
 * Keep a scroll container pinned to its bottom as `value` grows.
 *
 * This replaces a findDOMNode-based HOC that read `scrollHeight` and
 * `clientHeight` and then wrote `scrollTop` on every update, which forced a
 * synchronous layout on each animation frame. Writing `scrollTop` alone is
 * enough: it is a no-op when the content fits.
 */
export function useAutoScrollToEnd(ref, value, enabled = true) {
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const node = ref.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [ref, value, enabled]);
}
