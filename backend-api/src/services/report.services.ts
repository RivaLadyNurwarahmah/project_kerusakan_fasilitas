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

