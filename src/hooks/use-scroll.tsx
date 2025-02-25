import type { RefObject } from 'react';

import { useCallback, useRef } from 'react';

export function useSmoothScroll<T extends HTMLElement>(): [RefObject<T>, () => void] {
  const ref = useRef<T>(null);

  const smoothScrollToBottom = useCallback(() => {
    if (ref.current) {
      const container = ref.current;
      const scrollHeight = container.scrollHeight;
      const height = container.clientHeight;
      const maxScrollTop = scrollHeight - height;

      const startTime = performance.now();
      const startScrollTop = container.scrollTop;
      const duration = 300;

      const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          const progress = elapsedTime / duration;
          const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
          container.scrollTop = startScrollTop + (maxScrollTop - startScrollTop) * easeProgress;
          requestAnimationFrame(animateScroll);
        } else {
          container.scrollTop = maxScrollTop;
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }, []);

  return [ref, smoothScrollToBottom];
}

export function useCallWithScroll<T>(append: (value: T) => void, smoothScrollToBottom: () => void) {
  const handleAppend = useCallback(
    (value: T) => {
      append(value);
      requestAnimationFrame(() => {
        requestAnimationFrame(smoothScrollToBottom);
      });
    },
    [append, smoothScrollToBottom]
  );

  return handleAppend;
}
