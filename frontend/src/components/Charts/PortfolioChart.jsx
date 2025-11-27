import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                <p className="text-gray-600 text-sm">{label}</p>
                <p className="text-purple-600 font-semibold">
                    {formatCurrency(payload[0].value)}
                </p>
            </div>
        );
    }
    return null;
};

export default function PortfolioChart({ data, loading }) {
    const [timePeriod, setTimePeriod] = useState('ALL');

    const timePeriods = [
        { label: '1M', value: '1M' },
        { label: '3M', value: '3M' },
        { label: '6M', value: '6M' },
        { label: '1Y', value: '1Y' },
        { label: 'All', value: 'ALL' }
    ];

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
                    <div className="h-64 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Portfolio Performance</h3>
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                    {timePeriods.map((period) => (
                        <button
                            key={period.value}
                            onClick={() => setTimePeriod(period.value)}
                            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                                timePeriod === period.value
                                    ? 'bg-white text-purple-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            {period.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                            dataKey="date" 
                            stroke="#6b7280"
                            fontSize={12}
                        />
                        <YAxis 
                            stroke="#6b7280"
                            fontSize={12}
                            tickFormatter={formatCurrency}
                        />
                        <Tooltip content={CustomTooltip} />
                        <Line 
                            type="monotone" 
                            dataKey="portfolioValue" 
                            stroke="#8b5cf6" 
                            strokeWidth={2}
                            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}