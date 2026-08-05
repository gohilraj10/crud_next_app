import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="text-8xl font-bold text-primary">404</h1>

        <h2 className="mt-4 text-3xl font-semibold text-foreground">
          Page Not Found
        </h2>

        <p className="mt-3 text-secondary">
          Sorry, the page you are looking for does not exist..
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:opacity-90"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
