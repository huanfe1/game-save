import { Outlet } from 'react-router-dom';

import Header from './header';
import Sidebar from './sidebar';

export default function Layout() {
    return (
        <div className="bg-default-50 text-foreground">
            <Header></Header>
            <main className="flex">
                <Sidebar />
                <div className="flex-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
