import type { LoaderFunction } from '@remix-run/router';
import type { Params } from 'react-router';

import { useLoaderData } from 'react-router';
import { z } from 'zod';

import { preFetchInvitedMember } from '@/app/team-members/organization.prefetch';
import { validInvitedMemberId } from '@/lib/validations';
import { createPrivateLoader } from '@/middlewares/auth-middleware';

import InvitationErrorTemplate from './_components/invitaion-error-template';
import Invitation from './_components/invitation';
export type InviationLoaderData = {
  error?: {
    invalidInvitationLink: boolean;
  };
  invitedMemberId?: string;
};

const paramsSchema = z.object({
  invitedMemberId: z
    .string()
    .refine(validInvitedMemberId, { message: 'Invalid invitation link' }),
});

export const loader: LoaderFunction<Params> = createPrivateLoader(
  async ({ params }) => {
    const paramsResult = paramsSchema.safeParse(params);
    if (paramsResult.error) {
      return {
        error: {
          invalidInvitationLink: true,
        },
      };
    }
    await preFetchInvitedMember(paramsResult.data.invitedMemberId);
    return {
      invitedMemberId: paramsResult.data.invitedMemberId,
    };
  }
);

export function Component() {
  const { error, invitedMemberId } = useLoaderData<InviationLoaderData>();

  if (!invitedMemberId || error?.invalidInvitationLink) {
    return (
      <InvitationErrorTemplate
        type="error"
        message="The invitation link you're trying to access is invalid. Please check the link and try again."
        title="Invalid Invitation Link"
      />
    );
  }

  return <Invitation invitedMemberId={invitedMemberId} />;
}
