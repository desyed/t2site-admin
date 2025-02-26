import { Suspense } from 'react';

import React19 from './components/React19';
export async function loader() {
  return {
    title: 'Dashboard',
  };
}

export function Component() {
  return (
    <div className="mt-5 flex flex-1 flex-col gap-4 p-5 pt-0">
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <React19 />
        </Suspense>
      </div>
    </div>
  );
}
