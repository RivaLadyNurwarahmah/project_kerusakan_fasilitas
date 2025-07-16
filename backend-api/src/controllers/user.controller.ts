import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { handlerAnyError } from "../errors/api_errors";
import { createUserServices, deleteUserServices, getAllUserService, updateUserServices } from "../services/user.services";
import { getTeknisiService } from "../services/user.services";

export async function getAllUserController(req: Request, res: Response<ResponseApiType>) {
    try {
        const user = await getAllUserService()

        return res.status(200).json({
            message: "data berhasil",
            success: true,
            data: user
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function getTeknisiController(req: Request, res: Response<ResponseApiType>) {
    try {
        const teknisi = await getTeknisiService();
        res.status(200).json({
            message: "data teknisi berhasil diambil",
            success: true,
            data: teknisi
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Gagal mengambil data teknisi" });
    }
}

export async function createUserController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { nama_pengguna, sandi, email, peran } = req.body;

        const user = await createUserServices({
            nama_pengguna,
            sandi,
            email,
            peran
        });

        return res.status(201).json({
            message: "Pengguna berhasil dibuat",
            success: true,
            data: user,
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function deleteUserController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id_user } = req.params;

        const userId = Number(id_user);
        if (isNaN(userId)) {
            return res.status(400).json({
                success: false,
                message: "ID pengguna tidak valid"
            });
        }

        await deleteUserServices(userId);

        return res.status(200).json({
            message: "Data berhasil dihapus",
            success: true,
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function updateUserController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id_user } = req.params;

        const userId = Number(id_user);
        if (isNaN(userId)) {
            return res.status(400).json({
                success: false,
                message: "ID pengguna tidak valid",
            });
        }

        const { nama_pengguna, email, sandi, peran } = req.body;

        const updatedUser = await updateUserServices(
            userId, { nama_pengguna, email, sandi, peran }
        );

        return res.status(200).json({
            message: "Data pengguna berhasil diupdate",
            success: true,
            data: updatedUser
        })

    } catch (error) {
        return handlerAnyError(error, res)
    }
}