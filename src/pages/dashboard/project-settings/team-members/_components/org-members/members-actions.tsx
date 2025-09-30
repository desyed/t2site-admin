import {
  MoreHorizontal,
  XIcon,
  LogOutIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CrownIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import type { ProjectMember } from '@/app/project-member/project-member.type';
import type { Project } from '@/app/project/project.type';
import type { RoleName } from '@/constants/roles';

import {
  useChangeMemberRoleMutation,
  useLeaveProjectMutation,
  useRemoveMemberMutation,
} from '@/app/project-member/project-member.hooks';
import {
  checkMemberHasPermission,
  checkRemoveMemberPermission,
  isMemberRole,
  isOwnerRole,
} from '@/app/project-member/project-member.service';
import { HoverCardMessage } from '@/components/hover-card-message';
import SiteAlertDialog from '@/components/site-alert-dialog';
import { Button } from '@/components/site-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { roles } from '@/constants/roles';
import { handleApiErrorException } from '@/lib/utils';
type ChangeRoleInfo = {
  action: 'upgrade' | 'downgrade';
  changeRoleTo: RoleName;
};

type MembersActionsProps = {
  member: ProjectMember;
  handleChangeRole?: (info: ChangeRoleInfo, hasConfirmed?: boolean) => void;
  handleRemoveMember?: (confirmed?: boolean) => void;
  currentProject: Project;
};

export function CurrentUserDropdownMenu({
  member,
  currentProject,
}: MembersActionsProps) {
  const navigate = useNavigate();

  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);

  const isOwner = isOwnerRole(member.role);

  const { mutate: leaveProject, isPending: isLeavingOrganization } =
    useLeaveProjectMutation<{ success: boolean }>();

  useEffect(() => {
    if (
      member.currentUser &&
      member.role !== currentProject?.currentUser?.role
    ) {
      console.log(member.role);
      console.log(currentProject?.currentUser?.role);
      // location.reload();
    }
  }, [currentProject?.currentUser?.role, member]);

  if (isOwner)
    return (
      <HoverCardMessage
        description="You have full access as the owner. To leave,
       you must first transfer ownership to another member."
      />
    );

  const handleLeaveOrganization = () => {
    leaveProject(currentProject?.id ?? '', {
      onSuccess: () => {
        navigate(`/`, { replace: true });
        setIsLeaveDialogOpen(false);
      },
      onError: (error) => {
        handleApiErrorException(error, true);
      },
      onSettled: () => {
        setIsLeaveDialogOpen(false);
      },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-6 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => setIsLeaveDialogOpen(true)}
            className="text-destructive focus:bg-destructive/10 focus:text-destructive"
          >
            <LogOutIcon className="mr-2 size-4" /> Leave project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SiteAlertDialog
        open={isLeaveDialogOpen}
        setOpen={setIsLeaveDialogOpen}
        isDanger={true}
        loadingText="Leaving project..."
        title="Leave project"
        loading={isLeavingOrganization}
        confirmIcon={<LogOutIcon className="size-4" />}
        description={
          <>
            Are you sure you want to leave{' '}
            <span className="font-semibold text-foreground">
              {currentProject?.name} ?
            </span>
          </>
        }
        onConfirm={handleLeaveOrganization}
        confirmText={<>Leave project</>}
      />
    </>
  );
}

export function RemoveMemberDropdownMenuItem({
  member,
  handleRemoveMember,
  currentProject,
}: MembersActionsProps) {
  if (
    !checkRemoveMemberPermission(currentProject?.currentUser?.role, member.role)
  ) {
    return null;
  }

  return (
    <>
      <DropdownMenuItem
        className="text-destructive focus:bg-destructive/10 focus:text-destructive"
        onSelect={() => handleRemoveMember && handleRemoveMember()}
      >
        <XIcon className="mr-2 size-4" /> Remove member from project
      </DropdownMenuItem>
    </>
  );
}

export function ChangeRoleDropdownMenuItem({
  member,
  handleChangeRole,
  currentProject,
}: MembersActionsProps) {
  const currentMemberRoleIndex =
    roles[currentProject?.currentUser?.role as keyof typeof roles];
  const memberRoleIndex = roles[member.role as keyof typeof roles];

  return (
    <>
      {Object.entries(roles).map(([role, roleIndex]) => {
        if (
          roleIndex < currentMemberRoleIndex ||
          roleIndex == memberRoleIndex
        ) {
          return null;
        }
        if (roleIndex > memberRoleIndex) {
          return (
            <DropdownMenuItem
              key={role}
              onSelect={() => {
                if (handleChangeRole) {
                  handleChangeRole(
                    {
                      action: 'downgrade',
                      changeRoleTo: role as RoleName,
                    },
                    true
                  );
                }
              }}
            >
              <ArrowDownIcon className="mr-2 size-3" /> Downgrade to {role}
            </DropdownMenuItem>
          );
        }

        if (roleIndex === 1) {
          return (
            <DropdownMenuItem
              onSelect={() => {
                if (handleChangeRole) {
                  handleChangeRole(
                    {
                      action: 'upgrade',
                      changeRoleTo: role as RoleName,
                    },
                    false
                  );
                }
              }}
              key={role}
            >
              <CrownIcon className="mr-2 size-3" /> Make owner
            </DropdownMenuItem>
          );
        }

        return (
          <DropdownMenuItem
            onSelect={() => {
              if (handleChangeRole) {
                handleChangeRole(
                  {
                    action: 'upgrade',
                    changeRoleTo: role as RoleName,
                  },
                  true
                );
              }
            }}
            key={role}
          >
            <ArrowUpIcon className="mr-2 size-3" /> Upgrade to {role}
          </DropdownMenuItem>
        );
      })}
      <DropdownMenuSeparator />
    </>
  );
}

export default function MembersActions({
  member,
  currentProject,
}: MembersActionsProps) {
  const [changeRoleInfo, setChangeRoleInfo] = useState<ChangeRoleInfo | null>(
    null
  );

  const { mutateAsync: changeMemberRole, isPending: isChangingMemberRole } =
    useChangeMemberRoleMutation<
      {
        success: boolean;
      },
      {
        role: RoleName;
      }
    >();

  const [isRemoveMemberDialogOpen, setIsRemoveMemberDialogOpen] =
    useState(false);

  const { mutateAsync: removeMember } = useRemoveMemberMutation<{
    success: boolean;
  }>();

  if (member.currentUser) {
    return (
      <CurrentUserDropdownMenu
        member={member}
        currentProject={currentProject}
      />
    );
  }

  if (isMemberRole(currentProject?.currentUser?.role)) {
    return (
      <HoverCardMessage
        description="You don't have permission to
       change this member's access level."
      />
    );
  }

  if (
    !checkMemberHasPermission(currentProject?.currentUser?.role, member.role)
  ) {
    return (
      <HoverCardMessage
        description="You don't have permission to 
      change this member's access level."
      />
    );
  }

  const handleChangeRole = (
    info: ChangeRoleInfo,
    hasConfirmed: boolean = false
  ) => {
    if (!hasConfirmed) {
      setChangeRoleInfo(info);
    } else {
      setChangeRoleInfo(null);
      toast.promise(
        changeMemberRole(
          {
            memberId: member.id,
            projectId: currentProject?.id,
            payload: {
              role: info.changeRoleTo,
            },
          },
          {
            onError: (error) => {
              handleApiErrorException(error, true);
            },
          }
        ),
        {
          loading: `Updating ${member.user.email}'s role to ${info.changeRoleTo}...`,
          success: `Successfully changed ${member.user.email}'s role to ${info.changeRoleTo}`,
          error: `Unable to change role. Please try again.`,
        }
      );
    }
  };

  const handleRemoveMember = (confirmed: boolean = false) => {
    if (!confirmed) {
      setIsRemoveMemberDialogOpen(true);
    } else {
      setIsRemoveMemberDialogOpen(false);
      toast.promise(
        removeMember(
          {
            memberId: member.id,
            projectId: currentProject?.id,
          },
          {
            onError: (error) => {
              const { status } = handleApiErrorException(error, true);
              if (status && status < 501) {
                location.reload();
              }
            },
          }
        ),
        {
          loading: `Removing ${member.user.email}...`,
          success: `Successfully removed ${member.user.email}`,
          error: `Failed to remove ${member.user.email}`,
        }
      );
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-6 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <ChangeRoleDropdownMenuItem
            handleChangeRole={handleChangeRole}
            member={member}
            currentProject={currentProject}
          />
          <RemoveMemberDropdownMenuItem
            member={member}
            currentProject={currentProject}
            handleRemoveMember={handleRemoveMember}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      {changeRoleInfo && (
        <SiteAlertDialog
          open={true}
          setOpen={() => setChangeRoleInfo(null)}
          isDanger={true}
          loading={isChangingMemberRole}
          title={
            <>
              Add additional owner to{' '}
              <span className="text-primary">{currentProject?.name}</span>
            </>
          }
          description={
            <>
              <span className="text-foreground">{member.user.email}</span> will
              be added as an <span className="text-foreground">owner</span> to{' '}
              <span className="text-foreground">{currentProject?.name}</span>
            </>
          }
          loadingText={'Making owner'}
          onConfirm={() => handleChangeRole(changeRoleInfo, true)}
          confirmIcon={<CrownIcon className="size-4" />}
          confirmText={<>Make owner</>}
          confirmInput={true}
          confirmInputValue={member.user.email}
        />
      )}

      <SiteAlertDialog
        onConfirm={() => handleRemoveMember(true)}
        description={
          <>
            Are you sure you want to remove{' '}
            <span className="font-semibold text-foreground">
              {' '}
              {member.user.email}
            </span>{' '}
            from the
            <span className="font-semibold text-foreground">
              {' '}
              {currentProject?.name}
            </span>
            ?
          </>
        }
        open={isRemoveMemberDialogOpen}
        setOpen={setIsRemoveMemberDialogOpen}
        isDanger={true}
        loadingText="Removing member..."
        confirmIcon={<XIcon className="size-5" />}
        confirmText={'Remove member'}
        title={
          <span className="flex items-center gap-2 text-destructive">
            <XIcon className="size-5" /> Remove member
          </span>
        }
      />
    </>
  );
}
