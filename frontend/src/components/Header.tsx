'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-cyan-600 text-white shadow-md px-6 py-4 flex items-center justify-between rounded-b-xl">
      <h1 className="text-lg sm:text-xl font-semibold tracking-wide">
        Sistem Pelaporan Fasilitas Kampus
      </h1>

      <nav className="space-x-4 text-sm sm:text-base">
        <Link href="/" className="hover:underline hover:text-cyan-200 transition">
          Beranda
        </Link>
        <Link href="/dashboard/report" className="hover:underline hover:text-cyan-200 transition">
          Laporan
        </Link>
        <Link href="/dashboard/history" className="hover:underline hover:text-cyan-200 transition">
          Riwayat
        </Link>
      </nav>
    </header>
  );
}
