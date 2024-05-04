import { app, dialog, ipcMain } from 'electron';
import Store from 'electron-store';
import { globSync } from 'glob';
import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export function games() {
    type GamesType = Record<string, { path: string }>;

    const store = new Store();

    ipcMain.handle('get-games', async () => {
        return store.get('games');
    });

    ipcMain.handle('add-game', async (_, { name, path }: { name: string; path: string }) => {
        let games: GamesType = store.get('games') as GamesType;
        games = {
            ...games,
            [name]: { path },
        };
        store.set('games', games);
    });

    ipcMain.handle('remove-game', async (_, name: string) => {
        const games: GamesType = store.get('games') as GamesType;
        delete games[name];
        store.set('games', games);
    });

    ipcMain.handle('choose-folder', async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory'] });
        if (!canceled) {
            return filePaths[0];
        }
    });

    ipcMain.on('open-folder', async (_, path: string) => {
        exec(`start "" "${path}"`);
    });

    const saveDataFolder = path.join(app.getPath('userData'), 'save_data');
    if (!fs.existsSync(saveDataFolder)) fs.mkdirSync(saveDataFolder);
    const games = store.get('games') as GamesType;
    Object.keys(games).forEach(name => {
        const filePath = path.join(saveDataFolder, name);
        if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);
    });

    ipcMain.handle('get-game-backup', (_, name: string) => {
        return globSync('*.zip', { cwd: path.join(saveDataFolder, name) });
    });
}
