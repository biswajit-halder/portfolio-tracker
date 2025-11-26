import { Link } from 'react-router-dom';
import { TrendingUp, PieChart, BarChart3, Shield, Zap, Users, ArrowRight, Check, Sparkles } from 'lucide-react';

export default function Landing() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-50 fixed w-full top-0 backdrop-blur-md bg-black/30 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                PortfolioHub
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                to="/login"
                                className="px-6 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-all"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-6 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/50 mb-8">
                        <Sparkles className="w-4 h-4 text-purple-300" />
                        <span className="text-sm font-semibold text-purple-200">🚀 The #1 Portfolio Tracker for Indian Markets</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                        <span className="block text-white">Master Your</span>
                        <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Investment Portfolio
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Track NSE stocks, analyze performance in real-time, and make smarter investment decisions with AI-powered insights.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link
                            to="/register"
                            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-110 hover:shadow-2xl shadow-xl shadow-purple-500/50"
                        >
                            Start Trading Free
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all"
                        >
                            Sign In
                        </Link>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4 md:gap-8">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">10K+</div>
                            <div className="text-sm text-gray-400 mt-1">Traders Active</div>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">₹500Cr+</div>
                            <div className="text-sm text-gray-400 mt-1">Tracked Daily</div>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">99.9%</div>
                            <div className="text-sm text-gray-400 mt-1">Uptime</div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            icon: TrendingUp,
                            title: 'Real-Time Tracking',
                            desc: 'Monitor NSE stocks with live price updates and instant notifications',
                            gradient: 'from-blue-500 to-cyan-500'
                        },
                        {
                            icon: PieChart,
                            title: 'Smart Analytics',
                            desc: 'Visualize portfolio allocation and get AI-powered recommendations',
                            gradient: 'from-purple-500 to-pink-500'
                        },
                        {
                            icon: BarChart3,
                            title: 'Advanced Charts',
                            desc: 'Beautiful, interactive charts showing performance over time',
                            gradient: 'from-green-500 to-emerald-500'
                        },
                        {
                            icon: Shield,
                            title: 'Bank-Level Security',
                            desc: 'Your data encrypted with enterprise-grade security protocols',
                            gradient: 'from-orange-500 to-red-500'
                        },
                        {
                            icon: Zap,
                            title: 'Lightning Fast',
                            desc: 'Blazing-fast performance with instant sync across devices',
                            gradient: 'from-yellow-500 to-orange-500'
                        },
                        {
                            icon: Users,
                            title: '24/7 Support',
                            desc: 'Expert support team ready to help with your investments',
                            gradient: 'from-indigo-500 to-purple-500'
                        }
                    ].map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={idx}
                                className="group p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:shadow-purple-500/20 transform hover:-translate-y-1"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Pricing Section */}
                <div className="mt-32">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
                        Simple, Transparent Pricing
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <h3 className="text-2xl font-bold mb-2">Starter</h3>
                            <p className="text-gray-400 mb-6">Perfect to get started</p>
                            <div className="text-4xl font-black mb-6">Free</div>
                            <ul className="space-y-3 mb-8">
                                {['Track up to 10 stocks', 'Real-time prices', 'Basic analytics', 'Email support'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-green-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/register" className="w-full inline-block text-center py-3 rounded-lg bg-white/10 hover:bg-white/20 font-bold transition-all">
                                Get Started
                            </Link>
                        </div>

                        <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 backdrop-blur-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold rounded-bl-lg">
                                POPULAR
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Pro</h3>
                            <p className="text-gray-300 mb-6">For serious investors</p>
                            <div className="text-4xl font-black mb-6">₹99<span className="text-lg text-gray-400">/month</span></div>
                            <ul className="space-y-3 mb-8">
                                {['Unlimited stocks', 'Advanced analytics', 'AI insights', 'Priority support', 'Custom alerts'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-green-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/register" className="w-full inline-block text-center py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 font-bold transition-all transform hover:scale-105">
                                Try Free for 30 Days
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="mt-32 text-center">
                    <div className="p-12 rounded-3xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 backdrop-blur-md">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            Ready to Invest Like a Pro?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of successful traders who've transformed their portfolios with PortfolioHub.
                        </p>
                        <Link
                            to="/register"
                            className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-110 shadow-xl shadow-purple-500/50"
                        >
                            Start Free Today
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Add to tailwind config for animations */}
            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}