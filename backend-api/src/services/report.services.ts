import { prisma } from "../configs/prisma";

export async function getAllReportService() {
  return prisma.report.findMany({
    include: {
      pengguna: true,
      fasilitas: true,
      reportLog: true,
    },
    orderBy: {
      tanggal_laporan: "desc",
    },
  });
}

export async function createReportServices(data: {
  id_pengguna: number,
  id_fasilitas: number,
  deskripsi: string,
  gambar?: string,
  prioritas: string
}) {
  return prisma.report.create({
    data: {
      id_pengguna: data.id_pengguna,
      id_fasilitas: data.id_fasilitas,
      deskripsi: data.deskripsi,
      tanggal_laporan: new Date(),
      gambar: data.gambar ?? null,
      prioritas: data.prioritas
    }
  });
}

export async function deleteReportServices(id_report: number) {
  return prisma.report.delete({
    where: {
      id_report: id_report
    }
  });
}

export async function updateReportStatusService(
  id_report: number,
  status: 'diverifikasi' | 'diproses' | 'dilaporkan',
  id_teknisi: number,
  catatan: string
) {
  const report = await prisma.report.update({
    where: { id_report },
    data: { status }
  });

  await prisma.reportLog.create({
    data: {
      id_laporan: id_report,
      id_pengguna: id_teknisi,
      status,
      diubah_pada: new Date(),
      catatan
    }
  });

  return report;
}

export async function getReportStatisticsService() {
  const [total, diverifikasi, diproses, dilaporkan] = await Promise.all([
    prisma.report.count(),
    prisma.report.count({ where: { status: 'diverifikasi' } }),
    prisma.report.count({ where: { status: 'diproses' } }),
    prisma.report.count({ where: { status: 'dilaporkan' } })
  ]);

  return {
    total,
    by_status: {
      diverifikasi,
      diproses,
      dilaporkan
    }
  };
}

export async function getReportsByStatusService(status: 'diverifikasi' | 'diproses' | 'dilaporkan') {
  return prisma.report.findMany({
    where: { status },
    include: {
      pengguna: true,
      fasilitas: true,
      reportLog: {
        include: {
          pengguna: true
        }
      }
    }
  });
}

export async function assignReportToTechnicianService(id_report: number, id_teknisi: number) {
  const updatedReport = await prisma.report.update({
    where: { id_report },
    data: {
      id_teknisi: id_teknisi,
      status: 'diproses'
    }
  });

  await prisma.reportLog.create({
    data: {
      id_laporan: id_report,
      id_pengguna: id_teknisi,
      status: 'diproses',
      catatan: `Laporan ditugaskan kepada teknisi.`,
      diubah_pada: new Date(),
    }
  });

  return updatedReport;
}

export async function getAssignedReportsService(id_teknisi: number) {
  return prisma.report.findMany({
    where: { id_teknisi: id_teknisi },
    include: {
      pengguna: true,
      fasilitas: true,
      reportLog: {
        include: {
          pengguna: true
        }
      }
    }
  });
}

export async function getTechnicianDashboardData(userId: number) {
  const totalLaporan = await prisma.report.count();
  const fasilitasAktif = await prisma.facilities.count();
  const laporanDiproses = await prisma.report.count({
    where: {
      status: "diproses"
    }
  });
  const teknisi = await prisma.user.findUnique({
    where: { id_user: userId },
    select: { nama_pengguna: true }
  });
  const laporanPerFasilitas = await prisma.report.groupBy({
    by: ["id_fasilitas"],
    _count: {
      id_report: true
    }
  });
  const fasilitas = await prisma.facilities.findMany({
    select: {
      id_facilities: true,
      nama: true
    }
  });
  const chartData = laporanPerFasilitas.map((item) => {
    const fasilitasNama = fasilitas.find(f => f.id_facilities === item.id_fasilitas)?.nama || "Tidak Diketahui";
    return {
      name: fasilitasNama,
      reports: item._count.id_report
    };
  });

  return {
    totalLaporan,
    fasilitasAktif,
    laporanDiproses,
    teknisi,
    chartData
  };
}

export async function getMyReportsService(id_pengguna: number) {
  return prisma.report.findMany({
    where: { id_pengguna: id_pengguna },
    orderBy: {
      tanggal_laporan: "desc",
    },
    include: {
      fasilitas: true,
    }
  });
}

export async function getReportByIdService(id_report: number) {
  return prisma.report.findUnique({
    where: { id_report },
    include: {
      pengguna: true,
      fasilitas: true,
      reportLog: true,
    }
  });
}
