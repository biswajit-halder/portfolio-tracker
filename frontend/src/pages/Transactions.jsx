import { useState, useEffect } from 'react';
import { Plus, Trash2, Filter, TrendingUp, TrendingDown, Calendar, Search } from 'lucide-react';
import { transactionsService } from '../services/transactionsService';
import { stocksService } from '../services/stocksService';

function getLabelText(key) {
    const labels = {
        symbol: 'Symbol',
        // Add other keys and translations as needed
    };
    return labels[key] || key;
}

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        symbol: '',
        type: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        fetchTransactions();
    }, [filters]);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const data = await transactionsService.getAll(filters);
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTransaction = async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                await transactionsService.delete(id);
                fetchTransactions();
            } catch (error) {
                console.error('Error deleting transaction:', error);
            }
        }
    };

    const clearFilters = () => {
        setFilters({
            symbol: '',
            type: '',
            startDate: '',
            endDate: ''
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getTransactionStats = () => {
        const buyTransactions = transactions.filter(t => t.type === 'BUY');
        const sellTransactions = transactions.filter(t => t.type === 'SELL');

        const totalBought = buyTransactions.reduce((sum, t) => sum + (t.totalAmount || t.quantity * t.pricePerShare), 0);
        const totalSold = sellTransactions.reduce((sum, t) => sum + (t.totalAmount || t.quantity * t.pricePerShare), 0);

        return {
            totalTransactions: transactions.length,
            buyCount: buyTransactions.length,
            sellCount: sellTransactions.length,
            totalBought,
            totalSold
        };
    };

    const stats = getTransactionStats();

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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Transactions</h1>
                    <p className="text-gray-600">Track your trading history</p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Transaction
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Transactions</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalTransactions}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Buy Orders</p>
                            <p className="text-2xl font-bold text-green-600">{stats.buyCount}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Sell Orders</p>
                            <p className="text-2xl font-bold text-red-600">{stats.sellCount}</p>
                        </div>
                        <div className="bg-red-100 p-3 rounded-lg">
                            <TrendingDown className="h-6 w-6 text-red-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Net Amount</p>
                            <p className={`text-2xl font-bold ${stats.totalBought - stats.totalSold >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {formatCurrency(Math.abs(stats.totalBought - stats.totalSold))}
                            </p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <span className="text-2xl font-bold text-purple-600">₹</span>
                        </div>
                    </div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {getLabelText('symbol')}
                    </label>
                    <input
                        type="text"
                        value={filters.symbol}
                        onChange={(e) => setFilters({ ...filters, symbol: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., RELIANCE"
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-1">Symbol</label>
                    <input
                        type="text"
                        value={filters.symbol}
                        onChange={(e) => setFilters({ ...filters, symbol: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., RELIANCE"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        <option value="">All Types</option>
                        <option value="BUY">Buy</option>
                        <option value="SELL">Sell</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    )
}

{/* Transactions Table */ }
<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    {transactions.length === 0 ? (
        <div className="p-12 text-center">
            <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Calendar className="h-8 w-8 text-gray-400 mx-auto mt-1" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Transactions Found</h3>
            <p className="text-gray-600 mb-6">
                {Object.values(filters).some(f => f) ? 'No transactions match your filters.' : 'Start by adding your first transaction.'}
            </p>
            {!Object.values(filters).some(f => f) && (
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                    Add First Transaction
                </button>
            )}
        </div>
    ) : (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Symbol
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                        <tr key={transaction._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                {new Date(transaction.transactionDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900">{transaction.symbol}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${transaction.type === 'BUY'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {transaction.type}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                {transaction.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                {formatCurrency(transaction.pricePerShare)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                {formatCurrency(transaction.totalAmount || transaction.quantity * transaction.pricePerShare)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => handleDeleteTransaction(transaction._id)}
                                    className="text-red-600 hover:text-red-900 p-1"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )}
</div>

{/* Modal */ }
{
    showModal && (
        <TransactionModal
            onClose={() => setShowModal(false)}
            onSave={() => {
                setShowModal(false);
                fetchTransactions();
            }}
        />
    )
}
        </div >
    );
}

// Transaction Modal Component
function TransactionModal({ onClose, onSave }) {
    const [formData, setFormData] = useState({
        symbol: '',
        type: 'BUY',
        quantity: '',
        pricePerShare: '',
        transactionDate: new Date().toISOString().split('T')[0]
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
                pricePerShare: Number(formData.pricePerShare)
            };

            await transactionsService.create(data);
            onSave();
        } catch (error) {
            console.error('Error saving transaction:', error);
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
        <div className="fixed inset-0 bg-slate-500/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Add Transaction</h2>

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

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Transaction Type
                        </label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="BUY">Buy</option>
                            <option value="SELL">Sell</option>
                        </select>
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

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price per Share
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.pricePerShare}
                            onChange={(e) => setFormData({ ...formData, pricePerShare: e.target.value })}
                            required
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Price per share"
                        />
                    </div>

                    {/* Transaction Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Transaction Date
                        </label>
                        <input
                            type="date"
                            value={formData.transactionDate}
                            onChange={(e) => setFormData({ ...formData, transactionDate: e.target.value })}
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