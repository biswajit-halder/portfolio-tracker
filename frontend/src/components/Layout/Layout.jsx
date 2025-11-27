import { Outlet, Link, useLocation } from 'react-router-dom';
import { TrendingUp, LogOut, BarChart3, PieChart, History, Settings, Eye, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Layout() {
    const { user, logout } = useAuth();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
    };

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
        { name: 'Holdings', href: '/holdings', icon: PieChart },
        { name: 'Transactions', href: '/transactions', icon: History },
        { name: 'Performance', href: '/performance', icon: TrendingUp },
        { name: 'Watchlist', href: '/watchlist', icon: Eye },
        { name: 'Alerts', href: '/alerts', icon: Bell },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-8">
                            <Link to="/dashboard" className="flex items-center">
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                                    <TrendingUp className="h-6 w-6 text-white" />
                                </div>
                                <span className="ml-3 text-xl font-bold text-gray-900">Portfolio Tracker</span>
                            </Link>
                            <nav className="flex space-x-6">
                                {navigation.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = location.pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                                }`}
                                        >
                                            <Icon className="h-4 w-4 mr-2" />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Welcome, {user?.name}</span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <LogOut className="h-4 w-4 mr-1" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
}