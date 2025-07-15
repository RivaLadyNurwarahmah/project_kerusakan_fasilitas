import { Request } from "express";

export interface ResponseApiType {
    success: boolean,
    message: string,
    data?: Object,
    errors?: Object
}

export interface RequestWithUser extends Request {
    user?: {
        id_user: number;
        peran: string;
    };
}