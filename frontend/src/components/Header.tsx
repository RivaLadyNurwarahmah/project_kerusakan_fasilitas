'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, User, LogOut } from 'lucide-react';
import { logout } from '@/api/auth';
import Link from 'next/link';

interface UserData {
  nama_pengguna: string;
  peran: string;
}

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="w-full bg-white text-gray-800 shadow-sm px-6 py-3 flex items-center justify-end">
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg"
        >
          <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
            {user?.nama_pengguna.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold hidden md:block">{user?.nama_pengguna}</span>
          <ChevronDown size={20} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10">
            <div className="p-2">
              <p className="text-xs text-gray-500 px-2 pt-1 pb-2">Signed in as</p>
              <p className="font-semibold px-2 pb-2 border-b">{user?.nama_pengguna}</p>
            </div>
            <Link href="/profil" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <User className="mr-2" size={16} /> Profil
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-2" size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
