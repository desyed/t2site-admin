import { useEffect, useRef, useState } from 'react';

import { useTheme } from './theme-provider';

let node: HTMLDivElement | null = null;

export default function SplashScreen() {
  const { colorMode } = useTheme();
  const splashRef = useRef<HTMLDivElement>(null);

  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (showSplash) {
      node = splashRef.current!.cloneNode(true) as HTMLDivElement;
      document.body.prepend(node!);
    }
    return () => {
      if (node) {
        node.style.opacity = '0';
        node.style.transform = 'scale(1.02)';
        setTimeout(() => {
          document.body.removeChild(node!);
          node = null;
        }, 400);
      }
    };
  }, [showSplash]);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(true);
    }, 50);
  }, []);

  if (!showSplash) return null;

  return (
    <div
      ref={splashRef}
      className="duration-400 fixed left-0 top-0 z-40 flex size-full select-none items-center justify-center bg-background transition-all ease-in-out fade-out"
      style={{
        transition:
          'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="px-5">
        <img
          draggable="false"
          src="/t2-site-brand-dark.svg"
          className="h-20 w-[90px] sm:w-[140px] lg:w-[160px]"
          style={{
            display: colorMode.isDark ? 'block' : 'none',
          }}
          alt="..."
        />

        <img
          draggable="false"
          src="/t2-site-brand-light.svg"
          className="h-20 w-[90px] sm:w-[140px] lg:w-[160px]"
          style={{
            display: colorMode.isLight ? 'block' : 'none',
          }}
          alt="..."
        />
      </div>
    </div>
  );
}
