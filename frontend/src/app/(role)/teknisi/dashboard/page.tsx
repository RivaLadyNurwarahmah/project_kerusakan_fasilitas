'use client';

import { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import FacilityChart from "@/components/FacilityChart";
import { Wrench, FileText, Building2, UserCircle } from "lucide-react";

interface ChartData {
  name: string;
  reports: number;
}

export default function DashboardPage() {
  const [totalLaporan, setTotalLaporan] = useState(0);
  const [fasilitasAktif, setFasilitasAktif] = useState(0);
  const [laporanDiproses, setLaporanDiproses] = useState(0);
  const [namaTeknisi, setNamaTeknisi] = useState("Loading...");
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("http://localhost:1212/report/statsistics");
        const data = await res.json();

        console.log(data);
        

        setTotalLaporan(data.totalLaporan);
        setFasilitasAktif(data.fasilitasAktif);
        setLaporanDiproses(data.laporanDiproses);
        setNamaTeknisi(data.teknisi?.nama_pengguna ?? "Tidak diketahui");
        setChartData(data.chartData ?? []);
      } catch (error) {
        console.error("Gagal fetch data dashboard:", error);
      }
    }

    fetchStats();
  }, []);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard Teknisi</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <DashboardCard title="Total Laporan" value={totalLaporan} icon={FileText} />
        <DashboardCard title="Fasilitas Aktif" value={fasilitasAktif} icon={Building2} color="bg-green-600" />
        <DashboardCard title="Laporan Diproses" value={laporanDiproses} icon={Wrench} color="bg-yellow-500" />
        <DashboardCard title="Profil" value={namaTeknisi} icon={UserCircle} color="bg-indigo-600" />
      </div>

      <FacilityChart
       data={chartData}
        />
    </main>
  );
}
