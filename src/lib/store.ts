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

type BackupsType = {
    backups: string[];
    refresh: (uid: string) => void;
};

export const useStoreBackups = create<BackupsType>(set => ({
    backups: [],
    refresh: (uid: string) => {
        window.ipcRenderer.invoke('getAllBackupsByUid', uid).then(backups => set({ backups }));
    },
}));
