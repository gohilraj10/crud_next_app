import { GetRecipesParams } from "n@/types/recipe";

export const recipeKeys = {
  all: ["recipes"] as const,

  lists: () => [...recipeKeys.all, "list"] as const,

  list: (params: GetRecipesParams) => [...recipeKeys.lists(), params] as const,
};
