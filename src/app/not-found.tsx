import Link from 'next/link';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center gap-6 min-h-screen text-center px-4">
    <h1 className="text-3xl md:text-4xl font-bold">Something went wrong</h1>
    <p className="text-base md:text-lg opacity-60 max-w-sm">
      This page doesn&apos;t exist or is not available right now.
    </p>
    <Link
      href="/"
      className="px-6 py-3 rounded-full font-semibold text-white bg-indigo-500 hover:bg-indigo-600 transition-colors"
    >
      Go Home
    </Link>
  </div>
);

export default NotFound;
