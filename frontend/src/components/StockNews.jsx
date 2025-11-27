import { useState, useEffect } from 'react';
import { ExternalLink, Clock } from 'lucide-react';

export default function StockNews({ symbol }) {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock news data - replace with actual API
        const mockNews = [
            {
                id: 1,
                title: `${symbol} Reports Strong Q3 Results`,
                summary: 'Company shows impressive growth in revenue and profit margins.',
                publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
                source: 'Financial Express',
                url: '#'
            },
            {
                id: 2,
                title: `Analysts Upgrade ${symbol} Rating`,
                summary: 'Multiple brokerages raise target price citing strong fundamentals.',
                publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
                source: 'Economic Times',
                url: '#'
            },
            {
                id: 3,
                title: `${symbol} Announces New Product Launch`,
                summary: 'Company enters new market segment with innovative offering.',
                publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
                source: 'Business Standard',
                url: '#'
            }
        ];

        setTimeout(() => {
            setNews(mockNews);
            setLoading(false);
        }, 1000);
    }, [symbol]);

    const formatTime = (date) => {
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    if (loading) {
        return (
            <div className="space-y-3">
                {[1,2,3].map(i => (
                    <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {news.map((article) => (
                <div key={article.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h4 className="font-medium text-gray-900 mb-2 hover:text-purple-600 cursor-pointer">
                        {article.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">{article.summary}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTime(article.publishedAt)}
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">{article.source}</span>
                            <ExternalLink className="h-3 w-3" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}