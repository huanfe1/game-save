import { useStoreBackups, useStoreGames } from '@/store';
import { Button } from '@nextui-org/react';

export default function AddBackup() {
    const { games, mainName } = useStoreGames(store => store);
    const { addBackup } = useStoreBackups(store => store);
    const click = () => {
        window.ipcRenderer.invoke('add-game-backup', { name: mainName, path: games[mainName].path }).then(name => {
            addBackup(name);
        });
    };
    return (
        <Button isIconOnly title="创建备份" onPress={click}>
            <AddSvg />
        </Button>
    );
}

const AddSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path>
    </svg>
);
