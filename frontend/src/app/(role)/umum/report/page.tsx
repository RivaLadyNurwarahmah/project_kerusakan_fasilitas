"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createReport, getAllReports } from "@/api/reports";

type Report = {
  id_report: number;
  deskripsi: string;
  tanggal_laporan: string;
  fasilitas: {
    nama: string;
    lokasi: string;
  };
  status: string;
  gambar: string;
};

export default function ReportListPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAllReports()
        setReports(data)
      } catch (error) {
        console.error(error);
      }
    }

    fetch()
  }, []);

  return (
    <div className="min-h-screen bg-cyan-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-cyan-800">Daftar Laporan Fasilitas</h1>
        <button
          onClick={() => router.push("/umum/report/create")}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          Buat Laporan Baru
        </button>
      </div>

      {reports.length === 0 ? (
        <p className="text-gray-600">Belum ada laporan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <div
              key={report.id_report}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
            >
              <div className="mb-2 text-sm text-gray-500">Laporan {index + 1}</div>
              <h2 className="text-lg font-semibold text-cyan-700 mb-1">
                {report.fasilitas.nama}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Lokasi:</span> {report.fasilitas.lokasi}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Deskripsi:</span> {report.deskripsi}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Tanggal:</span>{" "}
                {new Date(report.tanggal_laporan).toLocaleDateString("id-ID")}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${report.status === "selesai"
                    ? "bg-green-100 text-green-700"
                    : report.status === "diproses"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-200 text-gray-800"
                    }`}
                >
                  {report.status}
                </span>
              </div>
              <div className="mt-3">
                {report.gambar ? (
                  <img
                    src={`http://localhost:1212/uploads/${report.gambar}`}
                    alt="Bukti kerusakan"
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                ) : (
                  <span className="text-gray-400 italic text-sm">Tidak ada gambar</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
