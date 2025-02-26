import type { LoaderFunction } from 'react-router';

import {
  preFetchInvitedMembers,
  preFetchOrganizationMembers,
} from '@/app/organization/organization-prefetch';
import { createPrivateLoader } from '@/middlewares/auth-middleware';

import Members from './_components/members';

export const loader: LoaderFunction = createPrivateLoader(async () => {
  await preFetchInvitedMembers();
  await preFetchOrganizationMembers();
  return [];
});

export function Component() {
  return (
    <div>
      <title>Settings | Organization - Members</title>
      <Members />
    </div>
  );
}
