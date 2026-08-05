"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "n@/components/ui/sheet";
import { Badge } from "n@/components/ui/badge";
import { Button } from "n@/components/ui/button";
import { Separator } from "n@/components/ui/separator";
import { Skeleton } from "n@/components/ui/skeleton";
import { useGetUserById } from "n@/hooks/userHooks/useGetUserById";
import { getUserFullName, User, UserAddress } from "n@/types/user";

interface UserDetailDrawerProps {
  userId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (user: User) => void;
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-secondary uppercase">
        {label}
      </p>
      <p className="text-sm break-words">{value}</p>
    </div>
  );
}

function formatAddress(address: UserAddress) {
  return `${address.address}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}`;
}

export default function UserDetailDrawer({
  userId,
  open,
  onOpenChange,
  onEdit,
}: UserDetailDrawerProps) {
  const { data: user, isLoading, isError } = useGetUserById(
    open ? userId : null
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>User Details</SheetTitle>
          <SheetDescription>
            View complete profile information.
          </SheetDescription>
        </SheetHeader>

        {isLoading && (
          <div className="space-y-4 px-8 pb-8">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        )}

        {isError && (
          <p className="px-8 pb-8 text-destructive">Failed to load user details.</p>
        )}

        {!isLoading && !isError && user && (
          <div className="space-y-6 px-8 pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={user.image}
                  alt={getUserFullName(user)}
                  width={96}
                  height={96}
                  className="rounded-full border border-border object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">
                    {getUserFullName(user)}
                  </h2>
                  <p className="text-sm text-muted-foreground">@{user.username}</p>
                  <Badge variant="secondary" className="mt-2 capitalize">
                    {user.role}
                  </Badge>
                </div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  onOpenChange(false);
                  onEdit(user);
                }}
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </div>

            <Separator />

            <section className="space-y-3">
              <h3 className="text-sm font-semibold tracking-wide text-secondary uppercase">
                Personal Info
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <DetailItem label="Email" value={user.email} />
                <DetailItem label="Phone" value={user.phone} />
                <DetailItem label="Age" value={String(user.age)} />
                <DetailItem
                  label="Gender"
                  value={user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                />
                <DetailItem label="Birth Date" value={user.birthDate} />
                <DetailItem
                  label="Maiden Name"
                  value={user.maidenName ?? "-"}
                />
                <DetailItem label="Blood Group" value={user.bloodGroup} />
                <DetailItem label="Eye Color" value={user.eyeColor} />
                <DetailItem
                  label="Hair"
                  value={`${user.hair.color} (${user.hair.type})`}
                />
                <DetailItem label="Height" value={`${user.height} cm`} />
                <DetailItem label="Weight" value={`${user.weight} kg`} />
                <DetailItem label="University" value={user.university} />
              </div>
            </section>

            <Separator />

            <section className="space-y-3">
              <h3 className="text-sm font-semibold tracking-wide text-secondary uppercase">
                Address
              </h3>
              <DetailItem label="Home" value={formatAddress(user.address)} />
            </section>

            <Separator />

            <section className="space-y-3">
              <h3 className="text-sm font-semibold tracking-wide text-secondary uppercase">
                Company
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <DetailItem label="Company" value={user.company.name} />
                <DetailItem label="Title" value={user.company.title} />
                <DetailItem
                  label="Department"
                  value={user.company.department}
                />
                <DetailItem
                  label="Office"
                  value={formatAddress(user.company.address)}
                />
              </div>
            </section>

            <Separator />

            <section className="space-y-3">
              <h3 className="text-sm font-semibold tracking-wide text-secondary uppercase">
                Additional
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <DetailItem label="EIN" value={user.ein} />
                <DetailItem label="SSN" value={user.ssn} />
                <DetailItem label="IP Address" value={user.ip} />
                <DetailItem label="MAC Address" value={user.macAddress} />
                <DetailItem label="Bank IBAN" value={user.bank.iban} />
                <DetailItem label="Card Type" value={user.bank.cardType} />
                <DetailItem label="Crypto Coin" value={user.crypto.coin} />
                <DetailItem label="Wallet" value={user.crypto.wallet} />
              </div>
            </section>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
