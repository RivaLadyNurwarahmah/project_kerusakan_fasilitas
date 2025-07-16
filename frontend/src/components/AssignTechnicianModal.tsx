"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getTeknisi } from '@/api/users'; // Assuming this function will be created

interface Teknisi {
    id_user: number;
    nama_pengguna: string;
}

interface AssignModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAssign: (teknisiId: number) => void;
    reportId: number | null;
}

export default function AssignTechnicianModal({ isOpen, onClose, onAssign, reportId }: AssignModalProps) {
    const [teknisiList, setTeknisiList] = useState<Teknisi[]>([]);
    const [selectedTeknisi, setSelectedTeknisi] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            const fetchTeknisi = async () => {
                try {
                    setLoading(true);
                    const data = await getTeknisi();
                    setTeknisiList(data);
                } catch (error) {
                    console.error("Gagal memuat daftar teknisi:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchTeknisi();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleAssign = () => {
        if (selectedTeknisi) {
            onAssign(selectedTeknisi);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Tugaskan Teknisi</h2>
                    <button onClick={onClose}><X size={24} /></button>
                </div>
                {loading ? (
                    <p>Memuat teknisi...</p>
                ) : (
                    <div className="space-y-4">
                        <select
                            onChange={(e) => setSelectedTeknisi(Number(e.target.value))}
                            className="w-full p-2 border rounded"
                            defaultValue=""
                        >
                            <option value="" disabled>Pilih Teknisi</option>
                            {teknisiList.map(t => (
                                <option key={t.id_user} value={t.id_user}>{t.nama_pengguna}</option>
                            ))}
                        </select>
                        <div className="flex justify-end space-x-4">
                            <button type="button" onClick={onClose} className="px-4 py-2 rounded">Batal</button>
                            <button onClick={handleAssign} disabled={!selectedTeknisi} className="px-4 py-2 bg-cyan-600 text-white rounded disabled:bg-gray-400">Tugaskan</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}