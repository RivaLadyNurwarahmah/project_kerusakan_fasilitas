import { $Enums } from "@prisma/client";
import { prisma } from "../configs/prisma";
import { AppError } from "../errors/api_errors";
import { hashing } from "../utils/bcrypt";

export async function getAllUserService() {
  const users = await prisma.user.findMany({
    include: {
      reports: {
        include: {
          fasilitas: true, // Relasi ke Facilities
          reportLog: true, // Log dari setiap laporan
        },
      },
      reportLog: {
        include: {
          laporan: true, // Relasi ke laporan yang diubah oleh user ini
        },
      },
    },
  });
  return users
}

export async function getTeknisiService() {
    return await prisma.user.findMany({
        where: {
            peran: "teknisi"
        },
        include: {
            reports: true,
            reportLog: true
        }
    });
}

export async function createUserServices(data: {  
  nama_pengguna: string,
  sandi: string,
  email: string,
  peran: $Enums.role
}) {
  return prisma.user.create({
    data,
  });
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where:{email},
  });

  if(!email){
    throw new AppError("email tidak ditemukan");
  }
  return user
}

export async function deleteUserServices(id_user: number){
  return prisma.user.delete({
    where: {
      id_user: id_user
    }
  });
}

// export async function updateUserServices(
//   id_user: number,
//   data: {
//     nama_pengguna: string,
//     sandi?: string | null,
//     email: string,
//     peran: $Enums.role
// }){
//   let updateData = {...data}

//   if(data.sandi){
//     updateData.sandi = await hashing(data.sandi);
//   }
  
//   return prisma.user.update({
//     where: {id_user},
//     data: updateData
//   });
// }