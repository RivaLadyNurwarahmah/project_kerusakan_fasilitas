import { $Enums } from "@prisma/client";
import { prisma } from "../configs/prisma";

export async function getAllReportService() {
  const reports = await prisma.report.findMany({
    include: {
      pengguna: true, 
      fasilitas: true, 
      reportLog: true, 
    },
    orderBy: {
      tanggal_laporan: "desc",
    },
  });
  return reports
}

export async function createReportServices(data: {
  id_pengguna: number,
  id_fasilitas: number,
  deskripsi: string,
  gambar?: string
}) {
  return prisma.report.create({
    data: {
      id_pengguna: data.id_pengguna,
      id_fasilitas: data.id_fasilitas,      
      deskripsi: data.deskripsi,
      tanggal_laporan: new Date(),
      gambar: data.gambar ?? null  
    }
  });
}

export async function deleteReportServices(id_report: number){
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

    // Create report log
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
    return await prisma.report.findMany({
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


export async function getTechnicianDashboardData(userId: number) {
  // 1. Total semua laporan
  const totalLaporan = await prisma.report.count();

  // 2. Total fasilitas (anggap semua fasilitas = aktif)
  const fasilitasAktif = await prisma.facilities.count();

  // 3. Laporan dengan status "diproses"
  const laporanDiproses = await prisma.report.count({
    where: {
      status: "diproses"
    }
  });

  // 4. Profil teknisi
  const teknisi = await prisma.user.findUnique({
    where: { id_user: userId },
    select: { nama_pengguna: true }
  });

  // 5. Statistik jumlah laporan per fasilitas
  const laporanPerFasilitas = await prisma.report.groupBy({
    by: ["id_fasilitas"],
    _count: {
      id_report: true
    }
  });

  // Gabungkan dengan nama fasilitas
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
