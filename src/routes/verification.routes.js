import { Router } from 'express';
import UserAccountVerificationLog from '../models/userAccountVerificationLog.js';

const router = Router();

// Ruta para obtener los logs de verificación de cuentas con filtrado por fechas
router.get('/verification-logs', async (req, res) => {
    const { startDate, endDate } = req.query;
    const query = {};

    if (startDate) {
        query.emailSentDate = { $gte: new Date(startDate) };
    }

    if (endDate) {
        query.emailSentDate = { ...query.emailSentDate, $lte: new Date(endDate) };
    }

    try {
        const logs = await UserAccountVerificationLog.find(query).populate('user');
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;