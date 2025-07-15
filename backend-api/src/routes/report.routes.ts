import { Request, Response, Router } from "express";
import { createReportController, deleteReportController, getAllReportController, updateReportStatusController, getReportStatisticsController, getReportsByStatusController, getStatisticController } from "../controllers/report.controller";
import { upload } from "../utils/multer";
import { prisma } from "../configs/prisma";
import { jwtCheckToken } from "../middlewares/jwt_check_token";

const reportRouter = Router()

reportRouter.get('/', getAllReportController)
reportRouter.get("/statsistics", getStatisticController)
reportRouter.post('/create', createReportController)
reportRouter.post('/', upload.single('gambar'), createReportController)
reportRouter.delete('/:id_report', deleteReportController)
reportRouter.put('/:id_report/status', jwtCheckToken, updateReportStatusController)
// reportRouter.get('/statistics', jwtCheckToken, getReportStatisticsController)
reportRouter.get('/by-status/:status', jwtCheckToken, getReportsByStatusController)
reportRouter.get("/user/:id", async (req: Request, res: Response) => {   
        const id_pengguna = Number(req.params.id); 
      
        try {
          const laporan = await prisma.report.findMany({
            where: { id_pengguna: id_pengguna },
            include: {
              fasilitas: true,
            },
            orderBy: {
              tanggal_laporan: 'desc',
            },
          });
      
          res.json({ success: true, data: laporan });
        } catch (err) {
          console.error(err);
          res.status(500).json({ success: false, message: 'Gagal mengambil laporan' });
        }
      });

export default reportRouter