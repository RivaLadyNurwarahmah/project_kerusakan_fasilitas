"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Wrench, Users, Building, History, LogOut } from 'lucide-react';
import { logout } from '@/api/auth';
import { useRouter } from 'next/navigation';

const menuConfig = {
  admin: [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Laporan", href: "/admin/report", icon: FileText },
    { name: "Fasilitas", href: "/admin/fasilitas", icon: Building },
    { name: "Urgent Facilities", href: "/admin/urgent", icon: Wrench },
    { name: "Manajemen User", href: "/admin/users", icon: Users },
  ],
  teknisi: [
    { name: "Dashboard", href: "/teknisi/dashboard", icon: Home },
    { name: "Tugas Laporan", href: "/teknisi/report", icon: Wrench },
    { name: "Profil", href: "/profil", icon: Users },
  ],
  umum: [
    { name: "Dashboard", href: "/umum/dashboard", icon: Home },
    { name: "Buat Laporan", href: "/umum/report/create", icon: FileText },
    { name: "Riwayat Laporan", href: "/umum/riwayat", icon: History },
  ],
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState<keyof typeof menuConfig | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserRole(user.peran);
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menu = userRole ? menuConfig[userRole] : [];

  return (
    <aside className="w-64 min-h-screen bg-white text-gray-800 p-4 flex flex-col shadow-lg">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-cyan-600">FasilitasApp</h2>
      </div>
      <nav className="flex-grow">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-4 py-3 my-1 rounded-lg transition-colors ${pathname === item.href
              ? "bg-cyan-600 text-white font-semibold"
              : "hover:bg-cyan-50 text-gray-600"
              }`}
          >
            <item.icon className="mr-3" size={20} />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
        >
          <LogOut className="mr-3" size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
