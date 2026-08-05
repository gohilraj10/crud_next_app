export const RECIPE_ROUTES = {
  RECIPES: "/recipes",
  RECIPE_SEARCH: "/recipes/search",
  recipeById: (id: number) => `/recipes/${id}`,
} as const;
