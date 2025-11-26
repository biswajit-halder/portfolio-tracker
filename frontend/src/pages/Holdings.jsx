import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, TrendingUp, TrendingDown } from 'lucide-react';
import { holdingsService } from '../services/holdingsService';
import { stocksService } from '../services/stocksService';

export default function Holdings() {
    const [holdings, setHoldings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingHolding, setEditingHolding] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchHoldings();
    }, []);

    const fetchHoldings = async () => {
        try {
            setLoading(true);
            const data = await holdingsService.getAll();
            setHoldings(data);
        } catch (error) {
            console.error('Error fetching holdings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddHolding = () => {
        setEditingHolding(null);
        setShowModal(true);
    };

    const handleEditHolding = (holding) => {
        setEditingHolding(holding);
        setShowModal(true);
    };

    const handleDeleteHolding = async (id) => {
        if (window.confirm('Are you sure you want to delete this holding?')) {
            try {
                await holdingsService.delete(id);
                fetchHoldings();
            } catch (error) {
                console.error('Error deleting holding:', error);
            }
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const filteredHoldings = holdings.filter(holding =>
        holding.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-64 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Holdings</h1>
                    <p className="text-gray-600">Manage your stock investments</p>
                </div>
                <button
                    onClick={handleAddHolding}
                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Holding
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search holdings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Holdings Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {filteredHoldings.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                            <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mt-1" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Holdings Found</h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm ? 'No holdings match your search.' : 'Start by adding your first holding.'}
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={handleAddHolding}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Add First Holding
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Symbol
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quantity
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Avg Cost
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Investment
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Purchase Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredHoldings.map((holding) => (
                                    <tr key={holding._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{holding.symbol}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {holding.quantity}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {formatCurrency(holding.averageCostPerShare)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {formatCurrency(holding.quantity * holding.averageCostPerShare)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {new Date(holding.purchaseDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEditHolding(holding)}
                                                    className="text-purple-600 hover:text-purple-900 p-1"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteHolding(holding._id)}
                                                    className="text-red-600 hover:text-red-900 p-1"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <HoldingModal
                    holding={editingHolding}
                    onClose={() => setShowModal(false)}
                    onSave={() => {
                        setShowModal(false);
                        fetchHoldings();
                    }}
                />
            )}
        </div>
    );
}

// Holding Modal Component
function HoldingModal({ holding, onClose, onSave }) {
    const [formData, setFormData] = useState({
        symbol: holding?.symbol || '',
        quantity: holding?.quantity || '',
        averageCostPerShare: holding?.averageCostPerShare || '',
        purchaseDate: holding?.purchaseDate ? new Date(holding.purchaseDate).toISOString().split('T')[0] : ''
    });
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [showSearch, setShowSearch] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                ...formData,
                quantity: Number(formData.quantity),
                averageCostPerShare: Number(formData.averageCostPerShare)
            };

            if (holding) {
                await holdingsService.update(holding._id, data);
            } else {
                await holdingsService.create(data);
            }
            onSave();
        } catch (error) {
            console.error('Error saving holding:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStockSearch = async (query) => {
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }

        try {
            const results = await stocksService.search(query);
            setSearchResults(results);
        } catch (error) {
            console.error('Error searching stocks:', error);
        }
    };

    const selectStock = (stock) => {
        setFormData({ ...formData, symbol: stock.symbol });
        setSearchResults([]);
        setShowSearch(false);
    };

    return (
        <div className="fixed inset-0 bg-slate-500/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {holding ? 'Edit Holding' : 'Add Holding'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Symbol */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stock Symbol
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.symbol}
                                onChange={(e) => {
                                    setFormData({ ...formData, symbol: e.target.value });
                                    handleStockSearch(e.target.value);
                                    setShowSearch(true);
                                }}
                                onFocus={() => setShowSearch(true)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="e.g., RELIANCE"
                            />
                            {showSearch && searchResults.length > 0 && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                                    {searchResults.map((stock, index) => (
                                        <div
                                            key={index}
                                            onClick={() => selectStock(stock)}
                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <div className="font-medium">{stock.symbol}</div>
                                            <div className="text-sm text-gray-600">{stock.companyName}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity
                        </label>
                        <input
                            type="number"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            required
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Number of shares"
                        />
                    </div>

                    {/* Average Cost */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Average Cost per Share
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.averageCostPerShare}
                            onChange={(e) => setFormData({ ...formData, averageCostPerShare: e.target.value })}
                            required
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Price per share"
                        />
                    </div>

                    {/* Purchase Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Purchase Date
                        </label>
                        <input
                            type="date"
                            value={formData.purchaseDate}
                            onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}