import { preFetchProjects } from '@/app/project/project.prefetch';
import { createPrivateLoader } from '@/middlewares/auth-middleware';

import Projects from './_components/Projects';

export const loader = createPrivateLoader(async () => {
  await preFetchProjects();
  return {};
});

export function Component() {
  return (
    <div className="m-2 flex flex-1 flex-col md:m-6">
      <Projects />
    </div>
  );
}
