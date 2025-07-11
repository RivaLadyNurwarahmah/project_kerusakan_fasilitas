'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';

export default function UserDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-cyan-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-cyan-800">Dashboard Pengguna</h1>
        <Button
          onClick={() => router.push('/login')}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl"
        >
          Keluar
        </Button>
      </div>

      {/* Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-6 border border-cyan-100">
          <h2 className="text-lg font-semibold text-cyan-700 mb-1">Total Laporan Saya</h2>
          <p className="text-3xl font-bold text-cyan-900">12</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 border border-cyan-100">
          <h2 className="text-lg font-semibold text-cyan-700 mb-1">Selesai</h2>
          <p className="text-3xl font-bold text-green-600">8</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 border border-cyan-100">
          <h2 className="text-lg font-semibold text-cyan-700 mb-1">Sedang Diproses</h2>
          <p className="text-3xl font-bold text-yellow-500">4</p>
        </div>
      </div>

      {/* Navigasi Cepat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-cyan-100">
          <h3 className="text-lg font-semibold text-cyan-800 mb-2">Ajukan Laporan Baru</h3>
          <p className="text-sm text-gray-600">Laporkan kerusakan fasilitas kampus yang Anda temui.</p>
          <Button
            onClick={() => router.push('/report')}
            className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            Laporkan Sekarang
          </Button>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 border border-cyan-100">
          <h3 className="text-lg font-semibold text-cyan-800 mb-2">Lihat Riwayat Laporan</h3>
          <p className="text-sm text-gray-600">Pantau perkembangan dari laporan-laporan Anda sebelumnya.</p>
          <Button
            onClick={() => router.push('/history')}
            className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            Riwayat Laporan
          </Button>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 border border-cyan-100">
          <h3 className="text-lg font-semibold text-cyan-800 mb-2">Profil Saya</h3>
          <p className="text-sm text-gray-600">Edit informasi akun dan ubah kata sandi Anda.</p>
          <Button
            onClick={() => router.push('/profile')}
            className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            Edit Profil
          </Button>
        </div>
      </div>
    </div>
  );
}
