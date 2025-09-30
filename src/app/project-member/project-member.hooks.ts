import type { UseMutationOptions } from '@tanstack/react-query';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { handleApiErrorException } from '@/lib/utils';

import type {
  InvitedMember,
  InviteMemberInput,
  MemberActionPayload,
  UpdateInvitationPayload,
} from './project-member.type';

import {
  inviteProjectMembersApi,
  resendInvitationApi,
  removeInvitationApi,
  promptInvitationApi,
  leaveProjectApi,
  changeMemberRoleApi,
  removeMemberApi,
} from './projecet-memebr.api';
import {
  fetchInvitedMember,
  fetchInvitedMembers,
  fetchProjectMembers,
} from './project-member.fetch';
import { invitedMemberQueryKeys, memberQueryKeys } from './project-member.keys';

export function useRedirectIfProjectNotExists() {
  const navigate = useNavigate();
  const redirect = useCallback(() => {
    toast.warning('Project not found', {
      description:
        'This project may no longer exist or you may not have access to it',
      duration: 3000,
    });
    navigate(`/`, { replace: true });
  }, [navigate]);
  return redirect;
}

export function useInviteMembersQuery(projectId: string) {
  const query = useQuery({
    queryKey: invitedMemberQueryKeys.invitedMemberList(projectId),
    queryFn: () => fetchInvitedMembers(projectId),
  });
  return query;
}

export function useInvitedMemberQuery(invitedMemberId: string) {
  const query = useQuery({
    queryKey: invitedMemberQueryKeys.invitedMemberDetails(invitedMemberId),
    queryFn: ({ queryKey }) => fetchInvitedMember(queryKey[1] ?? ''),
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
      return inviteProjectMembersApi(payload) as Promise<T>;
    },
    onSettled: (_, __, payload) => {
      queryClient.invalidateQueries({
        queryKey: invitedMemberQueryKeys.invitedMemberList(payload.projectId),
      });
      queryClient.invalidateQueries({
        queryKey: memberQueryKeys.memberList(payload.projectId),
      });
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
    onSettled: (_, __, payload) => {
      queryClient.invalidateQueries({
        queryKey: invitedMemberQueryKeys.invitedMemberList(payload.projectId),
      });
      queryClient.invalidateQueries({
        queryKey: memberQueryKeys.memberList(payload.projectId),
      });
    },
    ...options,
  });
  return mutation;
}

export function useRemoveInvitationMutation<T = unknown>(
  options?: UseMutationOptions<T, unknown, UpdateInvitationPayload>
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => {
      return removeInvitationApi(payload) as Promise<T>;
    },
    onSettled: (_, __, payload) => {
      queryClient.invalidateQueries({
        queryKey: invitedMemberQueryKeys.invitedMemberList(payload.projectId),
      });
      queryClient.invalidateQueries({
        queryKey: memberQueryKeys.memberList(payload.projectId),
      });
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

export function useProjectMembersQuery(projectId: string) {
  const query = useQuery({
    queryKey: memberQueryKeys.memberList(projectId),
    queryFn: () => fetchProjectMembers(projectId),
  });
  return query;
}

export function useLeaveProjectMutation<T = unknown>(
  options?: UseMutationOptions<T, unknown, string | undefined>
) {
  const mutation = useMutation({
    mutationFn: (projectId: string) => {
      return leaveProjectApi(projectId) as Promise<T>;
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
    onSettled: (_, __, payload) => {
      queryClient.invalidateQueries({
        queryKey: memberQueryKeys.memberList(payload.projectId),
      });
      queryClient.invalidateQueries({
        queryKey: invitedMemberQueryKeys.invitedMemberList(payload.projectId),
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
    onSettled: (_, __, payload) => {
      queryClient.invalidateQueries({
        queryKey: memberQueryKeys.memberList(payload.projectId),
      });
      queryClient.invalidateQueries({
        queryKey: invitedMemberQueryKeys.invitedMemberList(payload.projectId),
      });
    },
    ...options,
  });
  return mutation;
}
