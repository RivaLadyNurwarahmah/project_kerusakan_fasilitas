import { $Enums } from "@prisma/client";
import { prisma } from "../configs/prisma";

export async function getAllFacilitiesService() {
  const facilities = await prisma.facilities.findMany({
    include: {
      reports: {
        include: {
          pengguna: true,
          reportLog: true,
        },
      },
    },
  });
  return facilities
}

export async function createFacilitiesService(data: {  
  nama: string,
  kode: string,
  lokasi: string,
  jenis: $Enums.jenis_fasilitas
  deskripsi: string,
  prioritas: $Enums.prioritas_laporan
}) {
  return prisma.facilities.create({
    data,
  });
}

export async function deleteFacilitiesServices(id_facilities: number){
  return prisma.facilities.delete({
    where: {
      id_facilities: id_facilities
    }
  });
}

export async function updateFacilitiesServices(
  id_facilities: number,
  data: {
    nama: string,
    kode: string,
    lokasi: string,
    jenis: $Enums.jenis_fasilitas,
    deskripsi: string,
    prioritas: $Enums.prioritas_laporan
}){
  return prisma.facilities.update({
    where: {id_facilities},
    data
  });
}

