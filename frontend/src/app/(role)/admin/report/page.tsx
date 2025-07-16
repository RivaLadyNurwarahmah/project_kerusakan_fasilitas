"use client";

import { useEffect, useState } from "react";
import { getAllReports, deleteReport, assignReportToTechnician } from "@/api/reports";
import AssignTechnicianModal from "@/components/AssignTechnicianModal";
import { UserPlus } from "lucide-react";

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
  id_teknisi: number | null;
};

export default function ReportListPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await getAllReports();
      setReports(data);
    } catch (err) {
      setError("Gagal memuat laporan.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reportId: number) => {
    if (window.confirm("Yakin ingin menghapus laporan ini?")) {
      try {
        await deleteReport(reportId);
        fetchReports();
      } catch (err) {
        alert("Gagal menghapus laporan.");
      }
    }
  };

  const handleOpenAssignModal = (reportId: number) => {
    setSelectedReportId(reportId);
    setModalOpen(true);
  };

  const handleAssignTechnician = async (teknisiId: number) => {
    if (selectedReportId) {
      try {
        await assignReportToTechnician(selectedReportId, teknisiId);
        setModalOpen(false);
        fetchReports();
      } catch (err) {
        alert("Gagal menugaskan teknisi.");
      }
    }
  };

  if (loading) return <div className="p-6">Memuat...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Daftar Laporan</h1>
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
              <th className="px-4 py-3" colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={report.id_report}>
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
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${report.status === "selesai"
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
                <td>
                  {report.id_teknisi ? (
                    <span className="text-sm font-semibold text-green-600">Ditugaskan</span>
                  ) : (
                    <button
                      onClick={() => handleOpenAssignModal(report.id_report)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium flex items-center"
                    >
                      <UserPlus size={14} className="mr-1" />
                      Assign
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(report.id_report)}
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
      <AssignTechnicianModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAssign={handleAssignTechnician}
        reportId={selectedReportId}
      />
    </div>
  );
}
