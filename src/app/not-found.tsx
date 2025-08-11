// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p>Sorry, we couldn’t find that page.</p>
      <Link
        href="/"
        className="inline-block rounded-md border px-4 py-2 hover:bg-gray-50"
      >
        Go home
      </Link>
    </main>
  );
}
