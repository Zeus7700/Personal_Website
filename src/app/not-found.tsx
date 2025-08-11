// app/not-found.tsx
'use client';

import Link from "next/link";
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('404 - Page not found');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      <main className="mx-auto max-w-2xl p-8 space-y-4 text-center">
        <h1 className="text-2xl font-semibold">404 - Page Not Found</h1>
        <p>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
        <Link
          href="/"
          className="inline-block rounded-md border px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Return Home
        </Link>
      </main>
    </div>
  );
}

export const dynamic = 'force-static';
