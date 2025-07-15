import { useState } from 'react';
import { Table, Badge, Button, Group, Modal, Select, Textarea, Text, LoadingOverlay } from '@mantine/core';

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

interface ReportListProps {
  reports: Report[];
  onUpdateStatus: (reportId: number, status: string, catatan: string) => Promise<void>;
  loading: boolean;
}

export default function ReportList({ reports, onUpdateStatus, loading }: ReportListProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [catatan, setCatatan] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleStatusUpdate = async () => {
    if (selectedReport && newStatus) {
      await onUpdateStatus(selectedReport.id_report, newStatus, catatan);
      setModalOpen(false);
      setNewStatus('');
      setCatatan('');
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'dilaporkan':
        return 'yellow';
      case 'diverifikasi':
        return 'green';
      case 'diproses':
        return 'orange';
      default:
        return 'gray';
    }
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={loading} />
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Pelapor</th>
              <th>Fasilitas</th>
              <th>Lokasi</th>
              <th>Status</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id_report}>
                <td>{report.id_report}</td>
                <td>{report.pengguna.nama_pengguna}</td>
                <td>{report.fasilitas.nama}</td>
                <td>{report.fasilitas.lokasi}</td>
                <td>
                  <Badge color={getStatusBadgeColor(report.status)}>
                    {report.status}
                  </Badge>
                </td>
                <td>{new Date(report.tanggal_laporan).toLocaleDateString()}</td>
                <td>
                  <Button
                    size="xs"
                    onClick={() => {
                      setSelectedReport(report);
                      setModalOpen(true);
                    }}
                  >
                    Update Status
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Update Status Laporan"
      >
        {selectedReport && (
          <>
            <Text size="sm" mb="xs">
              Laporan #{selectedReport.id_report} - {selectedReport.fasilitas.nama}
            </Text>
            <Select
              label="Status Baru"
              value={newStatus}
              onChange={(value) => setNewStatus(value || '')}
              data={[
                { value: 'dilaporkan', label: 'Dilaporkan' },
                { value: 'diverifikasi', label: 'Diverifikasi' },
                { value: 'diproses', label: 'Diproses' }
              ]}
              mb="sm"
            />
            <Textarea
              label="Catatan"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              mb="md"
            />
            <Group position="right">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleStatusUpdate}>
                Simpan
              </Button>
            </Group>
          </>
        )}
      </Modal>
    </>
  );
}
