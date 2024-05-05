import { FolderSvg } from '@/lib/svg';

export default function Header() {
    return (
        <header className="flex h-8 select-none bg-black text-white">
            <div className="drag-region flex h-full flex-1 items-center pl-4 text-sm">存档管理器</div>
            <div className="flex">
                <div
                    className="flex h-full w-8 items-center justify-center hover:bg-slate-800"
                    onClick={() => window.ipcRenderer.send('window-reload')}
                    title="重启软件"
                >
                    <ReloadSvg />
                </div>
                <div
                    className="flex h-full w-8 items-center justify-center hover:bg-slate-800"
                    onClick={() => window.ipcRenderer.send('open-save-data')}
                    title="打开存档目录"
                >
                    <FolderSvg width="16px" height="16px" />
                </div>
                <div
                    className="flex h-full w-8 items-center justify-center hover:bg-slate-800"
                    onClick={() => window.ipcRenderer.send('window-min')}
                >
                    <MinimizeSvg />
                </div>
                <div
                    className="flex h-full w-8 items-center justify-center hover:bg-slate-800"
                    onClick={() => window.ipcRenderer.send('window-close')}
                >
                    <CloseSvg />
                </div>
            </div>
        </header>
    );
}

const CloseSvg = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20px" height="20px" viewBox="0 0 24 24">
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m7 7l10 10M7 17L17 7"
        ></path>
    </svg>
);

const MinimizeSvg = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20px" height="20px" viewBox="0 0 36 36">
        <path
            fill="currentColor"
            d="M27 27H9a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2"
            className="clr-i-outline clr-i-outline-path-1"
        ></path>
        <path fill="none" d="M0 0h36v36H0z"></path>
    </svg>
);

const ReloadSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M2 12a9 9 0 0 0 9 9c2.39 0 4.68-.94 6.4-2.6l-1.5-1.5A6.7 6.7 0 0 1 11 19c-6.24 0-9.36-7.54-4.95-11.95S18 5.77 18 12h-3l4 4h.1l3.9-4h-3a9 9 0 0 0-18 0"
        ></path>
    </svg>
);
