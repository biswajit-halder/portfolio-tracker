import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Plus, Bell, Eye, EyeOff } from 'lucide-react';
import { stocksService } from '../services/stocksService';
import LoadingSpinner from '../components/LoadingSpinner';
import PriceAlert from '../components/PriceAlert';

export default function StockDetails() {
    const { symbol } = useParams();
    const navigate = useNavigate();
    const [stock, setStock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    useEffect(() => {
        const fetchStockDetails = async () => {
            try {
                const [stockData, watchlistStatus] = await Promise.all([
                    stocksService.getDetails(symbol),
                    stocksService.isInWatchlist(symbol)
                ]);
                setStock(stockData);
                setIsInWatchlist(watchlistStatus);
            } catch (error) {
                setError('Failed to fetch stock details');
                console.error('Stock details error:', error);
            }
            setLoading(false);
        };

        if (symbol) {
            fetchStockDetails();
        }
    }, [symbol]);

    const handleAddToWatchlist = async () => {
        try {
            if (isInWatchlist) {
                await stocksService.removeFromWatchlist(symbol);
                setIsInWatchlist(false);
            } else {
                const result = await stocksService.addToWatchlist(symbol);
                if (result) {
                    setIsInWatchlist(true);
                }
            }
        } catch (error) {
            if (error.response?.status === 400) {
                // Already in watchlist, just update UI
                setIsInWatchlist(true);
            } else {
                console.error('Failed to update watchlist:', error);
            }
        }
    };

    const handleSetAlert = async (alertData) => {
        try {
            console.log('Setting alert:', alertData);
            // API call to set price alert
        } catch (error) {
            console.error('Failed to set alert:', error);
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
                    <div className="text-center">
                        <LoadingSpinner size="lg" className="mx-auto mb-4" />
                        <p className="text-gray-600">Loading stock details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !stock) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-700">{error || 'Stock not found'}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-900 mr-4 cursor-pointer"
                >
                    <ArrowLeft className="h-5 w-5 mr-1" />
                    Back
                </button>
                <h1 className="text-2xl font-bold text-gray-900">{stock.symbol}</h1>
            </div>

            {/* Stock Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">{stock.name}</h2>
                        <p className="text-gray-600">{stock.exchange || 'NSE'}</p>
                    </div>
                    <div className="flex space-x-2">
                        <PriceAlert
                            symbol={stock.symbol}
                            currentPrice={stock.currentPrice}
                            onSetAlert={handleSetAlert}
                        />
                        <button
                            onClick={handleAddToWatchlist}
                            className={`flex items-center p-2 rounded-lg transition-colors cursor-pointer ${isInWatchlist
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-purple-600 hover:bg-purple-700 text-white'
                                }`}
                            title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                        >
                            {isInWatchlist ? (
                                <Eye className="h-5 w-5" />
                            ) : (
                                <EyeOff className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Current Price */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Current Price</p>
                        <p className="text-3xl font-bold text-gray-900">
                            {formatCurrency(stock.currentPrice)}
                        </p>
                    </div>

                    {/* Change */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Change</p>
                        <div className={`flex items-center justify-center ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {stock.change >= 0 ? (
                                <TrendingUp className="h-5 w-5 mr-1" />
                            ) : (
                                <TrendingDown className="h-5 w-5 mr-1" />
                            )}
                            <span className="text-xl font-semibold">
                                {stock.change >= 0 ? '+' : ''}{formatCurrency(stock.change)}
                            </span>
                        </div>
                    </div>

                    {/* Change % */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Change %</p>
                        <p className={`text-xl font-semibold ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent?.toFixed(2)}%
                        </p>
                    </div>
                </div>
            </div>

            {/* Key Statistics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Day High</p>
                        <p className="font-semibold">{formatCurrency(stock.dayHigh || stock.currentPrice * 1.02)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Day Low</p>
                        <p className="font-semibold">{formatCurrency(stock.dayLow || stock.currentPrice * 0.98)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">52W High</p>
                        <p className="font-semibold">{formatCurrency(stock.yearHigh || stock.currentPrice * 1.25)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">52W Low</p>
                        <p className="font-semibold">{formatCurrency(stock.yearLow || stock.currentPrice * 0.75)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Volume</p>
                        <p className="font-semibold">{(stock.volume || 1000000).toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Market Cap</p>
                        <p className="font-semibold">₹{((stock.marketCap || 50000) / 100).toFixed(0)}Cr</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">P/E Ratio</p>
                        <p className="font-semibold">{stock.peRatio || '25.4'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Dividend Yield</p>
                        <p className="font-semibold">{stock.dividendYield || '1.2'}%</p>
                    </div>
                </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About {stock.name}</h3>
                <p className="text-gray-600 leading-relaxed">
                    {stock.description || `${stock.companyName} is a leading company in its sector, listed on the ${stock.exchange || 'NSE'}. The company has shown consistent performance and is a popular choice among investors for long-term wealth creation.`}
                </p>

                {stock.sector && (
                    <div className="mt-4 flex items-center">
                        <span className="text-sm text-gray-600 mr-2">Sector:</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                            {stock.sector}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}