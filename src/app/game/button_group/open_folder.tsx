import { Button } from '@nextui-org/react';
import { useParams } from 'react-router-dom';

import { useStoreGames } from '@/lib/store';
import { FolderSvg } from '@/lib/svg';

export default function OpenFolder() {
    const { uid } = useParams();
    const games = useStoreGames(store => store.games);
    const click = () => {
        window.ipcRenderer.invoke('openFolder', games[uid!].path);
    };
    return (
        <Button isIconOnly title="打开文件夹" onPress={click}>
            <FolderSvg width="20px" height="20px" />
        </Button>
    );
}
