import { use } from 'react';

import { delay } from '@/lib/utils';

const loadData = async () => {
  await delay(2000);
  return 'done';
};

export default function React19() {
  const data = use(loadData());
  return <div>{data}</div>;
}
