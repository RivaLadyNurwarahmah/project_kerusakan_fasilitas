import { Request, Response } from "express";
import { handlerAnyError } from "../errors/api_errors";
import { createReportServices, deleteReportServices, getAllReportService } from "../services/report.services";
import { ResponseApiType } from "../types/api_types";

export async function getAllReportController(req:Request, res:Response<ResponseApiType>) {
    try {
        const report = await getAllReportService()

        return res.status(200).json({
            message : "Hallo",
            success : true,
            data : report
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function createReportController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id_pengguna, id_fasilitas, deskripsi, status } = req.body;        
        
        const file = req.file;

        const gambar = file?.filename;

        const report = await createReportServices({
            id_pengguna: Number(id_pengguna),
            id_fasilitas: Number(id_fasilitas),
            deskripsi,           
            gambar,
        });    

        return res.status(200).json({
            message: "Data berhasil ditambahkan",
            success: true,
            data: report
        })
    } catch (error) {
        console.error("CREATE REPORT ERROR:", error);        
        return handlerAnyError(error, res)
    }
}

export async function deleteReportController(req: Request, res: Response<ResponseApiType>){
    try {
        const { id_report } = req.params;
  
        const reportID = Number(id_report);
        if (isNaN(reportID)) {
            return res.status(400).json({
                success: false,
                message: "ID report tidak valid"
            });
        }
        
        await deleteReportServices(reportID);      
        
        return res.status(200).json({
            message: "Data berhasil dihapus",
            success: true,            
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
  }
  