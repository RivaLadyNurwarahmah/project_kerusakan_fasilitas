'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, MessageSquare } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-600">FasilitasApp</h1>
          <nav className="space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-cyan-600">Login</Link>
            <Link href="/register" className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700">
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 text-center bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Jaga Fasilitas Kampus, Laporkan Kerusakan.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Sistem pelaporan kerusakan fasilitas yang cepat, mudah, dan transparan. Bantu kami menciptakan lingkungan belajar yang lebih baik.
          </p>
          <Link href="/register" className="bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-cyan-700 inline-flex items-center">
            Lapor Sekarang <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">Kenapa Memilih Kami?</h3>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="feature-card">
              <Zap size={40} className="text-cyan-600 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Cepat & Efisien</h4>
              <p>Laporkan kerusakan dalam hitungan detik melalui antarmuka yang intuitif.</p>
            </div>
            <div className="feature-card">
              <ShieldCheck size={40} className="text-cyan-600 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Transparan</h4>
              <p>Pantau status laporan Anda secara real-time dari awal hingga selesai.</p>
            </div>
            <div className="feature-card">
              <MessageSquare size={40} className="text-cyan-600 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Komunikasi Langsung</h4>
              <p>Dapatkan feedback dan catatan langsung dari teknisi yang menangani.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">Cara Kerja</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-cyan-200 mb-2">1</div>
              <h4 className="text-xl font-semibold mb-2">Laporkan</h4>
              <p>Ambil foto, isi deskripsi singkat, dan kirim laporan Anda.</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-200 mb-2">2</div>
              <h4 className="text-xl font-semibold mb-2">Proses</h4>
              <p>Laporan diverifikasi dan ditugaskan ke teknisi yang tepat.</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-200 mb-2">3</div>
              <h4 className="text-xl font-semibold mb-2">Selesai</h4>
              <p>Anda akan diberi notifikasi saat kerusakan telah diperbaiki.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 FasilitasApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
