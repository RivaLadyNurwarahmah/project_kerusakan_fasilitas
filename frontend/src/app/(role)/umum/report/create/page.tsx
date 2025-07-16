"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFacilities } from "@/api/facilities";
import { createReport } from "@/api/reports";

export default function CreateReportPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id_fasilitas: "",
    deskripsi: "",
    gambar: null as File | null,
    prioritas: "rendah",
  });
  const [facilities, setFacilities] = useState<{ id_facilities: number; nama: string }[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const data = await getFacilities();
        setFacilities(data);
      } catch (err) {
        console.error("Error fetching fasilitas:", err);
        setError("Gagal memuat daftar fasilitas.");
      }
    };
    fetchFacilities();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, gambar: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const user = JSON.parse(localStorage.getItem("user")!);
    const form = new FormData();
    form.append("id_pengguna", user.id_user);
    form.append("id_fasilitas", formData.id_fasilitas);
    form.append("deskripsi", formData.deskripsi);
    form.append("prioritas", formData.prioritas);
    if (formData.gambar) {
      form.append("gambar", formData.gambar);
    }

    try {
      await createReport(form);
      router.push("/umum/riwayat");
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal mengirim laporan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Buat Laporan Kerusakan</h1>
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
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Tingkat Kerusakan
            </label>
            <select
              name="prioritas"
              value={formData.prioritas}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="rendah">Rendah</option>
              <option value="sedang">Sedang</option>
              <option value="urgensi">Urgensi</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors disabled:bg-cyan-400"
          >
            {isLoading ? "Mengirim..." : "Kirim Laporan"}
          </button>
          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
