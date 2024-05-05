import compressing from 'compressing';
import dayjs from 'dayjs';
import { app, dialog, ipcMain } from 'electron';
import Store from 'electron-store';
import { glob } from 'glob';
import { exec, execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export function games() {
    type GamesType = Record<string, { path: string }>;

    const store = new Store({ schema: { games: { type: 'object', default: {} } } });
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

    ipcMain.on('open-save-data', async () => {
        exec(`start "" "${path.join(app.getPath('userData'), 'save_data')}"`);
    });

    const saveDataFolder = path.join(app.getPath('userData'), 'save_data');
    if (!fs.existsSync(saveDataFolder)) fs.mkdirSync(saveDataFolder);
    const games = store.get('games') as GamesType;

    ipcMain.handle('get-game-backup', (_, name: string) => {
        return glob('*.zip', { cwd: path.join(saveDataFolder, name) });
    });

    ipcMain.handle('add-game-backup', async (_, { name }: { name: string }) => {
        const games = store.get('games') as GamesType;
        if (!games[name]) throw new Error('没有相应游戏');
        // 检查是否存在对应文件夹
        const backupFolderPath = path.join(saveDataFolder, name);
        if (!fs.existsSync(backupFolderPath)) fs.mkdirSync(backupFolderPath);
        // 创建压缩文件
        const backupPath = games[name].path;
        const time = dayjs().valueOf();
        const zipPath = path.join(saveDataFolder, name, time + '--.zip');
        return new Promise<string>((resolve, _) => {
            compressing.zip.compressDir(backupPath, zipPath).then(() => {
                resolve(time + '--.zip');
            });
        });
    });

    ipcMain.handle('remove-game-backup', async (_, { name, zipName }: { name: string; zipName: string }) => {
        const games = store.get('games') as GamesType;
        if (!games[name]) throw new Error('没有相应游戏');
        const backupFolderPath = path.join(saveDataFolder, name);
        fs.unlinkSync(path.join(backupFolderPath, zipName));
        return zipName;
    });

    type RemarkType = { name: string; zipName: string; remark: string };
    ipcMain.handle('backup-remark', async (_, { name, zipName, remark }: RemarkType) => {
        const games = store.get('games') as GamesType;
        if (!games[name]) throw new Error('没有相应游戏');
        const backupFolderPath = path.join(saveDataFolder, name);
        fs.renameSync(
            path.join(backupFolderPath, zipName),
            path.join(backupFolderPath, zipName.replace(/--.*/, `--${remark}.zip`)),
        );
        return zipName.replace(/--.*/, `--${remark}.zip`);
    });

    ipcMain.handle('cover-game-backup', async (_, { name, zipName }: { name: string; zipName: string }) => {
        const games = store.get('games') as GamesType;
        if (!games[name]) throw new Error('没有相应游戏');
        const backupFilePath = path.join(saveDataFolder, name, zipName);
        if (fs.existsSync(games[name].path)) execSync('rm -rf ' + games[name].path);
        return compressing.zip.uncompress(backupFilePath, path.dirname(games[name].path));
    });
}
