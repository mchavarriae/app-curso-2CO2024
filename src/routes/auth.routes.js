import { Router } from "express";
import {login,register, logout, profile} from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

//POST localhost:4000/api/register
router.post('/register',register);
//POST localhost:4000/api/login
router.post('/login',login);

router.post('/logout', logout)

router.get("/profile",authRequired, profile)

export default router;

