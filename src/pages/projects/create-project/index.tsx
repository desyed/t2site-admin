import { createPrivateLoader } from '@/middlewares/auth-middleware';

import CreateProject from './_components/create-project';

export const loader = createPrivateLoader(() => {
  return [];
});

export function Component() {
  return (
    <div className="flex flex-1 flex-col">
      <CreateProject />
    </div>
  );
}
