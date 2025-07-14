'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id_user: number;
  nama_pengguna: string;
  email: string;
  no_telepon: string;
  alamat: string;
  role: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-cyan-700 mb-6 text-center">
          Profil Pengguna
        </h1>

        {!user ? (
          <p className="text-gray-600 text-center">Tidak ada data pengguna.</p>
        ) : (
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <span className="block text-cyan-700 font-semibold">Nama Pengguna:</span>
              <p>{user.nama_pengguna}</p>
            </div>
            <div>
              <span className="block text-cyan-700 font-semibold">Email:</span>
              <p>{user.email}</p>
            </div>                        
            <div>
              <span className="block text-cyan-700 font-semibold">Peran:</span>
              <p className="capitalize">{user.role}</p>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => {
              if (user?.role === 'admin') router.push('/admin/dashboard');
              else if (user?.role === 'teknisi') router.push('/teknisi/dashboard');
              else router.push('/umum/dashboard');
            }}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
