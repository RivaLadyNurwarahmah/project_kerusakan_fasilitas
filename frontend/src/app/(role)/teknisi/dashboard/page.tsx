"use client";

import { useEffect, useState } from 'react';
import { getAssignedReports } from '@/api/reports';
import { List, Wrench, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { StatCard } from '@/components/ui/StatCard';

interface Report {
  id_report: number;
  deskripsi: string;
  status: string;
  tanggal_laporan: string;
  fasilitas: {
    nama: string;
    lokasi: string;
  };
}

export default function TeknisiDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignedReports = async () => {
      try {
        // This service needs to be created in the frontend api
        const assignedReports = await getAssignedReports();
        setReports(assignedReports);
      } catch (err) {
        setError("Gagal memuat laporan yang ditugaskan.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignedReports();
  }, []);

  const stats = {
    total: reports.length,
    diproses: reports.filter(r => r.status === 'diproses').length,
    selesai: reports.filter(r => r.status === 'diverifikasi').length,
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Memuat data...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Teknisi</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Tugas" value={stats.total} icon={List} color="bg-blue-500" />
        <StatCard title="Sedang Dikerjakan" value={stats.diproses} icon={Wrench} color="bg-orange-500" />
        <StatCard title="Tugas Selesai" value={stats.selesai} icon={CheckCircle} color="bg-green-500" />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Daftar Tugas Terbaru</h2>
        <div className="space-y-4">
          {reports.slice(0, 5).map(report => (
            <Link
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              href={`/teknisi/report/${report.id_report}`} key={report.id_report}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{report.fasilitas.nama} - {report.fasilitas.lokasi}</p>
                  <p className="text-sm text-gray-600">{report.deskripsi}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${report.status === 'diproses' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                  {report.status}
                </span>
              </div>
            </Link>
          ))}
          {reports.length === 0 && (
            <p className="text-gray-500">Tidak ada tugas yang ditugaskan saat ini.</p>
          )}
        </div>
      </div>
    </div>
  );
}
