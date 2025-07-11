import { Router } from "express";
import { createReportController, deleteReportController, getAllReportController } from "../controllers/report.controller";
import { upload } from "../utils/multer";

const reportRouter = Router()

reportRouter.get('/', getAllReportController)
reportRouter.post('/create', createReportController)
reportRouter.post('/', upload.single('gambar'), createReportController)
reportRouter.delete('/:id_report', deleteReportController)

export default reportRouter