"use client";

import { useEffect, useState } from 'react';
import { getReportStatistics } from '@/api/reports';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ShieldCheck, Hourglass, FileText } from 'lucide-react';

interface ReportStats {
  total: number;
  by_status: {
    diverifikasi: number;
    diproses: number;
    dilaporkan: number;
  };
}

const StatCard = ({ title, value, icon: Icon, color }: { title: string, value: number, icon: React.ElementType, color: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
    <div className={`p-3 rounded-full ${color}`}>
      <Icon className="text-white" size={24} />
    </div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState<ReportStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getReportStatistics();
        setStats(data);
      } catch (err) {
        setError("Gagal memuat statistik laporan.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Memuat data...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  const chartData = stats ? [
    { name: 'Dilaporkan', jumlah: stats.by_status.dilaporkan, fill: '#facc15' },
    { name: 'Diproses', jumlah: stats.by_status.diproses, fill: '#fb923c' },
    { name: 'Diverifikasi', jumlah: stats.by_status.diverifikasi, fill: '#4ade80' },
  ] : [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Laporan" value={stats?.total ?? 0} icon={FileText} color="bg-blue-500" />
        <StatCard title="Laporan Baru" value={stats?.by_status.dilaporkan ?? 0} icon={FileText} color="bg-yellow-500" />
        <StatCard title="Sedang Diproses" value={stats?.by_status.diproses ?? 0} icon={Hourglass} color="bg-orange-500" />
        <StatCard title="Selesai" value={stats?.by_status.diverifikasi ?? 0} icon={ShieldCheck} color="bg-green-500" />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Statistik Laporan per Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#888888" />
            <YAxis stroke="#888888" />
            <Tooltip wrapperClassName="!bg-white !border-gray-300 !rounded-lg" />
            <Legend />
            <Bar dataKey="jumlah" name="Jumlah Laporan" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
