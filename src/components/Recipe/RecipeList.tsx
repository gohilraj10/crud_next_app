"use client";

import { useEffect, useMemo, useState } from "react";

import RecipeCard from "./RecipeCard";
import RecipePagination from "./RecipePagination";
import { Input } from "n@/components/ui/input";
import { Skeleton } from "n@/components/ui/skeleton";
import { useGetRecipes } from "n@/hooks/recipeHooks/useGetRecipes";
import { useRecipeListParams } from "n@/hooks/useRecipeListParams";
import { recipeListStateToApiParams } from "n@/utils/recipeListState";

interface RecipeSearchInputProps {
  initialQuery: string;
  onSearch: (query: string) => void;
}

function RecipeSearchInput({
  initialQuery,
  onSearch,
}: RecipeSearchInputProps) {
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
      placeholder="Search recipes..."
      value={searchInput}
      onChange={(event) => setSearchInput(event.target.value)}
      className="max-w-md border-border"
    />
  );
}

function RecipeGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-4">
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

function RecipeListContent() {
  const { listState, listQueryString, updateListState } =
    useRecipeListParams();

  const apiParams = useMemo(
    () => recipeListStateToApiParams(listState),
    [listState]
  );

  const { data, isLoading, isFetching, isError } = useGetRecipes(apiParams);
  const recipes = data?.recipes ?? [];
  const total = data?.total ?? 0;
  const showLoading = isLoading || isFetching;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Recipes</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse and discover recipes from around the world.
          </p>
        </div>
      </div>

      <RecipeSearchInput
        key={listState.q}
        initialQuery={listState.q}
        onSearch={(q) => updateListState({ q })}
      />

      {isError && (
        <p className="text-destructive">Failed to load recipes. Please try again.</p>
      )}

      {showLoading ? (
        <RecipeGridSkeleton />
      ) : recipes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            {listState.q
              ? `No recipes found for "${listState.q}".`
              : "No recipes available."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              listQueryString={listQueryString}
            />
          ))}
        </div>
      )}

      <RecipePagination
        totalRows={total}
        pageSize={listState.limit}
        currentPage={listState.page}
        onPageChange={(page) => updateListState({ page })}
        onPageSizeChange={(limit) => updateListState({ limit })}
      />
    </section>
  );
}

export default function RecipeList() {
  return <RecipeListContent />;
}
