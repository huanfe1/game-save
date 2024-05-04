import { useStoreGames } from '@/store';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';

import AddGame from '@/components/modal/add_game';

export default function Sidebar() {
    const { games, setGames, setMainName } = useStoreGames(state => state);
    useEffect(() => {
        window.ipcRenderer.invoke('get-games').then(res => setGames(res));
    }, []);
    return (
        <div className="flex h-[768px] w-64 flex-col border-r border-default-100">
            <div className="font-blod p-3 text-xl text-default-800">游戏</div>
            <div className="flex flex-col overflow-y-scroll">
                {Object.keys(games).map(game => (
                    <Button
                        key={game}
                        className="mx-2 my-1 flex-none rounded bg-default-100 hover:bg-default-200"
                        onPress={() => setMainName(game)}
                    >
                        {game}
                    </Button>
                ))}
            </div>
            <div className="mt-4 flex-1">
                <AddGame />
            </div>
        </div>
    );
}
