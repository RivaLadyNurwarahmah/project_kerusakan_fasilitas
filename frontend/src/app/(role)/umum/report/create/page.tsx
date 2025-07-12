"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateReportPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id_pengguna: "",
    id_fasilitas: "",
    deskripsi: "",
    tanggal_laporan: "",
    gambar: null as File | null,
    status: "",
  });

  type Facility = {
    id_facilities: number;
    nama: string;
  };

  const [facilities, setFacilities] = useState<Facility[]>([]);

  useEffect(() => {
    fetch("http://localhost:1212/facilities")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFacilities(data.data);
        }
      })
      .catch((err) => console.error("Error fetching fasilitas:", err));
  }, []);

  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, gambar: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const user = JSON.parse(localStorage.getItem("user")!);
    const form = new FormData();
    form.append("id_pengguna", user.id_user);
    form.append("id_fasilitas", formData.id_fasilitas);
    form.append("deskripsi", formData.deskripsi);
    form.append("tanggal_laporan", formData.tanggal_laporan);
    form.append("status", formData.status);
    if (formData.gambar) form.append("gambar", formData.gambar);

    try {
      const res = await fetch("http://localhost:1212/report", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        router.push("/umum/report");
      } else {
        setError(data.message || "Gagal mengirim laporan");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengirim laporan");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold text-cyan-700 mb-4">
        Buat Laporan Baru
      </h1>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Fasilitas
          </label>
          <select
            name="id_fasilitas"
            required
            onChange={(e) => {
              console.log(e.target.value);

              formData.id_fasilitas = e.target.value;
            }}
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="">-- Pilih Fasilitas --</option>
            {facilities.map((item) => (
              <option key={item.id_facilities} value={item.id_facilities}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Deskripsi Kerusakan
          </label>
          <textarea
            name="deskripsi"
            required
            rows={4}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="Jelaskan kerusakan yang terjadi..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Upload Gambar (Opsional)
          </label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 h-32 object-cover rounded"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg w-full"
        >
          Kirim Laporan
        </button>
      </form>
    </div>
  );
}
