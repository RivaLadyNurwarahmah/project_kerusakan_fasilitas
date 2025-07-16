"use client";

import { useEffect, useState } from 'react';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import UserModal from '@/components/UserModal';
import { getAllUsers, createUser, updateUser, deleteUser } from '@/api/users';

interface User {
    id_user: number;
    nama_pengguna: string;
    email: string;
    peran: string;
}

export default function ManageUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            setError("Gagal memuat data pengguna.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (user: User | null = null) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setModalOpen(false);
    };

    const handleSaveUser = async (user: any) => {
        try {
            if (user.id_user) {
                await updateUser(user.id_user, user);
            } else {
                await createUser(user);
            }
            fetchUsers();
            handleCloseModal();
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Gagal menyimpan pengguna.";
            alert(errorMessage);
        }
    };

    const handleDelete = async (userId: number) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
            try {
                await deleteUser(userId);
                fetchUsers(); // Refresh list after delete
            } catch (err: any) {
                const errorMessage = err.response?.data?.message || "Gagal menghapus pengguna. Silakan coba lagi.";
                alert(errorMessage);
                console.error(err);
            }
        }
    };

    if (loading) return <div className="p-6">Memuat pengguna...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Manajemen Pengguna</h1>
                <button onClick={() => handleOpenModal()} className="bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-cyan-700">
                    <UserPlus size={20} />
                    <span>Tambah Pengguna</span>
                </button>
            </div>

            <div className="overflow-x-auto rounded-xl shadow ring-1 ring-gray-200 bg-white">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-cyan-600 text-white uppercase text-xs tracking-wider">
                        <tr>
                            <th className="p-3 text-left text-sm font-semibold ">Nama</th>
                            <th className="p-3 text-left text-sm font-semibold ">Email</th>
                            <th className="p-3 text-left text-sm font-semibold ">Peran</th>
                            <th className="p-3 text-left text-sm font-semibold ">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id_user} className="border-b border-gray-100">
                                <td className="p-3">{user.nama_pengguna}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.peran === 'admin' ? 'bg-red-100 text-red-800' :
                                        user.peran === 'teknisi' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                        {user.peran}
                                    </span>
                                </td>
                                <td className="p-3 flex space-x-2">
                                    <button onClick={() => handleOpenModal(user)} className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(user.id_user)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <UserModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveUser}
                user={selectedUser}
            />
        </div>
    );
}