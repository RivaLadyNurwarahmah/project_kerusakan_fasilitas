import { Request, Response } from "express";
import { ResponseApiType, RequestWithUser } from "../types/api_types";
import { handlerAnyError } from "../errors/api_errors";
import { createReportServices, deleteReportServices, getAllReportService, updateReportStatusService, getReportStatisticsService, getReportsByStatusService, assignReportToTechnicianService, getAssignedReportsService, getMyReportsService } from "../services/report.services";

export async function getAllReportController(req: Request, res: Response<ResponseApiType>) {
    try {
        const report = await getAllReportService()

        return res.status(200).json({
            message: "Hallo",
            success: true,
            data: report
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function createReportController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id_pengguna, id_fasilitas, deskripsi, prioritas } = req.body;

        const file = req.file;

        const gambar = file?.filename;

        const report = await createReportServices({
            id_pengguna: Number(id_pengguna),
            id_fasilitas: Number(id_fasilitas),
            deskripsi,
            gambar,
            prioritas
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

export async function deleteReportController(req: Request, res: Response<ResponseApiType>) {
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

export async function updateReportStatusController(req: RequestWithUser, res: Response<ResponseApiType>) {
    try {
        const { id_report } = req.params;
        const { status, catatan } = req.body;
        const id_teknisi = req.user?.id_user; 

        if (!id_teknisi) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Teknisi tidak teridentifikasi"
            });
        }

        const reportId = Number(id_report);
        if (isNaN(reportId)) {
            return res.status(400).json({
                success: false,
                message: "ID laporan tidak valid"
            });
        }

        const updatedReport = await updateReportStatusService(reportId, status, id_teknisi, catatan);

        return res.status(200).json({
            message: "Status laporan berhasil diupdate",
            success: true,
            data: updatedReport
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}

export async function getReportStatisticsController(req: Request, res: Response<ResponseApiType>) {
    try {
        const statistics = await getReportStatisticsService();

        return res.status(200).json({
            message: "Statistik laporan berhasil diambil",
            success: true,
            data: statistics
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}

export async function getStatisticController(req: Request, res: Response<ResponseApiType>) {
    try {
        const statistics = await getReportStatisticsService();

        return res.status(200).json({
            message: "Statistik laporan berhasil diambil",
            success: true,
            data: statistics
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}

export async function getReportsByStatusController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { status } = req.params;
        if (!['diverifikasi', 'diproses', 'dilaporkan'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status tidak valid"
            });
        }

        const reports = await getReportsByStatusService(status as 'diverifikasi' | 'diproses' | 'dilaporkan');

        return res.status(200).json({
            message: "Data laporan berhasil diambil",
            success: true,
            data: reports
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}
export async function assignReportToTechnicianController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id_report } = req.params;
        const { id_teknisi } = req.body;

        const reportId = Number(id_report);
        if (isNaN(reportId)) {
            return res.status(400).json({
                success: false,
                message: "ID laporan tidak valid"
            });
        }

        const teknisiId = Number(id_teknisi);
        if (isNaN(teknisiId)) {
            return res.status(400).json({
                success: false,
                message: "ID teknisi tidak valid"
            });
        }

        const updatedReport = await assignReportToTechnicianService(reportId, teknisiId);

        return res.status(200).json({
            message: "Laporan berhasil ditugaskan ke teknisi",
            success: true,
            data: updatedReport
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}


export async function getAssignedReportsController(req: RequestWithUser, res: Response<ResponseApiType>) {
    try {
        const id_teknisi = req.user?.id_user;

        if (!id_teknisi) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Teknisi tidak teridentifikasi"
            });
        }

        const reports = await getAssignedReportsService(id_teknisi);

        return res.status(200).json({
            message: "Data laporan yang ditugaskan berhasil diambil",
            success: true,
            data: reports
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}


export async function getMyReportsController(req: RequestWithUser, res: Response<ResponseApiType>) {
    try {
        const id_pengguna = req.user?.id_user;

        if (!id_pengguna) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Pengguna tidak teridentifikasi"
            });
        }

        const reports = await getMyReportsService(id_pengguna);

        return res.status(200).json({
            message: "Data laporan berhasil diambil",
            success: true,
            data: reports
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}

import { getReportByIdService } from '../services/report.services';

export async function getReportByIdController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id_report } = req.params;
        const report = await getReportByIdService(Number(id_report));
        if (!report) {
            return res.status(404).json({ success: false, message: "Laporan tidak ditemukan" });
        }
        return res.status(200).json({
            message: "Data laporan berhasil diambil",
            success: true,
            data: report
        });
    } catch (error) {
        return handlerAnyError(error, res);
    }
}
