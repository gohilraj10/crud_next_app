"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ProductListState } from "n@/types/product";
import {
  buildProductsListPath,
  parseProductListState,
} from "n@/utils/productListState";

export const useProductListParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const listState = useMemo(
    () => parseProductListState(searchParams),
    [searchParams]
  );

  const listQueryString = searchParams.toString();

  const updateListState = useCallback(
    (updates: Partial<ProductListState>) => {
      const nextState: ProductListState = {
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

      router.push(buildProductsListPath(nextState));
    },
    [listState, router]
  );

  return {
    listState,
    listQueryString,
    updateListState,
  };
};
