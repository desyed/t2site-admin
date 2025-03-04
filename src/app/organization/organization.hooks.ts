import type { UseMutationOptions } from '@tanstack/react-query';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { toast } from 'sonner';

import { handleApiErrorException } from '@/lib/utils';

import type {
  InvitedMember,
  InviteMemberInput,
  MemberActionPayload,
  UpdateInvitationPayload,
} from './organizaion.type';

import {
  inviteOrganizationMembersApi,
  resendInvitationApi,
  cancelInvitationApi,
  promptInvitationApi,
  leaveOrganizationApi,
  changeMemberRoleApi,
  removeMemberApi,
} from './organization.api';
import {
  fetchInvitedMember,
  fetchInvitedMembers,
  fetchOrganizationMembers,
} from './organization.fetch';
import { invitedMemberQueryKeys, memberQueryKeys } from './organization.keys';

export function useRedirectIfOrganizationNotExists() {
  const navigate = useNavigate();
  const redirect = useCallback(() => {
    toast.warning('Organization not found', {
      description:
        'This organization may no longer exist or you may not have access to it',
      duration: 3000,
    });
    navigate(`/auth?ocr=true&rp=/dashboard`, { replace: true });
  }, [navigate]);
  return redirect;
}

export function useRefreshOrganization() {
  const navigate = useNavigate();
  const location = useLocation();
  const refresh = useCallback(
    (pathname?: string) => {
      navigate(`/auth?ocr=true&rp=${pathname ?? location.pathname}`, {
        replace: true,
      });
    },
    [navigate, location.pathname]
  );
  return refresh;
}

export function useInviteMembersQuery() {
  const query = useQuery({
    queryKey: invitedMemberQueryKeys.invitedMemberList(),
    queryFn: fetchInvitedMembers,
  });
  return query;
}

export function useInvitedMemberQuery(invitedMemberId: string) {
  const query = useQuery({
    queryKey: invitedMemberQueryKeys.invitedMemberDetails(invitedMemberId),
    queryFn: ({ queryKey }) => fetchInvitedMember(queryKey[1]),
    retry: 1,
    staleTime: 0,
  });

  return query;
}

export function useInviteMembersMutaion<T = unknown>(
  options?: UseMutationOptions<T, unknown, InviteMemberInput>
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => {
      return inviteOrganizationMembersApi(payload) as Promise<T>;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: invitedMemberQueryKeys.invitedMemberList(),
      });
      queryClient.invalidateQueries({ queryKey: memberQueryKeys.memberList() });
    },
    ...options,
  });
  return mutation;
}

export function useResendInvitationMutation<T = unknown>(
  options?: UseMutationOptions<T, unknown, UpdateInvitationPayload>
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => {
      return resendInvitationApi(payload) as Promise<T>;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: invitedMemberQueryKeys.invitedMemberList(),
      });
      queryClient.invalidateQueries({ queryKey: memberQueryKeys.memberList() });
    },
    ...options,
  });
  return mutation;
}

export function useCancelInvitationMutation<T = unknown>(
  options?: UseMutationOptions<T, unknown, UpdateInvitationPayload>
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => {
      return cancelInvitationApi(payload) as Promise<T>;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: invitedMemberQueryKeys.invitedMemberList(),
      });
      queryClient.invalidateQueries({ queryKey: memberQueryKeys.memberList() });
    },
    ...options,
  });
  return mutation;
}

export function useRejectedInvitationMutation<T = unknown>(
  options?: UseMutationOptions<T, unknown, UpdateInvitationPayload>
) {
  const mutation = useMutation({
    mutationFn: (payload) => {
      return promptInvitationApi(payload.invitedMemberId, {
        promptType: 'reject',
      }) as Promise<T>;
    },
    ...options,
  });
  return mutation;
}

export function useOptimisticInvitationPromptMutation() {
  const getKey = (invitedMemberId: string) => {
    return invitedMemberQueryKeys.invitedMemberDetails(invitedMemberId);
  };

  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: {
      invitedMemberId: string;
      organizationId: string;
      promptType: 'accept' | 'reject';
    }) => {
      return promptInvitationApi(payload.invitedMemberId, {
        promptType: payload.promptType,
      });
    },
    onMutate: async (payload) => {
      // Cancel any outgoing refetches
      await client.cancelQueries({
        queryKey: getKey(payload.invitedMemberId),
      });

      // Snapshot the previous value
      const previousDetails = client.getQueryData(
        getKey(payload.invitedMemberId)
      ) as InvitedMember;

      // Optimistically update the cache
      const newDetails = {
        ...previousDetails,
        status: payload.promptType === 'accept' ? 'accepted' : 'rejected',
        optimisticallyUpdatedAt: new Date().toISOString(),
      };

      // Update the cache
      client.setQueryData(getKey(payload.invitedMemberId), newDetails);

      return { newDetails, previousDetails };
    },
    onError: (_err, variables, context) => {
      handleApiErrorException(_err, true);
      if (context?.previousDetails) {
        client.setQueryData(
          getKey(variables.invitedMemberId),
          context.previousDetails
        );
        client.invalidateQueries({
          queryKey: getKey(variables.invitedMemberId),
        });
      }
    },
    onSuccess: (_data, variables, context) => {
      if (context?.previousDetails) {
        client.setQueryData(getKey(variables.invitedMemberId), {
          ...context.newDetails,
          optimisticallyUpdatedAt: undefined,
        });
      }
    },
  });
  return mutation;
}

export function useOrganizationMembersQuery() {
  const query = useQuery({
    queryKey: memberQueryKeys.memberList(),
    queryFn: () => fetchOrganizationMembers(),
  });
  return query;
}

export function useLeaveOrganizationMutation<T = unknown>(
  options?: UseMutationOptions<T, unknown, string | undefined>
) {
  const mutation = useMutation({
    mutationFn: (organizationId: string) => {
      return leaveOrganizationApi(organizationId) as Promise<T>;
    },
    ...options,
  });
  return mutation;
}

export function useChangeMemberRoleMutation<T = unknown, P = unknown>(
  options?: UseMutationOptions<T, unknown, MemberActionPayload<P>>
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => {
      return changeMemberRoleApi(payload) as Promise<T>;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: memberQueryKeys.memberList(),
      });
      queryClient.invalidateQueries({
        queryKey: invitedMemberQueryKeys.invitedMemberList(),
      });
    },
    ...options,
  });
  return mutation;
}

export function useRemoveMemberMutation<T = unknown, P = unknown>(
  options?: UseMutationOptions<T, unknown, MemberActionPayload<P>>
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => {
      return removeMemberApi(payload) as Promise<T>;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: memberQueryKeys.memberList(),
      });
      queryClient.invalidateQueries({
        queryKey: invitedMemberQueryKeys.invitedMemberList(),
      });
    },
    ...options,
  });
  return mutation;
}
