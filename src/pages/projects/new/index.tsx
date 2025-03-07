import { createPrivateLoader } from '@/middlewares/auth-middleware';

import CreateNewProject from './_components/create-new-project';

export const loader = createPrivateLoader(() => {
  return [];
});

export function Component() {
  return (
    <div className="flex flex-1 flex-col ">
      <CreateNewProject />
    </div>
  );
}
