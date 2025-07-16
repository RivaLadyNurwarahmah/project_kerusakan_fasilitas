"use client";

import { useEffect, useState } from 'react';
import { getMyReports } from '@/api/reports';
import { StatCard } from '@/components/ui/StatCard';
import { List, Wrench, CheckCircle, PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface Report {
    id_report: number;
    status: string;
}

export default function UmumDashboard() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMyReports = async () => {
            try {
                const myReports = await getMyReports();
                setReports(myReports);
            } catch (err) {
                setError("Gagal memuat laporan Anda.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyReports();
    }, []);

    const stats = {
        total: reports.length,
        diproses: reports.filter(r => r.status === 'diproses' || r.status === 'dilaporkan').length,
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
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Laporan Saya" value={stats.total} icon={List} color="bg-blue-500" />
                <StatCard title="Dalam Proses" value={stats.diproses} icon={Wrench} color="bg-orange-500" />
                <StatCard title="Laporan Selesai" value={stats.selesai} icon={CheckCircle} color="bg-green-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                    className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center text-center hover:bg-gray-100 transition-colors"
                    href="/umum/report/create">

                    <PlusCircle className="text-cyan-600 mb-2" size={40} />
                    <h2 className="text-xl font-bold text-gray-800">Buat Laporan Baru</h2>
                    <p className="text-gray-500 mt-1">Laporkan kerusakan fasilitas yang Anda temukan.</p>

                </Link>
                <Link
                    href="/umum/riwayat"
                    className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center text-center hover:bg-gray-100 transition-colors"
                >

                    <List className="text-cyan-600 mb-2" size={40} />
                    <h2 className="text-xl font-bold text-gray-800">Lihat Riwayat Laporan</h2>
                    <p className="text-gray-500 mt-1">Pantau status semua laporan yang pernah Anda buat.</p>
                </Link>
            </div>
        </div>
    );
}