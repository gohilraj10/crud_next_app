"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "n@/components/ui/dialog";
import UserForm from "./UserForm";
import {
  defaultUserFormValues,
  userToFormValues,
} from "./userFormSchema";
import { User, UserFormValues, getUserFullName } from "n@/types/user";

interface UserFormModalProps {
  mode: "create" | "edit";
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: UserFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export default function UserFormModal({
  mode,
  user,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: UserFormModalProps) {
  const title = mode === "create" ? "Add User" : "Edit User";
  const description =
    mode === "create"
      ? "Create a new user with the details below."
      : user
        ? `Update details for ${getUserFullName(user)}.`
        : "Update user details.";

  const formKey =
    mode === "create" ? "create-user" : `edit-user-${user?.id ?? "unknown"}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <UserForm
          key={formKey}
          mode={mode}
          defaultValues={
            mode === "edit" && user
              ? userToFormValues(user)
              : defaultUserFormValues
          }
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          submitLabel={mode === "create" ? "Create User" : "Save Changes"}
        />
      </DialogContent>
    </Dialog>
  );
}
