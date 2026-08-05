"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { RecipeListState } from "n@/types/recipe";
import {
  buildRecipesListPath,
  parseRecipeListState,
} from "n@/utils/recipeListState";

export const useRecipeListParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const listState = useMemo(
    () => parseRecipeListState(searchParams),
    [searchParams]
  );

  const listQueryString = searchParams.toString();

  const updateListState = useCallback(
    (updates: Partial<RecipeListState>) => {
      const nextState: RecipeListState = {
        ...listState,
        ...updates,
      };

      if (updates.q !== undefined || updates.limit !== undefined) {
        nextState.page = 1;
      }

      router.push(buildRecipesListPath(nextState));
    },
    [listState, router]
  );

  return {
    listState,
    listQueryString,
    updateListState,
  };
};
