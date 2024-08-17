import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from '../libs/mailer.js';
import UserAccountVerificationLog from '../models/userAccountVerificationLog.js';
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(["The email is already registered"]);
        
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: passwordHash });
        const userSaved = await newUser.save();
        
        // Generar un token de acceso
        const token = await createAccessToken({ id: userSaved._id });

        // Enviar el correo de verificación
        await sendVerificationEmail(email, token);

        // Crear un registro de verificación de cuenta
        const logEntry = new UserAccountVerificationLog({
            user: userSaved._id,
            emailSentDate: new Date(),
        });
        await logEntry.save();

        // Configurar la cookie con el token
        res.cookie("token", token);

        // Responder con los detalles del usuario
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Método para verificar la cuenta
export const verifyAccount = async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(400).send({ message: 'Invalid token' });

        user.isVerified = true;
        await user.save();

        await UserAccountVerificationLog.findOneAndUpdate(
            { user: user._id },
            { verificationDate: new Date() }
        );

        res.status(200).send({ message: 'Cuenta Verificada Correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await User.findOne({ email: email });

        if (!userFound) {
            return res.status(404).json(["The email doesn't exist"]);
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json(["The password is incorrect"]);
        }

        const token = await createAccessToken({ id: userFound._id, username: userFound.username });
        res.cookie("token", token, {
            httpOnly: false,
            secure: true,
            sameSite: "none"
        });

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });


    } catch (error) {
        console.error(error);
        res.status(500).json([error.message]);
    }

}

export const logout = async (req, res) => {
    res.cookie("token", "");
    return res.send(200);
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);
    if (!userFound) {
        return res.status(400).json({ message: "User not found" });
    }
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
}

export const verify = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });

        const userFound = await User.findById(user.id);

        if (!userFound) return res.status(401).json({ message: "Unauthorized" });

        return res.json({ id: userFound._id });

    });
}