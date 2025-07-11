import { Router } from "express";
import { createFacilitiesController, deleteFacilitiesController, getAllFacilitiesController } from "../controllers/facilities.controller";

const facilitiesRouter = Router()

facilitiesRouter.get('/', getAllFacilitiesController)
facilitiesRouter.post('/create', createFacilitiesController)
facilitiesRouter.delete('/:id_facilities', deleteFacilitiesController)

export default facilitiesRouter