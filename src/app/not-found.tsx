import Link from "next/link";

import { Button } from "n@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center">
      <div className="max-w-md rounded-2xl border border-border/60 bg-card p-10 text-center shadow-sm">
        <p className="text-7xl font-bold text-primary">404</p>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          Page Not Found
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link href="/" className="mt-8 inline-block">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    </section>
  );
}
