import type { LoaderFunction } from 'react-router';

import {
  preFetchInvitedMembers,
  preFetchProjectMembers,
} from '@/app/project-member/project-member.prefetch';
import { PageHeader } from '@/components/dashboard/page-header';
import { createPrivateLoader } from '@/middlewares/auth-middleware';

import Members from './_components/members';

export const loader: LoaderFunction = createPrivateLoader(async (context) => {
  await preFetchInvitedMembers(context.params.projectId ?? '');
  await preFetchProjectMembers(context.params.projectId ?? '');
  return [];
});

export function Component() {
  return (
    <>
      <PageHeader title="Team Members" />
      <div className="dashboard-container">
        <Members />
      </div>
    </>
  );
}
