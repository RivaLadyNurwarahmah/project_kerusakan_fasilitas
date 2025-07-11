"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nama_pengguna: "",
    sandi: "",
    email: "",
    peran: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama_pengguna: form.nama_pengguna,
          email: form.email,
          sandi: form.sandi,
          peran: form.peran,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      router.push("/dashboard"); // atau halaman setelah login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* <h1 className="text-xl font-bold text-center text-black-800 mb-6">
          Sistem Manajemen Kerusakan Fasilitas Kampus
        </h1> */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nama"
            type="nama_pengguna"
            name="nama_pengguna"
            value={form.nama_pengguna}
            onChange={handleChange}
            required
          />
          <Input
            label="Kata Sandi"
            type="password"
            name="sandi"
            value={form.sandi}
            onChange={handleChange}
            required
          /> 
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
              Peran
          </label>
          <select
              name="peran"
              value={form.peran}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Pilih Peran
              </option>
              <option value="admin">Admin</option>
              <option value="teknisi">Teknisi</option>
              <option value="umum">Umum</option>
            </select>          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" full>
            Register
          </Button>          
        </form>
      </div>
    </div>
  );
}
