'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-white to-indigo-200">
      <div className="max-w-md w-full bg-white/10 drop-shadow rounded-xl shadow-lg p-8 text-center space-y-6">
        <div className="flex justify-center">
          <AlertTriangle className="text-red-500 w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Page Not Found</h1>
        <p className="text-gray-600">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
