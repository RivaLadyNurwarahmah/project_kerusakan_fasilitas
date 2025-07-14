"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import Link from "next/link";

export default function UserDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-cyan-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-cyan-800">Dashboard Pengguna</h1>        
      </div>

      {/* Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-6 border border-cyan-100">
          <h2 className="text-lg font-semibold text-cyan-700 mb-1">
            Total Laporan Saya
          </h2>
          <p className="text-3xl font-bold text-cyan-900">12</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 border border-cyan-100">
          <h2 className="text-lg font-semibold text-cyan-700 mb-1">Selesai</h2>
          <p className="text-3xl font-bold text-green-600">8</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 border border-cyan-100">
          <h2 className="text-lg font-semibold text-cyan-700 mb-1">
            Sedang Diproses
          </h2>
          <p className="text-3xl font-bold text-yellow-500">4</p>
        </div>
      </div>

      {/* Navigasi Cepat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-cyan-100">
          <h3 className="text-lg font-semibold text-cyan-800 mb-2">
            Ajukan Laporan Baru
          </h3>
          <p className="text-sm text-gray-600">
            Laporkan kerusakan fasilitas kampus yang Anda temui.
          </p>         
          <Link
            href="/umum/report/create"
            className="block mt-4 w-full text-center bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md"
          >
            Laporan Baru
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 border border-cyan-100">
          <h3 className="text-lg font-semibold text-cyan-800 mb-2">
            Lihat Riwayat Laporan
          </h3>
          <p className="text-sm text-gray-600">
            Pantau perkembangan dari laporan-laporan Anda sebelumnya.
          </p>
          
          <Link
            href="/umum/riwayat"
            className="block mt-4 w-full text-center bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md"
          >
            Riwayat Laporan
          </Link>
        </div>
      </div>
    </div>
  );
}
