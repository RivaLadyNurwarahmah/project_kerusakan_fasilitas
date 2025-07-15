"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateReportPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: "",
    kode: "",
    lokasi: "",
    jenis: "",
    deskripsi: "",
    prioritas: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const res = await fetch("http://localhost:1212/facilities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin/fasilitas");
      } else {
        setError(data.message || "Gagal menambahkan fasilitas");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat menambahkan fasilitas");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold text-cyan-700 mb-4">
        Tambah Fasilitas
      </h1>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama
          </label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="Nama fasilitas"
          />
        </div>

        {/* Kode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kode
          </label>
          <input
            type="text"
            name="kode"
            value={formData.kode}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="Kode fasilitas"
          />
        </div>

        {/* Lokasi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lokasi
          </label>
          <input
            type="text"
            name="lokasi"
            value={formData.lokasi}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="Lokasi fasilitas"
          />
        </div>

        {/* Jenis */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jenis
          </label>
          <select
            name="jenis"
            value={formData.jenis}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="">-- Pilih Jenis --</option>
            <option value="elektronik">Elektronik</option>
            <option value="non_elektronik">Non-Elektronik</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="Deskripsikan fasilitas secara rinci..."
          />
        </div>

        {/* Prioritas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prioritas
          </label>
          <select
            name="prioritas"
            value={formData.prioritas}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="">-- Pilih Prioritas --</option>
            <option value="urgensi">Urgensi</option>
            <option value="sedang">Sedang</option>
            <option value="rendah">Rendah</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg w-full"
        >
          Tambahkan
        </button>
      </form>
    </div>
  );
}
