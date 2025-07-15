import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { createFacilitiesService, deleteFacilitiesServices, getAllFacilitiesService } from "../services/facilities.services";
import { handlerAnyError } from "../errors/api_errors";

export async function getAllFacilitiesController(req: Request, res: Response<ResponseApiType>) {
  try {
    const facilities = await getAllFacilitiesService();

    return res.status(200).json({
      message: "Hallo",
      success: true,
      data: facilities,
    });
  } catch (error) {
    return handlerAnyError(error, res);
  }
}

export async function createFacilitiesController(req: Request, res: Response<ResponseApiType>) {
  try {
    const {nama, kode, lokasi, jenis, deskripsi, prioritas} = req.body;

    const facilities = await createFacilitiesService({
      nama, 
      kode,
      lokasi,
      jenis,
      deskripsi,
      prioritas
    });
    
    return res.status(200).json({
      message: "Data berhasil ditambahkan",
      success: true,
      data: facilities
    })
  } catch (error) {
    return handlerAnyError(error, res)
  }
}

export async function deleteFacilitiesController(req: Request, res: Response<ResponseApiType>){
  try {
      const { id_facilities } = req.params;

      const fasilId = Number(id_facilities);
      if (isNaN(fasilId)) {
          return res.status(400).json({
              success: false,
              message: "ID fasilitas tidak valid"
          });
      }
      
      await deleteFacilitiesServices(fasilId);      
      
      return res.status(200).json({
          message: "Data berhasil dihapus",
          success: true,            
      })
  } catch (error) {
      return handlerAnyError(error, res)
  }
}

export async function assignFacilitiesController(req: Request, res: Response<ResponseApiType>) {
  try {
    const { id_facilities } = req.params;
    const fasilId = Number(id_facilities);

    if (isNaN(fasilId)) {
      return res.status(400).json({
        success: false,
        message: "ID fasilitas tidak valid",
      });
    }

    const teknisiId = 1; // ID teknisi default

    const assignedFacility = await assignFacilitiesService(fasilId, teknisiId);

    return res.status(200).json({
      message: "Fasilitas berhasil ditugaskan ke teknisi.",
      success: true,
      data: assignedFacility,
    });
  } catch (error) {
    return handlerAnyError(error, res);
  }
}
