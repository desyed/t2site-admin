import { Outlet, useNavigation } from 'react-router';
import TopBarProgress from 'react-topbar-progress-indicator';

import RevalidateLoader from '@/components/revalidate-loader';

TopBarProgress.config({
  barColors: {
    0: '#000000',
    0.5: '#000000',
    '1.0': '#000000',
  },
  barThickness: 5,
  shadowBlur: 6,
});

export default function RootLayout() {
  const navigation = useNavigation();
  return (
    <>
      {navigation.state === 'loading' && <TopBarProgress />}
      <Outlet />
      <RevalidateLoader />
    </>
  );
}
