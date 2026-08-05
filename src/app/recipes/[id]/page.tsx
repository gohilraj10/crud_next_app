import { notFound } from "next/navigation";

import { getRecipeById } from "n@/api/recipeServer";
import RecipeDetailView from "n@/components/Recipe/RecipeDetailView";
import {
  buildRecipesListPath,
  parseRecipeListState,
} from "n@/utils/recipeListState";

interface RecipeDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function RecipeDetailPage({
  params,
  searchParams,
}: RecipeDetailPageProps) {
  const { id } = await params;
  const recipeId = Number(id);

  if (!Number.isFinite(recipeId) || recipeId <= 0) {
    notFound();
  }

  const recipe = await getRecipeById(recipeId);

  if (!recipe) {
    notFound();
  }

  const resolvedSearchParams = await searchParams;
  const urlSearchParams = new URLSearchParams();

  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      urlSearchParams.set(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((entry) => urlSearchParams.append(key, entry));
    }
  });

  const backHref = buildRecipesListPath(parseRecipeListState(urlSearchParams));

  return <RecipeDetailView recipe={recipe} backHref={backHref} />;
}
