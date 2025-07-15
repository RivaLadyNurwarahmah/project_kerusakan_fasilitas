// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Laporan", href: "/report" },
    { name: "Fasilitas", href: "/fasilitas" },
    { name: "Riwayat", href: "/riwayat" }
  ];

  return (
    <aside className="w-64 min-h-screen bg-white-800 text-black p-4">
      <h2 className="text-black text-xl font-bold mb-6">Menu</h2>
      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded hover:bg-white-700 transition ${
              pathname === item.href ? "bg-white-700 font-semibold" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
