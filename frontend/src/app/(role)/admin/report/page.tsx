"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    fetch("http://localhost:1212/report")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setReports(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-cyan-800">
            Daftar Laporan Fasilitas
          </h1>
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
          <div className="overflow-x-auto rounded-xl shadow ring-1 ring-gray-200 bg-white">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-cyan-600 text-white uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Fasilitas</th>
                  <th className="px-4 py-3">Lokasi</th>
                  <th className="px-4 py-3">Deskripsi</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Gambar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reports.map((report, index) => (
                  <tr
                    key={report.id_report}
                    className="hover:bg-cyan-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">{report.fasilitas.nama}</td>
                    <td className="px-4 py-3">{report.fasilitas.lokasi}</td>
                    <td className="px-4 py-3">{report.deskripsi}</td>
                    <td className="px-4 py-3">
                      {new Date(report.tanggal_laporan).toLocaleDateString(
                        "id-ID"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          report.status === "selesai"
                            ? "bg-green-100 text-green-700"
                            : report.status === "diproses"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {report.gambar ? (
                        <img
                          src={`http://localhost:1212/uploads/${report.gambar}`}
                          alt="Bukti"
                          className="h-16 w-24 object-cover rounded border"
                        />
                      ) : (
                        <span className="text-gray-400 italic">Tidak ada</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
