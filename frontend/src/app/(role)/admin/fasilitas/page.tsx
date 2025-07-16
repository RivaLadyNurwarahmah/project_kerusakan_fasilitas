"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFacilities, deleteFacility } from "@/api/facilities";

type Facilities = {
  id_facilities: number;
  nama: string;
  kode: number;
  lokasi: string;
  jenis: string;
  deskripsi: string;
  prioritas: string;
};

export default function FacilitiesListPage() {
  const [facilities, setFacilities] = useState<Facilities[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      const data = await getFacilities();
      setFacilities(data);
    } catch (error) {
      console.error("Gagal memuat fasilitas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (facilityId: number) => {
    if (window.confirm("Yakin ingin menghapus fasilitas ini?")) {
      try {
        await deleteFacility(facilityId);
        fetchFacilities();
      } catch (error) {
        alert("Gagal menghapus fasilitas.");
      }
    }
  };

  if (loading) return <div className="p-6">Memuat...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Fasilitas</h1>
        <button
          onClick={() => router.push("/admin/fasilitas/create")}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          Tambah Fasilitas
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow ring-1 ring-gray-200 bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-cyan-600 text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Kode</th>
              <th className="px-4 py-3">Lokasi</th>
              <th className="px-4 py-3">Jenis</th>              
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {facilities.map((facility, index) => (
              <tr key={facility.id_facilities} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{index + 1}</td>
                <td className="px-4 py-3">{facility.nama}</td>
                <td className="px-4 py-3">{facility.kode}</td>
                <td className="px-4 py-3">{facility.lokasi}</td>
                <td className="px-4 py-3">{facility.jenis}</td>               
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(facility.id_facilities)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
