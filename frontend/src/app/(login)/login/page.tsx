"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from 'js-cookie';
import { login } from "@/api/auth";
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await login(email, password);
      if (data.success) {
        Cookies.set('token', data.data.token, { expires: 1 });
        Cookies.set('userRole', data.data.user.peran, { expires: 1 });
        localStorage.setItem("user", JSON.stringify(data.data.user));

        const userRole = data.data.user.peran;
        router.push(`/${userRole}/dashboard`);
      } else {
        setError(data.message || "Login gagal karena alasan yang tidak diketahui.");
      }
    } catch (err: any) {
      setError(err.response.data.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">

        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang!</h1>
          <p className="text-gray-600 mb-8">Silakan login untuk melanjutkan</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors disabled:bg-cyan-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </>
              ) : 'Login'}
            </button>

            <p className="text-sm text-center text-gray-600">
              Belum punya akun?{" "}
              <Link href="/register" className="text-cyan-600 hover:underline font-medium">
                Register di sini
              </Link>
            </p>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block w-1/2 bg-cyan-600 p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Sistem Pelaporan Kerusakan Fasilitas</h2>
          <p className="text-cyan-100">Laporkan kerusakan fasilitas dengan mudah dan cepat. Bantu kami menjaga lingkungan kampus agar tetap nyaman.</p>
        </div>
      </div>
    </div>
  );
}
