"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:1212/facilities")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setFacilities(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-cyan-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-cyan-800">Daftar Laporan Fasilitas</h1>
        <button
          onClick={() => router.push("/admin/fasilitas/create")}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          Tambah Fasilitas
        </button>
      </div>

        {facilities.length === 0 ? (
          <p className="text-gray-600">Belum ada fasilitas.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow ring-1 ring-gray-200 bg-white">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-cyan-600 text-white uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">Kode</th>
                  <th className="px-4 py-3">Lokasi</th>
                  <th className="px-4 py-3">Jenis</th>
                  <th className="px-4 py-3">Deskripsi</th>
                  <th className="px-4 py-3">Prioritas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {facilities.map((facility, index) => (
                  <tr
                    key={facility.id_facilities}
                    className="hover:bg-cyan-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">{facility.nama}</td>
                    <td className="px-4 py-3">{facility.kode}</td>
                    <td className="px-4 py-3">{facility.lokasi}</td>
                    <td className="px-4 py-3">{facility.jenis}</td>
                    <td className="px-4 py-3">{facility.deskripsi}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          facility.prioritas === "urgensi"
                            ? "bg-red-100 text-red-700"
                            : facility.prioritas === "sedang"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {facility.prioritas}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>    
  );
}
