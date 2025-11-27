import PriceAlert from '../models/PriceAlert.js';

export const createAlert = async (req, res) => {
    try {
        const { symbol, targetPrice, type, currentPrice } = req.body;
        
        const alert = new PriceAlert({
            userId: req.user.id,
            symbol,
            targetPrice,
            type,
            currentPrice
        });
        
        await alert.save();
        res.status(201).json(alert);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create alert', error: error.message });
    }
};

export const getAlerts = async (req, res) => {
    try {
        const alerts = await PriceAlert.find({ 
            userId: req.user.id,
            isActive: true 
        }).sort({ createdAt: -1 });
        
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch alerts', error: error.message });
    }
};

export const deleteAlert = async (req, res) => {
    try {
        await PriceAlert.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });
        
        res.json({ message: 'Alert deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete alert', error: error.message });
    }
};