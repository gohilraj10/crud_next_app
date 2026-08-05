import { Recipe } from "n@/types/recipe";

const API_BASE_URL = "https://dummyjson.com";

export async function getRecipeById(id: number): Promise<Recipe | null> {
  if (!Number.isFinite(id) || id <= 0) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as Recipe;
  } catch {
    return null;
  }
}
