'use client';

import { useEffect, useState } from 'react';
import { getReports, updateReportStatus } from '@/lib/api/reports';

interface Report {
  id_report: number;
  deskripsi: string;
  status: string;
  tanggal_laporan: string;
  pengguna: {
    nama_pengguna: string;
  };
  fasilitas: {
    nama: string;
    lokasi: string;
  };
}

export default function ReportTable() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [catatan, setCatatan] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await getReports();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (reportId: number) => {
    try {
      await updateReportStatus(reportId, statusUpdate as any, catatan);
      await fetchReports();
      setSelectedReport(null);
      setStatusUpdate('');
      setCatatan('');
    } catch (error) {
      console.error('Error updating status:', error);
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
              ID
            </th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pelapor
            </th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fasilitas
            </th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tanggal
            </th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reports.map((report) => (
            <tr key={report.id_report}>
              <td className="px-6 py-4 whitespace-nowrap">{report.id_report}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {report.pengguna.nama_pengguna}
              </td>
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium">{report.fasilitas.nama}</div>
                  <div className="text-sm text-gray-500">
                    {report.fasilitas.lokasi}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    report.status === 'diverifikasi'
                      ? 'bg-green-100 text-green-800'
                      : report.status === 'diproses'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {report.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(report.tanggal_laporan).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => setSelectedReport(report)}
                  className="text-cyan-600 hover:text-cyan-900"
                >
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedReport && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Update Status Laporan</h3>
            <select
              value={statusUpdate}
              onChange={(e) => setStatusUpdate(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Pilih Status</option>
              <option value="diverifikasi">Diverifikasi</option>
              <option value="diproses">Diproses</option>
              <option value="dilaporkan">Dilaporkan</option>
            </select>
            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Catatan"
              className="w-full p-2 border rounded mb-4"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Batal
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedReport.id_report)}
                className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
