"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { getUserColumns } from "./userColumn";
import DeleteUserDialog from "./DeleteUserDialog";
import UserDetailDrawer from "./UserDetailDrawer";
import UserFormModal from "./UserFormModal";
import {
  formValuesToCreatePayload,
  formValuesToUpdatePayload,
} from "./userFormSchema";
import { Button } from "n@/components/ui/button";
import { Input } from "n@/components/ui/input";
import DataTable from "n@/components/common/table/Table";
import { useCreateUser } from "n@/hooks/userHooks/useCreateUser";
import { useDeleteUser } from "n@/hooks/userHooks/useDeleteUser";
import { useGetUsers } from "n@/hooks/userHooks/useGetUsers";
import { useUpdateUser } from "n@/hooks/userHooks/useUpdateUser";
import { useUserListParams } from "n@/hooks/useUserListParams";
import {
  getUserFullName,
  User,
  UserFormValues,
  UserSortField,
} from "n@/types/user";
import { userListStateToApiParams } from "n@/utils/userListState";

type FormModalState =
  | { mode: "create" }
  | { mode: "edit"; user: User }
  | null;

interface UserSearchInputProps {
  initialQuery: string;
  onSearch: (query: string) => void;
}

function UserSearchInput({ initialQuery, onSearch }: UserSearchInputProps) {
  const [searchInput, setSearchInput] = useState(initialQuery);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (searchInput !== initialQuery) {
        onSearch(searchInput);
      }
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput, initialQuery, onSearch]);

  return (
    <Input
      type="search"
      placeholder="Search users..."
      value={searchInput}
      onChange={(event) => setSearchInput(event.target.value)}
      className="max-w-md border-border"
    />
  );
}

function UserListContent() {
  const { listState, updateListState } = useUserListParams();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [formModal, setFormModal] = useState<FormModalState>(null);
  const [viewUserId, setViewUserId] = useState<number | null>(null);

  const apiParams = useMemo(
    () => userListStateToApiParams(listState),
    [listState]
  );

  const { data, isLoading, isFetching } = useGetUsers(apiParams);
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const columnDefs = useMemo(
    () =>
      getUserColumns({
        onView: (user) => setViewUserId(user.id),
        onEdit: (user) => setFormModal({ mode: "edit", user }),
        onDelete: setUserToDelete,
      }),
    []
  );

  const handleFormSubmit = async (values: UserFormValues) => {
    try {
      if (formModal?.mode === "edit") {
        await updateUserMutation.mutateAsync({
          id: formModal.user.id,
          payload: formValuesToUpdatePayload(values),
        });
        toast.success(`"${getUserFullName(formModal.user)}" updated successfully`);
      } else {
        await createUserMutation.mutateAsync(formValuesToCreatePayload(values));
        toast.success("User created successfully");
      }

      setFormModal(null);
    } catch {
      toast.error(
        formModal?.mode === "edit"
          ? "Failed to update user"
          : "Failed to create user"
      );
    }
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) {
      return;
    }

    try {
      await deleteUserMutation.mutateAsync(userToDelete.id);
      toast.success(`"${getUserFullName(userToDelete)}" deleted successfully`);
      setUserToDelete(null);
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const isFormSubmitting =
    createUserMutation.isPending || updateUserMutation.isPending;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Users</h1>

        <Button onClick={() => setFormModal({ mode: "create" })}>
          Add User
        </Button>
      </div>

      <UserSearchInput
        key={listState.q}
        initialQuery={listState.q}
        onSearch={(q) => updateListState({ q })}
      />

      <DataTable<User, UserSortField>
        rowData={data?.users ?? []}
        columnDefs={columnDefs}
        loading={isLoading || isFetching}
        totalRows={data?.total ?? 0}
        pageSize={listState.limit}
        currentPage={listState.page}
        sortBy={listState.sortBy}
        sortOrder={listState.order}
        onPageChange={(page) => updateListState({ page })}
        onPageSizeChange={(limit) => updateListState({ limit })}
        onSortChanged={(sortBy, order) => {
          if (!sortBy || !order) {
            if (
              listState.sortBy !== "firstName" ||
              listState.order !== "asc"
            ) {
              updateListState({ sortBy: "firstName", order: "asc" });
            }
            return;
          }

          if (sortBy !== listState.sortBy || order !== listState.order) {
            updateListState({
              sortBy,
              order,
            });
          }
        }}
      />

      <UserFormModal
        mode={formModal?.mode ?? "create"}
        user={formModal?.mode === "edit" ? formModal.user : null}
        open={formModal !== null}
        onOpenChange={(open) => {
          if (!open) {
            setFormModal(null);
          }
        }}
        onSubmit={handleFormSubmit}
        isSubmitting={isFormSubmitting}
      />

      <UserDetailDrawer
        userId={viewUserId}
        open={viewUserId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setViewUserId(null);
          }
        }}
        onEdit={(user) => setFormModal({ mode: "edit", user })}
      />

      <DeleteUserDialog
        user={userToDelete}
        open={userToDelete !== null}
        onOpenChange={(open) => {
          if (!open) {
            setUserToDelete(null);
          }
        }}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteUserMutation.isPending}
      />
    </section>
  );
}

export default function UserList() {
  return <UserListContent />;
}
