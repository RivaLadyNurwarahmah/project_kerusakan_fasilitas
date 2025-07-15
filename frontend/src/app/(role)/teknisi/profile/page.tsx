'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api/auth';

interface User {
  id_user: number;
  nama_pengguna: string;
  email: string;
  peran: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    } else {
    //   router.push('/teknisi/login');
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/teknisi/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cyan-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-cyan-100">
          <h1 className="text-2xl font-bold text-cyan-800 mb-6">Profil Teknisi</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Nama Lengkap
              </label>
              <div className="mt-1 text-lg">{user.nama_pengguna}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <div className="mt-1 text-lg">{user.email}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Peran
              </label>
              <div className="mt-1">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-cyan-100 text-cyan-800">
                  {user.peran}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
