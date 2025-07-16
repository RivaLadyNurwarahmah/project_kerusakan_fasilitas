"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface User {
    id_user?: number;
    nama_pengguna: string;
    email: string;
    peran: string;
    sandi?: string;
}

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: User) => void;
    user: User | null;
}

export default function UserModal({ isOpen, onClose, onSave, user }: UserModalProps) {
    const [formData, setFormData] = useState<User>({ nama_pengguna: '', email: '', peran: 'umum', sandi: '' });

    useEffect(() => {
        if (user) {
            setFormData({ ...user, sandi: '' }); // Don't pre-fill password
        } else {
            setFormData({ nama_pengguna: '', email: '', peran: 'umum', sandi: '' });
        }
    }, [user]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{user ? 'Edit Pengguna' : 'Tambah Pengguna'}</h2>
                    <button onClick={onClose}><X size={24} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="nama_pengguna" value={formData.nama_pengguna} onChange={handleChange} placeholder="Nama Pengguna" required className="w-full p-2 border rounded" />
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 border rounded" />
                    <input name="sandi" type="password" value={formData.sandi || ''} onChange={handleChange} placeholder={user ? 'Kata Sandi Baru (opsional)' : 'Kata Sandi'} required={!user} className="w-full p-2 border rounded" />
                    <select name="peran" value={formData.peran} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="umum">Umum</option>
                        <option value="teknisi">Teknisi</option>
                        <option value="admin">Admin</option>
                    </select>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    );
}