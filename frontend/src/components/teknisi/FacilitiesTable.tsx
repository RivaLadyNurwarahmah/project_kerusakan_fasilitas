'use client';

import { useEffect, useState } from 'react';
import { getFacilities } from '@/api/facilities';

interface Facility {
  id_facilities: number;
  nama: string;
  kode: string;
  lokasi: string;
  jenis: string;
  deskripsi: string;
  prioritas: string;
}

export default function FacilitiesTable() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const data = await getFacilities();
      setFacilities(data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kode
            </th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama
            </th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lokasi
            </th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Jenis
            </th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prioritas
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {facilities.map((facility) => (
            <tr key={facility.id_facilities}>
              <td className="px-6 py-4 whitespace-nowrap">{facility.kode}</td>
              <td className="px-6 py-4">
                <div className="font-medium">{facility.nama}</div>
                <div className="text-sm text-gray-500">{facility.deskripsi}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{facility.lokasi}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${facility.jenis === 'elektronik'
                      ? 'bg-blue-100 text-blue-800'
                      : facility.jenis === 'non_elektronik'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  {facility.jenis.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${facility.prioritas === 'urgensi'
                      ? 'bg-red-100 text-red-800'
                      : facility.prioritas === 'sedang'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                >
                  {facility.prioritas}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
