import { useQuery } from "@tanstack/react-query";
import axiosInstance from "n@/api/axios";
import { recipeKeys } from "n@/queryKeyFactory/recipeKeys";
import { RECIPE_ROUTES } from "n@/routes/recipeRoute";
import { GetRecipesParams, RecipesResponse } from "n@/types/recipe";

export const getRecipes = async (
  params: GetRecipesParams
): Promise<RecipesResponse> => {
  const endpoint = params.q
    ? RECIPE_ROUTES.RECIPE_SEARCH
    : RECIPE_ROUTES.RECIPES;

  const { data } = await axiosInstance.get<RecipesResponse>(endpoint, {
    params,
  });

  return data;
};

export const useGetRecipes = (params: GetRecipesParams) => {
  return useQuery({
    queryKey: recipeKeys.list(params),
    queryFn: () => getRecipes(params),
  });
};
