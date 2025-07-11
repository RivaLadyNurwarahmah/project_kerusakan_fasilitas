"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nama_pengguna: "",
    sandi: "",
    email: "",    
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:1212/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama_pengguna: form.nama_pengguna,
          email: form.email,
          sandi: form.sandi,
        }),
      });

      const data = await res.json();
      console.log(data);
      
      if (!data.success) throw new Error(data.message);
      localStorage.setItem("user", JSON.stringify(data.data.user))
      router.push("/umum/dashboard"); 
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-cyan-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* <h1 className="text-xl font-bold text-center text-black-800 mb-6">
          Sistem Manajemen Kerusakan Fasilitas Kampus
        </h1> */}
        <h2 className="text-2xl font-bold text-center text-cyan-800 mb-6">
          Login
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
            label="Email"
            type="email"
            name="email"
            value={form.email}
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" full>
            Login
          </Button>
          <p className="text-sm text-center text-cyan-600">
            Belum punya akun?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
