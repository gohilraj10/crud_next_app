import {
  GetRecipesParams,
  RecipeListState,
} from "n@/types/recipe";

export const DEFAULT_RECIPE_LIST_STATE: RecipeListState = {
  page: 1,
  limit: 12,
  q: "",
};

export const parseRecipeListState = (
  searchParams: URLSearchParams
): RecipeListState => {
  const page = Math.max(1, Number(searchParams.get("page") ?? 1) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit") ?? 12) || 12);
  const q = searchParams.get("q") ?? "";

  return { page, limit, q };
};

export const buildRecipeListQueryString = (
  state: RecipeListState
): string => {
  const params = new URLSearchParams();

  if (state.page > 1) {
    params.set("page", String(state.page));
  }

  if (state.limit !== DEFAULT_RECIPE_LIST_STATE.limit) {
    params.set("limit", String(state.limit));
  }

  if (state.q) {
    params.set("q", state.q);
  }

  return params.toString();
};

export const buildRecipesListPath = (state: RecipeListState): string => {
  const query = buildRecipeListQueryString(state);
  return query ? `/recipes?${query}` : "/recipes";
};

export const recipeListStateToApiParams = (
  state: RecipeListState
): GetRecipesParams => {
  const params: GetRecipesParams = {
    limit: state.limit,
    skip: (state.page - 1) * state.limit,
  };

  if (state.q.trim()) {
    params.q = state.q.trim();
  }

  return params;
};

export const withRecipeListQuery = (
  path: string,
  listQueryString: string
): string => (listQueryString ? `${path}?${listQueryString}` : path);
