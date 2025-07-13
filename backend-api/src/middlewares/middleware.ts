import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

// Middleware dasar: verifikasi token dan masukkan user ke req
export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded || typeof decoded !== "object") {
    return res.status(401).json({ message: "Token tidak valid" });
  }

  // @ts-ignore
  req.user = decoded;
  next();
};

export const requireAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // @ts-ignore
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Hanya admin yang boleh mengakses" });
    }
    next();
  };

  export const requireTeknisi = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // @ts-ignore
    if (req.user?.role !== "teknisi") {
      return res.status(403).json({ message: "Hanya teknisi yang boleh mengakses" });
    }
    next();
  };

  export const requireUmum = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // @ts-ignore
    if (req.user?.role !== "umum") {
      return res.status(403).json({ message: "Hanya pengguna umum yang boleh mengakses" });
    }
    next();
  };
  