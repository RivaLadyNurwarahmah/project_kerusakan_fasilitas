import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { AppError, handlerAnyError } from "../errors/api_errors";
import { createUserServices, getUserByEmail } from "../services/user.services";
import { hashing, verifyHash } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

export async function LoginController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { email, sandi } = req.body;

        const user = await getUserByEmail(email);        
    
        const check = await verifyHash(sandi, user?.sandi!)
        if(!check)
            throw new AppError("Sandi salah");
        
        const token = await generateToken(user!);

        return res.status(200).json({
            message: "Login berhasil",
            success: true,
            data: {token, user}
        })

    } catch (error) {
        return handlerAnyError(error, res);
    }    
}

export async function RegisterController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { nama_pengguna, sandi, email, peran } = req.body;

        const sandiHashing = await hashing(sandi)

        const user = await createUserServices({
            nama_pengguna, 
            sandi: sandiHashing!, 
            email, 
            peran
        });

        return res.status(200).json({
            message: "Data berhasil ditambahkan",
            success: true,
            data: user,
        })
    } catch (error) {       
        return handlerAnyError(error, res)
    }
}