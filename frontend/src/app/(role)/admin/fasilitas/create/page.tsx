"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFacility } from "@/api/facilities";

export default function CreateFacilityPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: "",
    kode: "",
    lokasi: "",
    jenis: "elektronik",
    deskripsi: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await createFacility(formData);
      router.push("/admin/fasilitas");
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal membuat fasilitas.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tambah Fasilitas Baru</h1>
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
              <option value="kebersihan">Kebersihan</option>
              <option value="infrastruktur">Infrastruktur</option>
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors disabled:bg-cyan-400"
          >
            {isLoading ? "Menyimpan..." : "Simpan Fasilitas"}
          </button>
          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
