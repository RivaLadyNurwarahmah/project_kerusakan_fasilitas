"use client";

import { useEffect, useState } from 'react';
import { getUrgentFacilities } from '@/api/facilities'; // Assuming this function will be created

interface Facility {
    id_facilities: number;
    nama: string;
    lokasi: string;
    urgencyScore: number;
    reports: any[];
}

export default function UrgentFacilitiesPage() {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUrgentFacilities = async () => {
            try {
                const data = await getUrgentFacilities();
                setFacilities(data);
            } catch (err) {
                setError("Gagal memuat data fasilitas urgent.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUrgentFacilities();
    }, []);

    if (loading) return <div className="p-6">Memuat...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Fasilitas Paling Urgent</h1>
            <div className="space-y-4">
                {facilities.map((facility, index) => (
                    <div key={facility.id_facilities} className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-cyan-600 mr-4">#{index + 1}</span>
                                <div>
                                    <h2 className="text-xl font-bold">{facility.nama}</h2>
                                    <p className="text-gray-500">{facility.lokasi}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Skor Urgensi</p>
                                <p className="text-2xl font-bold text-red-500">{facility.urgencyScore}</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                            <h3 className="text-sm font-semibold mb-2">Laporan Aktif: {facility.reports.length}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}