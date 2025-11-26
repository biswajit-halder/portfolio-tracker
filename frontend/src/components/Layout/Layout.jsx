import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div>
            <nav className="bg-gray-800 text-white p-4">Portfolio Tracker</nav>
            <main className="p-8">
                <Outlet />
            </main>
        </div>
    );
}