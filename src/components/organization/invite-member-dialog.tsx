"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { useAuthStore } from "@/app/auth/auth-store";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { InviteMemberForm } from "./invite-member-form";
import { Button } from "../ui/button";


export function InviteMemberDialog() {

  const userOrganizations = useAuthStore((state) => state.userOrganization);

  const [open, setOpen] = useState(false);
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" >
          <PlusIcon className="mr-1 size-4" />
          Invite team member
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[756px]">
        <DialogHeader className="px-5 pt-5">
          <DialogTitle className="mb-1 text-xl">Invite others to <span className="text-primary/90">{userOrganizations?.currentOrganization?.name}</span></DialogTitle>
          <DialogDescription className="pb-1 text-base">
            Invite others to your organization to collaborate together. An invite is specific to an email address and
            expires after 3 days. Name can be provided for the team {`member's`} convenience.
          </DialogDescription>
        </DialogHeader>
        <InviteMemberForm onClose={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  );
}

