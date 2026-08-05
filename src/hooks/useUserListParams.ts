"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { UserListState } from "n@/types/user";
import {
  buildUsersListPath,
  parseUserListState,
} from "n@/utils/userListState";

export const useUserListParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const listState = useMemo(
    () => parseUserListState(searchParams),
    [searchParams]
  );

  const listQueryString = searchParams.toString();

  const updateListState = useCallback(
    (updates: Partial<UserListState>) => {
      const nextState: UserListState = {
        ...listState,
        ...updates,
      };

      if (
        updates.q !== undefined ||
        updates.limit !== undefined ||
        updates.sortBy !== undefined ||
        updates.order !== undefined
      ) {
        nextState.page = 1;
      }

      router.push(buildUsersListPath(nextState));
    },
    [listState, router]
  );

  return {
    listState,
    listQueryString,
    updateListState,
  };
};
