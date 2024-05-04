import dayjs from 'dayjs';
import { create } from 'zustand';

type GamesType = {
    mainName: string;
    games: Record<string, { path: string }>;
    setMainName: (name: string) => void;
    setGames: (games: Record<string, { path: string }>) => void;
    addGame: (name: string, path: string) => void;
    removeGame: (name: string) => void;
};

export const useStoreGames = create<GamesType>(set => ({
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

type BackupsType = {
    backups: string[];
    setBackups: (backups: string[]) => void;
    addBackup: (name: string) => void;
    removeBackup: (name: string) => void;
};

export const useStoreBackups = create<BackupsType>(set => ({
    backups: [],
    setBackups: (backups: string[]) => {
        set({ backups });
    },
    addBackup: (name: string) => {
        set(state => ({ backups: [name, ...state.backups] }));
    },
    removeBackup: (name: string) => {
        set(state => ({
            backups: state.backups.filter(i => i !== name),
        }));
    },
}));
