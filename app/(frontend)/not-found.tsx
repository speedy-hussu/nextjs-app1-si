 "use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-50 px-4">
      <div className="max-w-md text-center space-y-6">
        <p className="text-sm font-semibold tracking-widest text-sky-400 uppercase">
          404 • Page not found
        </p>
        <h1 className="text-3xl md:text-4xl font-bold">
          Oops, we couldn&apos;t find that page.
        </h1>
        <p className="text-slate-400">
          The link may be broken or the page may have been moved. Check the URL,
          or go back to the homepage to continue browsing.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-sky-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-sky-400 transition-colors"
          >
            Go to homepage
          </Link>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center justify-center rounded-md border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-900 transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}


