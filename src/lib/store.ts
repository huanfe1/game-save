import { create } from 'zustand';

type GameUidListType = {
    games: Record<string, { name: string; path: string }>;
    refresh: () => void;
};

export const useStoreGames = create<GameUidListType>(set => ({
    games: {},
    refresh: () => {
        window.ipcRenderer.invoke('getGames').then(games => set({ games }));
    },
}));
