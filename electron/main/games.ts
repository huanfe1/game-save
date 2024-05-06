import compressing from 'compressing';
import dayjs from 'dayjs';
import { app, dialog, ipcMain } from 'electron';
import Store from 'electron-store';
import { glob } from 'glob';
import { exec, execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export function games() {
    type GamesType = Record<string, { name: string; path: string }>;
    const store = new Store({ schema: { games: { type: 'object', default: {} } } });

    ipcMain.handle('getGames', () => {
        return store.get('games') as GamesType;
    });

    ipcMain.handle('addGame', async (_, { name, path }: { name: string; path: string }) => {
        const games: GamesType = store.get('games') as GamesType;
        const uid = crypto.randomUUID().split('-')[0];
        games[uid] = { name, path };
        store.set('games', games);
        return {
            [uid]: { name, path },
        };
    });

    ipcMain.handle('removeGame', async (_, uid: string) => {
        const games: GamesType = store.get('games') as GamesType;
        delete games[uid];
        store.set('games', games);
    });

    ipcMain.handle('chooseFolder', async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory'] });
        if (!canceled) {
            return filePaths[0];
        }
    });

    ipcMain.handle('openFolder', async (_, path: string) => {
        exec(`start "" "${path}"`);
    });

    const saveDataFolder = path.join(app.getPath('userData'), 'save_data');
    if (!fs.existsSync(saveDataFolder)) fs.mkdirSync(saveDataFolder);

    ipcMain.handle('getAllBackupsByUid', (_, uid: string) => {
        return glob('*.zip', { cwd: path.join(saveDataFolder, uid) });
    });

    ipcMain.handle('createGameBackupByUid', async (_, uid: string) => {
        const games = store.get('games') as GamesType;
        if (!games[uid]) throw new Error('没有相应游戏');
        // 检查是否存在对应文件夹
        const backupFolderPath = path.join(saveDataFolder, uid);
        if (!fs.existsSync(backupFolderPath)) fs.mkdirSync(backupFolderPath);
        // 创建压缩文件
        const backupPath = games[uid].path;
        const time = dayjs().valueOf();
        const zipPath = path.join(backupFolderPath, time + '--.zip');
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
