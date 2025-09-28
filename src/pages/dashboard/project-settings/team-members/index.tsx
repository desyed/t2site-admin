import type { LoaderFunction } from 'react-router';

import {
  preFetchInvitedMembers,
  preFetchOrganizationMembers,
} from '@/app/organization/organization.prefetch';
import { createPrivateLoader } from '@/middlewares/auth-middleware';

import Members from './_components/members';
import { PageHeader } from "@/components/dashboard/page-header";

export const loader: LoaderFunction = createPrivateLoader(async () => {
  await preFetchInvitedMembers();
  await preFetchOrganizationMembers();
  return [];
});

export function Component() {
  return (
    <>
    <PageHeader title="Team Members" />
    <div className='dashboard-container'>
      <Members />
    </div></>
  );
}
