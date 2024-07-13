import { Router } from "express";
import {login,register, logout, profile} from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {registerSchema, loginSchema} from "../schemas/auth.schema.js";

const router = Router();

//POST localhost:4000/api/register
router.post('/register',validateSchema(registerSchema),register);
//POST localhost:4000/api/login
router.post('/login',validateSchema(loginSchema), login);

router.post('/logout', logout)

router.get("/profile",authRequired, profile)

export default router;

