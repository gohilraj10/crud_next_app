import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "n@/components/ui/card";
import { Badge } from "n@/components/ui/badge";
import { Recipe } from "n@/types/recipe";
import { withRecipeListQuery } from "n@/utils/recipeListState";

interface RecipeCardProps {
  recipe: Recipe;
  listQueryString: string;
}

export default function RecipeCard({
  recipe,
  listQueryString,
}: RecipeCardProps) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <Link
      href={withRecipeListQuery(`/recipes/${recipe.id}`, listQueryString)}
      className="group block h-full"
    >
      <Card className="h-full overflow-hidden rounded-xl border-border/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardHeader>
          <CardTitle className="line-clamp-2 normal-case tracking-normal">
            {recipe.name}
          </CardTitle>
          <CardDescription className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            {recipe.rating.toFixed(1)} ({recipe.reviewCount} reviews)
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{recipe.cuisine}</Badge>
            <Badge variant="outline">{recipe.difficulty}</Badge>
            {recipe.mealType.slice(0, 1).map((type) => (
              <Badge key={type} variant="ghost">
                {type}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {totalTime} min
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {recipe.servings} servings
            </span>
            <span className="flex items-center gap-1">
              <Flame className="h-3.5 w-3.5" />
              {recipe.caloriesPerServing} cal
            </span>
          </div>
        </CardContent>

        <CardFooter className="text-xs text-muted-foreground">
          Prep {recipe.prepTimeMinutes}m · Cook {recipe.cookTimeMinutes}m
        </CardFooter>
      </Card>
    </Link>
  );
}
