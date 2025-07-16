"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFacilities } from "@/api/facilities";

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
    const fetch = async () => {
      try {
        const data = await getFacilities()
        setFacilities(data)
      } catch (error) {
        console.error(error);
      }
    }

    fetch()
  }, []);

  return (
    <div className="min-h-screen bg-cyan-50 p-6">
      <h1 className="text-2xl font-bold text-cyan-800 mb-6">
        Daftar Fasilitas
      </h1>

      {facilities.length === 0 ? (
        <p className="text-gray-600">Belum ada fasilitas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <div
              key={facility.id_facilities}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
            >
              <div className="mb-2 text-sm text-gray-500">#{index + 1}</div>
              <h2 className="text-lg font-semibold text-cyan-700 mb-1">
                {facility.nama}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Kode:</span> {facility.kode}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Lokasi:</span> {facility.lokasi}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Jenis:</span> {facility.jenis}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Deskripsi:</span>{" "}
                {facility.deskripsi}
              </p>
              <div className="mt-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${facility.prioritas === "urgensi"
                      ? "bg-red-100 text-red-700"
                      : facility.prioritas === "sedang"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                >
                  Prioritas: {facility.prioritas}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
