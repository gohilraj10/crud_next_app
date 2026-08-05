import Link from "next/link";
import { ArrowRight, CookingPot, Package, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "n@/components/ui/card";
import { Button } from "n@/components/ui/button";

const modules = [
  {
    title: "Products",
    description: "Browse, create, edit, and delete products with full CRUD.",
    href: "/products",
    icon: Package,
    accent: "text-primary",
  },
  {
    title: "Users",
    description: "Manage users in a single page with modals and detail drawer.",
    href: "/users",
    icon: Users,
    accent: "text-accent",
  },
  {
    title: "Recipes",
    description: "Explore recipes in a card layout with search and pagination.",
    href: "/recipes",
    icon: CookingPot,
    accent: "text-secondary",
  },
];

export default function Home() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm md:p-10">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">
          Welcome back
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Manage products, users, and recipes from one place. Pick a module
          below to get started.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <Card
            key={module.title}
            className="group transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardHeader>
              <div
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${module.accent}`}
              >
                <module.icon className="h-5 w-5" />
              </div>
              <CardTitle className="normal-case tracking-normal">
                {module.title}
              </CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={module.href}>
                <Button variant="outline" className="w-full">
                  Open {module.title}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
