import { Suspense } from "react";

import RecipeList from "n@/components/Recipe/RecipeList";

export default function RecipesPage() {
  return (
    <Suspense
      fallback={<p className="text-muted-foreground">Loading recipes...</p>}
    >
      <RecipeList />
    </Suspense>
  );
}
