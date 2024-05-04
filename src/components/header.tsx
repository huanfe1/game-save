export default function Header() {
    return (
        <header id="header" className="flex h-8 select-none bg-black text-white">
            <div className="drag flex h-full flex-1 items-center pl-4 text-sm">存档管理器</div>
            <div className="flex">
                <div
                    className="flex h-full w-8 cursor-pointer items-center justify-center hover:bg-slate-800"
                    onClick={() => window.ipcRenderer.send('window-min')}
                >
                    <MinimizeSvg />
                </div>
                <div
                    className="flex h-full w-8 cursor-pointer items-center justify-center hover:bg-slate-800"
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
