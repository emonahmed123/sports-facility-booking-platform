import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { facilityValidations } from './facility.validation'
import { FacilityController } from './facility.controller'

const router=express.Router()

router.post('/',validateRequest(facilityValidations.facilityValidationSchema),FacilityController.creatFacility )



export const facilityRouter= router