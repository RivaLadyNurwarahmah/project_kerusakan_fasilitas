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
  jenis: $Enums.jenis_fasilitas,
  deskripsi: string,
}) {
  return prisma.facilities.create({
    data,
  });
}

export async function deleteFacilitiesServices(id_facilities: number) {
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
  }) {
  return prisma.facilities.update({
    where: { id_facilities },
    data
  });
}



const URGENCY_SCORES = {
  urgensi: 10,
  sedang: 5,
  rendah: 1,
};

export async function getUrgentFacilitiesService() {
  const facilities = await prisma.facilities.findMany({
    include: {
      reports: {
        where: {
          status: { not: 'diverifikasi' }
        }
      },
    },
  });

  const facilitiesWithScores = facilities.map(facility => {
    const score = facility.reports.reduce((acc, report) => {
      const priority = report.prioritas as keyof typeof URGENCY_SCORES;
      return acc + (URGENCY_SCORES[priority] || 0);
    }, 0);
    return { ...facility, urgencyScore: score };
  });

  //implementasi bubble sort
  for (let i = 0; i < facilitiesWithScores.length; i++) {
    for (let j = 0; j < (facilitiesWithScores.length - i - 1); j++) {
      if (facilitiesWithScores[j].urgencyScore < facilitiesWithScores[j + 1].urgencyScore) {
        let temp = facilitiesWithScores[j];
        facilitiesWithScores[j] = facilitiesWithScores[j + 1];
        facilitiesWithScores[j + 1] = temp;
      }
    }
  }

  return facilitiesWithScores;
}
