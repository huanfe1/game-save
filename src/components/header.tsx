export default function Header() {
    return (
        <header id="header" className="flex h-8 select-none bg-black text-white">
            <div className="drag flex h-full flex-1 items-center pl-4 text-sm">存档管理器</div>
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
                    <OpenFolderSvg />
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

const OpenFolderSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24">
        <g fill="none">
            <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
            <path
                fill="currentColor"
                d="M9.52 3a2 2 0 0 1 1.442.614l.12.137L12.48 5.5H20a2 2 0 0 1 1.995 1.85L22 7.5V19a2 2 0 0 1-1.85 1.995L20 21H4a2 2 0 0 1-1.995-1.85L2 19V5a2 2 0 0 1 1.85-1.995L4 3zM20 11H4v8h16zM9.52 5H4v4h16V7.5h-7.52a2 2 0 0 1-1.442-.614l-.12-.137z"
            ></path>
        </g>
    </svg>
);
