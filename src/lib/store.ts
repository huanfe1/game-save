import { create } from 'zustand';

type GameUidListType = {
    games: string[];
    setGames: (games: string[]) => void;
    addGame: (name: string) => void;
    removeGame: (name: string) => void;
};

export const useStoreGameUidList = create<GameUidListType>(set => ({
    games: [],
    setGames: (games: string[]) => set({ games }),
    addGame: (name: string) => set(state => ({ games: [...state.games, name] })),
    removeGame: (name: string) => set(state => ({ games: state.games.filter(game => game !== name) })),
}));
