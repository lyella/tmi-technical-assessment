import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center animate-fade-in">
        <h1 className="text-9xl font-light text-blue-900 mb-4">404</h1>
        <h2 className="text-3xl font-light text-blue-900 mb-4">Page Not Found</h2>
        <p className="text-lg text-blue-800 mb-8 font-light max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been removed or the URL might be incorrect.
        </p>
        <Link
          href="/"
          className="inline-block bg-gray-900 text-white font-medium px-8 py-3 rounded-sm hover:bg-gray-800 transition-all duration-300 hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
