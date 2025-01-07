import { SidebarLogo } from './ui/sidebar';

export default function NavLogo() {
  return (
    <SidebarLogo
      logo={{
        dark: {
          url: '/t2-site-brand-dark.svg',
          mobileUrl: '/t2-site-icon-dark.svg',
        },
        light: {
          url: '/t2-site-brand-light.svg',
          mobileUrl: '/t2-site-icon-light.svg',
        },
      }}
    />
  );
}
