"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";
import { register } from "@/api/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [namaPengguna, setNamaPengguna] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await register({
        nama_pengguna: namaPengguna,
        email,
        sandi: password,
      });
      if (data.success) {
        router.push("/login");
      } else {
        throw new Error(data.message || "Registrasi gagal");
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
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Buat Akun Baru
          </h1>
          <p className="text-gray-600 mb-8">
            Daftar untuk mulai melaporkan kerusakan.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <User
                className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Nama Pengguna"
                value={namaPengguna}
                onChange={(e) => setNamaPengguna(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                required
              />
            </div>
            <div className="relative">
              <Mail
                className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                size={20}
              />
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
              <Lock
                className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                placeholder="Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors disabled:bg-cyan-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? "Memproses..." : "Register"}
            </button>

            <p className="text-sm text-center text-gray-600">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-cyan-600 hover:underline font-medium"
              >
                Login di sini
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden md:block w-1/2 bg-cyan-600 p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Bergabunglah dengan Kami</h2>
          <p className="text-cyan-100">
            Jadilah bagian dari komunitas yang peduli dengan fasilitas kampus.
            Daftarkan diri Anda dan mulailah berkontribusi hari ini.
          </p>
        </div>
      </div>
    </div>
  );
}
