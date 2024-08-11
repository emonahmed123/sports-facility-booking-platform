import  express  from "express";
import validateRequest from "../../middleware/validateRequest";
import { userValidationSchemas } from "./user.validation";
import { userController } from "./user.controller";

const router=express.Router()

router.post('/signup',validateRequest(userValidationSchemas.signupValidationSchema),userController.Createsignup)


export const userRoutes =router