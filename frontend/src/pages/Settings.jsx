import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';

export default function Settings() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [profile, setProfile] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: ''
    });

    const [preferences, setPreferences] = useState({
        currency: 'INR',
        theme: 'light',
        notifications: true
    });

    const [password, setPassword] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'preferences', label: 'Preferences' },
        { id: 'security', label: 'Security' }
    ];

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await userService.updateProfile(profile);
            setMessage('Profile updated successfully');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to update profile');
        }
        setLoading(false);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (password.new !== password.confirm) {
            setMessage('Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            await userService.changePassword({
                currentPassword: password.current,
                newPassword: password.new
            });
            setMessage('Password changed successfully');
            setPassword({ current: '', new: '', confirm: '' });
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to change password');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

            {message && (
                <div className={`mb-6 p-4 rounded-lg ${
                    message.includes('success') 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                    {message}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === tab.id
                                        ? 'border-purple-500 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'profile' && (
                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={profile.phone}
                                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                            >
                                {loading ? 'Updating...' : 'Update Profile'}
                            </button>
                        </form>
                    )}

                    {activeTab === 'preferences' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Currency
                                </label>
                                <select
                                    value={preferences.currency}
                                    onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    <option value="INR">Indian Rupee (₹)</option>
                                    <option value="USD">US Dollar ($)</option>
                                    <option value="EUR">Euro (€)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Theme
                                </label>
                                <select
                                    value={preferences.theme}
                                    onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                    <option value="auto">Auto</option>
                                </select>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={preferences.notifications}
                                    onChange={(e) => setPreferences({...preferences, notifications: e.target.checked})}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    Enable email notifications
                                </label>
                            </div>
                            <button
                                onClick={async () => {
                                    try {
                                        await userService.updatePreferences(preferences);
                                        setMessage('Preferences saved successfully');
                                        setTimeout(() => setMessage(''), 3000);
                                    } catch (error) {
                                        setMessage('Failed to save preferences');
                                    }
                                }}
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                            >
                                Save Preferences
                            </button>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <form onSubmit={handlePasswordChange} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    value={password.current}
                                    onChange={(e) => setPassword({...password, current: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={password.new}
                                    onChange={(e) => setPassword({...password, new: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={password.confirm}
                                    onChange={(e) => setPassword({...password, confirm: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                            >
                                {loading ? 'Changing...' : 'Change Password'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}