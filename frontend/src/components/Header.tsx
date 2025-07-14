'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-cyan-600 text-white shadow-md px-6 py-4 flex items-center justify-between rounded-b-xl">
      <h1 className="text-lg sm:text-xl font-semibold tracking-wide">
        Sistem Pelaporan Fasilitas Kampus
      </h1>

      <nav className="space-x-4 text-sm sm:text-base">      
          <Link
            href="/profil"
            className="hover:underline hover:text-white-800 text-white font-semibold px-4 py-2 rounded-md"
          >
            Profil
          </Link>

          <Link
            href="/"
            className="hover:underline hover:text-white-800 text-white font-semibold px-4 py-2 rounded-md"
          >
            Logout
          </Link>      
      </nav>
    </header>
  );
}
