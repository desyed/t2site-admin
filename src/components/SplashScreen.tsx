import { useTheme } from './theme-provider';

export default function SplashScreen() {
  const { colorMode } = useTheme();
  return (
    <div className="fixed left-0 top-0 z-40 flex h-full w-full select-none items-center justify-center bg-background">
      <div className="px-5">
        <img
          draggable="false"
          src="/t2-site-brand-dark.svg"
          className="h-20 w-[120px] sm:w-[190px] lg:w-[210px]"
          style={{
            display: colorMode.isDark ? 'block' : 'none'
          }}
        />

        <img
          draggable="false"
          src="/t2-site-brand-light.svg"
          className="h-20 w-[120px] sm:w-[190px] lg:w-[210px]"
          style={{
            display: colorMode.isLight ? 'block' : 'none'
          }}
        />
      </div>
    </div>
  );
}
