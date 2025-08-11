import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link 
        href="/" 
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}

export const dynamic = 'force-static';
