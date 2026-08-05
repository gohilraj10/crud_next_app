"use client";

import Image from "next/image";
import { ColDef } from "ag-grid-community";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { getUserFullName, User } from "n@/types/user";
import { Badge } from "n@/components/ui/badge";

interface UserColumnOptions {
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const getUserColumns = ({
  onView,
  onEdit,
  onDelete,
}: UserColumnOptions): ColDef<User>[] => [
  {
    headerName: "Avatar",
    field: "image",
    width: 90,
    sortable: false,
    cellRenderer: ({ value }: { value: string }) => (
      <Image
        src={value}
        alt="user avatar"
        width={40}
        height={40}
        className="rounded-full object-cover"
      />
    ),
  },
  {
    headerName: "First Name",
    field: "firstName",
    flex: 1,
  },
  {
    headerName: "Last Name",
    field: "lastName",
    flex: 1,
  },
  {
    headerName: "Email",
    field: "email",
    flex: 2,
  },
  {
    headerName: "Phone",
    field: "phone",
    flex: 1,
  },
  {
    headerName: "Age",
    field: "age",
    width: 90,
  },
  {
    headerName: "Gender",
    field: "gender",
    width: 110,
    valueFormatter: ({ value }) =>
      value ? String(value).charAt(0).toUpperCase() + String(value).slice(1) : "-",
  },
  {
    headerName: "Role",
    field: "role",
    width: 120,
    cellRenderer: ({ value }: { value: string }) => (
      <Badge variant="secondary" className="capitalize">
        {value}
      </Badge>
    ),
  },
  {
    headerName: "Actions",
    sortable: false,
    width: 140,
    cellRenderer: ({ data }: { data: User }) => (
      <div className="flex h-full items-center gap-2">
        <button
          type="button"
          aria-label={`View ${getUserFullName(data)}`}
          onClick={() => onView(data)}
        >
          <Eye className="h-4 w-4 text-primary" />
        </button>

        <button
          type="button"
          aria-label={`Edit ${getUserFullName(data)}`}
          onClick={() => onEdit(data)}
        >
          <Pencil className="h-4 w-4 text-secondary" />
        </button>

        <button
          type="button"
          aria-label={`Delete ${getUserFullName(data)}`}
          onClick={() => onDelete(data)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </button>
      </div>
    ),
  },
];
