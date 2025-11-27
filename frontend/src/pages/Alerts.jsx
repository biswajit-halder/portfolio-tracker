import { useState, useEffect } from 'react';
import { Bell, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { alertService } from '../services/alertService';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Alerts() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = async () => {
        try {
            const data = await alertService.getAlerts();
            setAlerts(data);
        } catch (error) {
            console.error('Failed to fetch alerts:', error);
        }
        setLoading(false);
    };

    const handleDeleteAlert = async (alertId) => {
        try {
            await alertService.deleteAlert(alertId);
            setAlerts(alerts.filter(alert => alert._id !== alertId));
        } catch (error) {
            console.error('Failed to delete alert:', error);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(value);
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex items-center justify-center min-h-96">
                    <LoadingSpinner size="lg" />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center mb-6">
                <Bell className="h-6 w-6 text-purple-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-900">Price Alerts</h1>
            </div>

            {alerts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No price alerts set</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {alerts.map((alert) => (
                        <div key={alert._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900 mr-2">
                                            {alert.symbol}
                                        </h3>
                                        <span className={`flex items-center px-2 py-1 rounded-full text-xs ${
                                            alert.type === 'above' 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-red-100 text-red-700'
                                        }`}>
                                            {alert.type === 'above' ? (
                                                <TrendingUp className="h-3 w-3 mr-1" />
                                            ) : (
                                                <TrendingDown className="h-3 w-3 mr-1" />
                                            )}
                                            {alert.type === 'above' ? 'Above' : 'Below'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-600">Target Price</p>
                                            <p className="font-semibold">{formatCurrency(alert.targetPrice)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Set at Price</p>
                                            <p className="font-semibold">{formatCurrency(alert.currentPrice)}</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeleteAlert(alert._id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                                    title="Delete Alert"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}