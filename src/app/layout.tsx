import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import Header from './header';
import Sidebar from './sidebar';

export default function Layout() {
    return (
        <div className="bg-default-50 text-foreground">
            <Toaster
                richColors
                position="top-center"
                toastOptions={{
                    className: 'bg-background text-foreground',
                }}
            />
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
