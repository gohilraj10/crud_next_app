import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Flame,
  Star,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import { Badge } from "n@/components/ui/badge";
import { Button } from "n@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "n@/components/ui/card";
import { Separator } from "n@/components/ui/separator";
import { Recipe } from "n@/types/recipe";

interface RecipeDetailViewProps {
  recipe: Recipe;
  backHref: string;
}

function DetailStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border p-4">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
      <div>
        <p className="text-xs font-semibold tracking-wide text-secondary uppercase">
          {label}
        </p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

export default function RecipeDetailView({
  recipe,
  backHref,
}: RecipeDetailViewProps) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <section className="space-y-6">
      <Link href={backHref}>
        <Button variant="outline">
          <ArrowLeft className="h-4 w-4" />
          Back to Recipes
        </Button>
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border lg:aspect-auto lg:min-h-[420px]">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge variant="secondary">{recipe.cuisine}</Badge>
              <Badge variant="outline">{recipe.difficulty}</Badge>
              {recipe.mealType.map((type) => (
                <Badge key={type} variant="ghost">
                  {type}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl font-bold">{recipe.name}</h1>

            <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-primary text-primary" />
              {recipe.rating.toFixed(1)} · {recipe.reviewCount} reviews
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <DetailStat
              icon={Clock}
              label="Total Time"
              value={`${totalTime} minutes`}
            />
            <DetailStat
              icon={Users}
              label="Servings"
              value={String(recipe.servings)}
            />
            <DetailStat
              icon={Flame}
              label="Calories"
              value={`${recipe.caloriesPerServing} per serving`}
            />
            <DetailStat
              icon={UtensilsCrossed}
              label="Prep / Cook"
              value={`${recipe.prepTimeMinutes}m / ${recipe.cookTimeMinutes}m`}
            />
          </div>

          {recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="normal-case tracking-normal">
              Ingredients
            </CardTitle>
            <CardDescription>
              {recipe.ingredients.length} items needed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="flex items-start gap-2 text-sm leading-relaxed"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="normal-case tracking-normal">
              Instructions
            </CardTitle>
            <CardDescription>
              {recipe.instructions.length} steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-3 text-sm leading-relaxed">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <p className="text-xs text-muted-foreground">
        Recipe ID: {recipe.id} · User ID: {recipe.userId}
      </p>
    </section>
  );
}
