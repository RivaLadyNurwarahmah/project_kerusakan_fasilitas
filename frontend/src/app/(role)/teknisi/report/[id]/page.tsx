"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getReportById, updateReportStatus } from '@/api/reports';

interface Report {
    id_report: number;
    deskripsi: string;
    status: string;
    tanggal_laporan: string;
    gambar: string;
    fasilitas: {
        nama: string;
        lokasi: string;
    };
    pengguna: {
        nama_pengguna: string;
    };
}

export default function ReportDetailPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [report, setReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newStatus, setNewStatus] = useState('');
    const [catatan, setCatatan] = useState('');

    useEffect(() => {
        if (id) {
            const fetchReport = async () => {
                try {
                    setLoading(true);
                    const data = await getReportById(Number(id));
                    setReport(data);
                    setNewStatus(data.status);
                } catch (err) {
                    setError("Gagal memuat detail laporan.");
                } finally {
                    setLoading(false);
                }
            };
            fetchReport();
        }
    }, [id]);

    const handleStatusUpdate = async () => {
        if (report && newStatus) {
            try {
                await updateReportStatus(report.id_report, newStatus, catatan);
                alert("Status berhasil diperbarui!");
                router.push('/teknisi/report');
            } catch (err) {
                alert("Gagal memperbarui status.");
            }
        }
    };

    if (loading) return <div className="p-6">Memuat...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (!report) return <div className="p-6">Laporan tidak ditemukan.</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{report.fasilitas.nama}</h1>
            <p className="text-gray-500 mb-8">{report.fasilitas.lokasi}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-bold mb-4">Detail Laporan</h2>
                    <p className="mb-4">{report.deskripsi}</p>
                    {report.gambar && (
                        <img src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${report.gambar}`} alt="Bukti Laporan" className="rounded-lg max-w-full h-auto" />
                    )}
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-bold mb-4">Update Status</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status Saat Ini</label>
                            <p className="font-semibold">{report.status}</p>
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Ubah Status</label>
                            <select id="status" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="w-full p-2 border rounded mt-1">
                                <option value="diproses">Diproses</option>
                                <option value="diverifikasi">Diverifikasi (Selesai)</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="catatan" className="block text-sm font-medium text-gray-700">Catatan (Opsional)</label>
                            <textarea id="catatan" value={catatan} onChange={(e) => setCatatan(e.target.value)} rows={4} className="w-full p-2 border rounded mt-1"></textarea>
                        </div>
                        <button onClick={handleStatusUpdate} className="w-full bg-cyan-600 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}