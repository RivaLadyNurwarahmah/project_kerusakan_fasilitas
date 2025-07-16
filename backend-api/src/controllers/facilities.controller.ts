import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { handlerAnyError } from "../errors/api_errors";
import {
  getAllFacilitiesService,
  createFacilitiesService,
  deleteFacilitiesServices,
  updateFacilitiesServices,
  getUrgentFacilitiesService
} from "../services/facilities.services";
import { error } from "node:console";

export async function getAllFacilitiesController(req: Request, res: Response<ResponseApiType>) {
  try {
    const facilities = await getAllFacilitiesService();
    return res.status(200).json({
      message: "Data fasilitas berhasil diambil",
      success: true,
      data: facilities
    });
  } catch (error) {
    return handlerAnyError(error, res);
  }
}

export async function getUrgentFacilitiesController(req: Request, res: Response<ResponseApiType>) {
  try {
    const facilities = await getUrgentFacilitiesService();
    return res.status(200).json({
      message: "Data fasilitas urgent berhasil diambil",
      success: true,
      data: facilities
    });
  } catch (error) {
    return handlerAnyError(error, res);
  }
}

export async function createFacilitiesController(req: Request, res: Response<ResponseApiType>) {
  try {
    const facilities = await createFacilitiesService(req.body);
    console.log(error);
    
    return res.status(201).json({
      message: "Fasilitas berhasil dibuat",
      success: true,
      data: facilities
    });
  } catch (error) {
    return handlerAnyError(error, res);
  }
}

export async function deleteFacilitiesController(req: Request, res: Response<ResponseApiType>) {
  try {
    const { id_facilities } = req.params;
    await deleteFacilitiesServices(Number(id_facilities));
    return res.status(200).json({
      message: "Fasilitas berhasil dihapus",
      success: true
    });
  } catch (error) {
    return handlerAnyError(error, res);
  }
}

export async function updateFacilitiesController(req: Request, res: Response<ResponseApiType>) {
  try {
    const { id_facilities } = req.params;
    const facilities = await updateFacilitiesServices(Number(id_facilities), req.body);
    return res.status(200).json({
      message: "Fasilitas berhasil diupdate",
      success: true,
      data: facilities
    });
  } catch (error) {
    return handlerAnyError(error, res);
  }
}
