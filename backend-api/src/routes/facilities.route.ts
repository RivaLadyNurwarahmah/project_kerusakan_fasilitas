import { Router } from "express";
import { createFacilitiesController, deleteFacilitiesController, getAllFacilitiesController, getUrgentFacilitiesController, updateFacilitiesController } from "../controllers/facilities.controller";

const facilitiesRouter = Router()

facilitiesRouter.get('/', getAllFacilitiesController)
facilitiesRouter.get('/urgent', getUrgentFacilitiesController)
facilitiesRouter.post('/', createFacilitiesController)
facilitiesRouter.put('/:id_facilities', updateFacilitiesController)
facilitiesRouter.delete('/:id_facilities', deleteFacilitiesController)

export default facilitiesRouter