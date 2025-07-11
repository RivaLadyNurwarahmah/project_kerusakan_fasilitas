'use client'

import Link from 'next/link'
import { Button } from '@/components/Button'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cyan-50">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-700 mb-4">
          Sistem Pelaporan Kerusakan Fasilitas Kampus
        </h1>
        <p className="text-lg text-cyan-900 max-w-2xl mb-6">
          Mudahkan pelaporan kerusakan fasilitas kampus dengan sistem digital yang cepat, efisien, dan transparan.
        </p>
        <div className="flex gap-4">
          <Link href="/login">
            <Button className="bg-cyan-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-md">
              Masuk
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-cyan-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-md">
              Daftar
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-cyan-700 text-center mb-12">
            Fitur Unggulan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl shadow-md bg-cyan-50">
              <h3 className="text-xl font-semibold text-cyan-800 mb-2">Laporan Cepat</h3>
              <p className="text-sm text-blue-900">Laporkan kerusakan fasilitas kampus hanya dalam beberapa klik.</p>
            </div>
            <div className="p-6 rounded-xl shadow-md bg-cyan-50">
              <h3 className="text-xl font-semibold text-cyan-800 mb-2">Notifikasi Status</h3>
              <p className="text-sm text-blue-900">Dapatkan pembaruan langsung tentang status laporan Anda.</p>
            </div>
            <div className="p-6 rounded-xl shadow-md bg-cyan-50">
              <h3 className="text-xl font-semibold text-cyan-800 mb-2">Akses Mudah</h3>
              <p className="text-sm text-blue-900">Akses sistem kapan saja dan di mana saja dengan perangkat Anda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cyan-700 text-white text-center py-6">
        <p className="text-sm">&copy; 2025 Sistem Pelaporan Fasilitas Kampus. All rights reserved.</p>
      </footer>
    </div>
  )
}
