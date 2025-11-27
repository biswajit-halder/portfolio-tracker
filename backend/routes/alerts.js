import express from 'express';
import { createAlert, getAlerts, deleteAlert } from '../controllers/alertController.js';
import { protect } from '../middleware/authMiddleware.js';

const alertRoutes = express.Router();

alertRoutes.post('/', protect, createAlert);
alertRoutes.get('/', protect, getAlerts);
alertRoutes.delete('/:id', protect, deleteAlert);

export default alertRoutes;