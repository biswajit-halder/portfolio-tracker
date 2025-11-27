import { useState, useEffect, memo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Percent, Award, AlertTriangle } from 'lucide-react';
import { portfolioService } from '../services/portfolioService';
import { useAuth } from '../context/AuthContext';
import PortfolioChart from '../components/Charts/PortfolioChart';
import AllocationChart from '../components/Charts/AllocationChart';
import LoadingSpinner from '../components/LoadingSpinner';

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [performanceData, setPerformanceData] = useState([]);
    const [performanceLoading, setPerformanceLoading] = useState(true);
    const [portfolioData, setPortfolioData] = useState(null);
    const { user } = useAuth();

    const handleRetry = () => {
        window.location.reload();
    };

    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                setLoading(true);
                console.log('Token:', localStorage.getItem('token')); // Debug
                const data = await portfolioService.getSummary();
                setPortfolioData(data);
            } catch (error) {
                console.error('Portfolio API Error:', error.response); // Debug
                setError(error.response?.data?.message || 'Failed to fetch portfolio data');
            } finally {
                setLoading(false);
            }
        };

        const fetchPerformanceData = async () => {
            try {
                setPerformanceLoading(true);
                const data = await portfolioService.getPerformance();
                setPerformanceData(data.performanceData || []);
            } catch (error) {
                console.error('Performance API Error:', error);
            } finally {
                setPerformanceLoading(false);
            }
        };

        fetchPortfolioData();
        fetchPerformanceData();
    }, [setPortfolioData]);

    if (loading) {
        return (
            <div className="p-8 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-center min-h-96">
                    <div className="text-center">
                        <LoadingSpinner size="lg" className="mx-auto mb-4" />
                        <p className="text-gray-600">Loading dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                        <p className="text-red-700">{error}</p>
                    </div>
                    <button
                        onClick={handleRetry}
                        className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatPercent = (percent) => {
        return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {user?.name}!
                </h1>
                <p className="text-gray-600">Here's your portfolio overview</p>
            </div>

            {/* Portfolio Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Investment */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Investment</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatCurrency(portfolioData?.totalInvestment || 0)}
                            </p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <span className="text-2xl font-bold text-blue-600">₹</span>
                        </div>
                    </div>
                </div>

                {/* Current Value */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Current Value</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatCurrency(portfolioData?.currentPortfolioValue || 0)}
                            </p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                {/* Total Gain/Loss */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Gain/Loss</p>
                            <p className={`text-2xl font-bold ${(portfolioData?.totalGainLoss || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {formatCurrency(portfolioData?.totalGainLoss || 0)}
                            </p>
                        </div>
                        <div className={`p-3 rounded-lg ${(portfolioData?.totalGainLoss || 0) >= 0 ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                            {(portfolioData?.totalGainLoss || 0) >= 0 ?
                                <TrendingUp className="h-6 w-6 text-green-600" /> :
                                <TrendingDown className="h-6 w-6 text-red-600" />
                            }
                        </div>
                    </div>
                </div>

                {/* Gain/Loss Percentage */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Return %</p>
                            <p className={`text-2xl font-bold ${(portfolioData?.totalGainLossPercentage || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {formatPercent(portfolioData?.totalGainLossPercentage || 0)}
                            </p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <Percent className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Best/Worst Performers */}
            {(portfolioData?.bestPerformer || portfolioData?.worstPerformer) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Best Performer */}
                    {portfolioData?.bestPerformer && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Best Performer</h3>
                                <div className="bg-green-100 p-2 rounded-lg">
                                    <Award className="h-5 w-5 text-green-600" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-900 cursor-pointer hover:text-purple-600" onClick={() => window.open(`/stock/${portfolioData.bestPerformer.symbol}`, '_blank')}>
                                        {portfolioData.bestPerformer.symbol}
                                    </span>
                                    <span className="text-green-600 font-semibold">
                                        {formatPercent(portfolioData.bestPerformer.gainLossPercentage)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <span>Gain/Loss</span>
                                    <span className="text-green-600">
                                        {formatCurrency(portfolioData.bestPerformer.gainLoss)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Worst Performer */}
                    {portfolioData?.worstPerformer && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Worst Performer</h3>
                                <div className="bg-red-100 p-2 rounded-lg">
                                    <TrendingDown className="h-5 w-5 text-red-600" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-900 cursor-pointer hover:text-purple-600" onClick={() => window.open(`/stock/${portfolioData.worstPerformer.symbol}`, '_blank')}>
                                        {portfolioData.worstPerformer.symbol}
                                    </span>
                                    <span className="text-red-600 font-semibold">
                                        {formatPercent(portfolioData.worstPerformer.gainLossPercentage)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <span>Gain/Loss</span>
                                    <span className="text-red-600">
                                        {formatCurrency(portfolioData.worstPerformer.gainLoss)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Asset Allocation */}
            {portfolioData?.assetAllocation?.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
                    <div className="space-y-3">
                        {portfolioData.assetAllocation.map((asset, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div
                                        className="w-4 h-4 rounded-full mr-3"
                                        style={{
                                            backgroundColor: `hsl(${(index * 137.5) % 360}, 70%, 50%)`
                                        }}
                                    ></div>
                                    <span className="font-medium text-gray-900 cursor-pointer hover:text-purple-600" onClick={() => window.open(`/stock/${asset.symbol}`, '_blank')}>{asset.symbol}</span>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold text-gray-900">
                                        {asset.percentage.toFixed(1)}%
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {formatCurrency(asset.value)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Charts Section */}
            {portfolioData && portfolioData.totalInvestment > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <PortfolioChart
                        data={performanceData}
                        loading={performanceLoading}
                    />
                    <AllocationChart
                        data={portfolioData.assetAllocation}
                        loading={loading}
                    />
                </div>
            )}

            {/* Empty State */}
            {portfolioData && portfolioData.totalInvestment === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                        <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mt-1" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Start Your Investment Journey
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Add your first holding to begin tracking your portfolio performance.
                    </p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        Add First Holding
                    </button>
                </div>
            )}
        </div>
    );
}

export default memo(Dashboard);