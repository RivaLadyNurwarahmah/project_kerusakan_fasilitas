'use client';

import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Cek localStorage user:', storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  

  return (
    <div className="min-h-screen bg-cyan-50 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-cyan-700 mb-4">Profil Pengguna</h1>

        {!user ? (
          <p className="text-gray-600">Tidak ada data pengguna.</p>
        ) : (
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <span className="font-semibold text-cyan-700">Nama Pengguna:</span>
              <p>{user.nama_pengguna}</p>
            </div>
            <div>
              <span className="font-semibold text-cyan-700">Email:</span>
              <p>{user.email}</p>
            </div>      
            <div>
              <span className="font-semibold text-cyan-700">Peran:</span>
              <p className="capitalize">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
