import { useState, useEffect } from 'react';
import { Plus, Search, TrendingUp, TrendingDown } from 'lucide-react';
import { stocksService } from '../services/stocksService';

export default function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const fetchWatchlist = async () => {
        try {
            const data = await stocksService.getWatchlist();
            setWatchlist(data);
        } catch (error) {
            console.error('Failed to fetch watchlist:', error);
        }
        setLoading(false);
    };

    const searchStocks = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }
        setSearching(true);
        try {
            const results = await stocksService.searchStocks(query);
            setSearchResults(results);
        } catch (error) {
            console.error('Search failed:', error);
        }
        setSearching(false);
    };

    const addToWatchlist = async (symbol) => {
        try {
            await stocksService.addToWatchlist(symbol);
            fetchWatchlist();
            setSearchQuery('');
            setSearchResults([]);
        } catch (error) {
            console.error('Failed to add to watchlist:', error);
        }
    };

    const removeFromWatchlist = async (symbol) => {
        try {
            await stocksService.removeFromWatchlist(symbol);
            setWatchlist(watchlist.filter(item => item.symbol !== symbol));
        } catch (error) {
            console.error('Failed to remove from watchlist:', error);
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
            <div className="max-w-6xl mx-auto p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-12 bg-gray-300 rounded"></div>
                    <div className="space-y-3">
                        {[1,2,3].map(i => (
                            <div key={i} className="h-16 bg-gray-300 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Watchlist</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search stocks to add to watchlist..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            searchStocks(e.target.value);
                        }}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {searchResults.length > 0 && (
                    <div className="mt-4 border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
                        {searchResults.map((stock) => (
                            <div key={stock.symbol} className="flex items-center justify-between p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                                <div>
                                    <div className="font-medium text-gray-900">{stock.symbol}</div>
                                    <div className="text-sm text-gray-500">{stock.name}</div>
                                </div>
                                <button
                                    onClick={() => addToWatchlist(stock.symbol)}
                                    className="flex items-center px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Your Watchlist</h2>
                </div>

                {watchlist.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <TrendingUp className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No stocks in watchlist</h3>
                        <p className="text-gray-500">Search and add stocks to track their performance</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {watchlist.map((stock) => (
                            <div key={stock.symbol} className="p-6 flex items-center justify-between hover:bg-gray-50">
                                <div className="flex-1">
                                    <div className="flex items-center">
                                        <div>
                                            <div className="font-semibold text-gray-900">{stock.symbol}</div>
                                            <div className="text-sm text-gray-500">{stock.name}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <div className="text-right">
                                        <div className="font-semibold text-gray-900">
                                            {formatCurrency(stock.currentPrice)}
                                        </div>
                                        <div className={`flex items-center text-sm ${
                                            stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {stock.change >= 0 ? (
                                                <TrendingUp className="h-4 w-4 mr-1" />
                                            ) : (
                                                <TrendingDown className="h-4 w-4 mr-1" />
                                            )}
                                            {stock.change >= 0 ? '+' : ''}{stock.changePercent?.toFixed(2)}%
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFromWatchlist(stock.symbol)}
                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}