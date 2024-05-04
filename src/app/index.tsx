import Main from '@/app/main';
import Sidebar from '@/app/sitebar';
import Header from '@/components/header';

export default function App() {
    return (
        <div className="bg-default-50 text-foreground">
            <Header></Header>
            <main className="flex">
                <Sidebar />
                <div className="flex-1">
                    <Main />
                </div>
            </main>
        </div>
    );
}
