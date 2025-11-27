import { useState, useEffect } from 'react';
import { TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import { portfolioService } from '../services/portfolioService';
import PortfolioChart from '../components/Charts/PortfolioChart';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Performance() {
    const [performanceData, setPerformanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('1M');

    useEffect(() => {
        fetchPerformanceData();
    }, [timeRange]);

    const fetchPerformanceData = async () => {
        try {
            setLoading(true);
            const data = await portfolioService.getPerformance(timeRange);
            setPerformanceData(data.performanceData || []);
        } catch (error) {
            console.error('Failed to fetch performance data:', error);
        }
        setLoading(false);
    };

    const timeRanges = [
        { label: '1W', value: '1W' },
        { label: '1M', value: '1M' },
        { label: '3M', value: '3M' },
        { label: '6M', value: '6M' },
        { label: '1Y', value: '1Y' },
        { label: 'All', value: 'ALL' }
    ];

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <BarChart3 className="h-6 w-6 text-purple-600 mr-2" />
                    <h1 className="text-2xl font-bold text-gray-900">Portfolio Performance</h1>
                </div>
                <div className="flex space-x-2">
                    {timeRanges.map((range) => (
                        <button
                            key={range.value}
                            onClick={() => setTimeRange(range.value)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                timeRange === range.value
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <PortfolioChart data={performanceData} loading={loading} />
            </div>
        </div>
    );
}