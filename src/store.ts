import { create } from 'zustand';

type GlobalStore = {
    mainName: string;
    games: Record<string, { path: string }>;
    setMainName: (name: string) => void;
    setGames: (games: Record<string, { path: string }>) => void;
    addGame: (name: string, path: string) => void;
    removeGame: (name: string) => void;
};

export const useGlobalStore = create<GlobalStore>(set => ({
    mainName: '',
    games: {},
    setMainName: (name: string) => {
        set({ mainName: name });
    },
    setGames: (games: Record<string, { path: string }>) => {
        set({ games });
    },
    addGame: (name: string, path: string) => {
        window.ipcRenderer.invoke('add-game', { name, path });
        set(state => ({
            games: {
                ...state.games,
                [name]: { path },
            },
        }));
    },
    removeGame: (name: string) => {
        window.ipcRenderer.invoke('remove-game', name);
        set(state => ({
            games: Object.fromEntries(Object.entries(state.games).filter(([key]) => key !== name)),
        }));
    },
}));
