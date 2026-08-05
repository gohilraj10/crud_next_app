"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  BLOOD_GROUPS,
  createUserFormSchema,
  defaultUserFormValues,
  GENDER_OPTIONS,
  ROLE_OPTIONS,
} from "./userFormSchema";
import { Button } from "n@/components/ui/button";
import { Input } from "n@/components/ui/input";
import { Label } from "n@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "n@/components/ui/select";
import { UserFormValues } from "n@/types/user";

interface UserFormProps {
  mode: "create" | "edit";
  defaultValues?: UserFormValues;
  onSubmit: (values: UserFormValues) => Promise<void>;
  isSubmitting: boolean;
  submitLabel: string;
  formId?: string;
}

export default function UserForm({
  mode,
  defaultValues = defaultUserFormValues,
  onSubmit,
  isSubmitting,
  submitLabel,
  formId = "user-form",
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: yupResolver(createUserFormSchema(mode === "edit")),
    defaultValues,
  });

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="maidenName">Maiden Name</Label>
          <Input id="maidenName" {...register("maidenName")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            {...register("username")}
            aria-invalid={!!errors.username}
          />
          {errors.username && (
            <p className="text-sm text-destructive">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            {...register("phone")}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">
            Password{mode === "edit" ? " (leave blank to keep current)" : ""}
          </Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            {...register("age", { valueAsNumber: true })}
            aria-invalid={!!errors.age}
          />
          {errors.age && (
            <p className="text-sm text-destructive">{errors.age.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  if (value) {
                    field.onChange(value);
                  }
                }}
              >
                <SelectTrigger id="gender" className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {GENDER_OPTIONS.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && (
            <p className="text-sm text-destructive">{errors.gender.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate">Birth Date</Label>
          <Input
            id="birthDate"
            placeholder="YYYY-M-D"
            {...register("birthDate")}
            aria-invalid={!!errors.birthDate}
          />
          {errors.birthDate && (
            <p className="text-sm text-destructive">
              {errors.birthDate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bloodGroup">Blood Group</Label>
          <Controller
            name="bloodGroup"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  if (value) {
                    field.onChange(value);
                  }
                }}
              >
                <SelectTrigger id="bloodGroup" className="w-full">
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {BLOOD_GROUPS.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.bloodGroup && (
            <p className="text-sm text-destructive">
              {errors.bloodGroup.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            step="0.01"
            {...register("height", { valueAsNumber: true })}
            aria-invalid={!!errors.height}
          />
          {errors.height && (
            <p className="text-sm text-destructive">{errors.height.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            step="0.01"
            {...register("weight", { valueAsNumber: true })}
            aria-invalid={!!errors.weight}
          />
          {errors.weight && (
            <p className="text-sm text-destructive">{errors.weight.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="eyeColor">Eye Color</Label>
          <Input
            id="eyeColor"
            {...register("eyeColor")}
            aria-invalid={!!errors.eyeColor}
          />
          {errors.eyeColor && (
            <p className="text-sm text-destructive">
              {errors.eyeColor.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  if (value) {
                    field.onChange(value);
                  }
                }}
              >
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_OPTIONS.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && (
            <p className="text-sm text-destructive">{errors.role.message}</p>
          )}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="university">University</Label>
          <Input
            id="university"
            {...register("university")}
            aria-invalid={!!errors.university}
          />
          {errors.university && (
            <p className="text-sm text-destructive">
              {errors.university.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
