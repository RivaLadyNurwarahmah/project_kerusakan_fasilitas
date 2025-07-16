"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Shield } from 'lucide-react';

interface UserData {
  nama_pengguna: string;
  email: string;
  peran: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!user) {
    return <div className="p-6">Memuat profil...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-24 h-24 bg-cyan-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
            {user.nama_pengguna.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{user.nama_pengguna}</h1>
          <p className="text-gray-500 capitalize">{user.peran}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <Mail className="text-gray-400 mr-4" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center">
            <Shield className="text-gray-400 mr-4" />
            <span className="capitalize">{user.peran}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
