"use client";

import { useEffect, useState } from 'react';
import { getAssignedReports } from '@/api/reports';
import Link from 'next/link';

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

export default function TeknisiReportPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                const data = await getAssignedReports();
                setReports(data);
            } catch (err) {
                setError("Gagal memuat laporan.");
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    if (loading) return <div className="p-6">Memuat laporan...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Tugas Laporan Saya</h1>
            <div className="overflow-x-auto rounded-xl shadow ring-1 ring-gray-200 bg-white">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-cyan-600 text-white uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-3 py-4">Fasilitas</th>
                            <th className="px-3 py-4">Lokasi</th>
                            <th className="px-3 py-4">Tanggal</th>
                            <th className="px-3 py-4">Status</th>
                            <th className="px-3 py-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map(report => (
                            <tr key={report.id_report} className="border-b border-gray-100">
                                <td className="p-3">{report.fasilitas.nama}</td>
                                <td className="p-3">{report.fasilitas.lokasi}</td>
                                <td className="p-3">{new Date(report.tanggal_laporan).toLocaleDateString('id-ID')}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${report.status === 'diproses' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'
                                        }`}>
                                        {report.status}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <Link
                                        className="text-cyan-600 hover:underline"
                                        href={`/teknisi/report/${report.id_report}`}>
                                        Lihat Detail
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}