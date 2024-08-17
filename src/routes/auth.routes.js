import { Router} from "express";
import { login, register, logout, profile, verify, verifyAccount } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Ruta para registrar un nuevo usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para cerrar sesión
router.post('/logout', logout);

// Ruta para verificar la cuenta usando el token en la URL
router.get('/auth/verify', verify);

// Ruta para verificar el correo
router.get('/verify/:token', verifyAccount);

// Ruta para obtener el perfil del usuario, requiere autenticación
router.get('/profile', authRequired, profile);

export default router;