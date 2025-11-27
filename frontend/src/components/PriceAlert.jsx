import { useState } from 'react';
import { Bell, X } from 'lucide-react';

export default function PriceAlert({ symbol, currentPrice, onSetAlert }) {
    const [showForm, setShowForm] = useState(false);
    const [alertPrice, setAlertPrice] = useState('');
    const [alertType, setAlertType] = useState('above');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSetAlert({
            symbol,
            targetPrice: parseFloat(alertPrice),
            type: alertType,
            currentPrice
        });
        setShowForm(false);
        setAlertPrice('');
    };

    if (!showForm) {
        return (
            <button
                onClick={() => setShowForm(true)}
                className="flex items-center px-2 py-1 text-xs text-gray-600 hover:text-purple-600 transition-colors"
            >
                <Bell className="h-3 w-3 mr-1" />
                Alert
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Set Price Alert</h3>
                    <button onClick={() => setShowForm(false)}>
                        <X className="h-5 w-5 text-gray-400" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stock: {symbol}
                        </label>
                        <p className="text-sm text-gray-500">
                            Current Price: ₹{currentPrice?.toFixed(2)}
                        </p>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Alert Type
                        </label>
                        <select
                            value={alertType}
                            onChange={(e) => setAlertType(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="above">Price goes above</option>
                            <option value="below">Price goes below</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Target Price (₹)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={alertPrice}
                            onChange={(e) => setAlertPrice(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    
                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                        >
                            Set Alert
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}