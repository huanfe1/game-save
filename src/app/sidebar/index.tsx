import { useStoreGames } from '@/store';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStoreGameUidList } from '@/lib/store';

import AddGame from './add_game';

export default function Sidebar() {
    const navigate = useNavigate();
    const { games, setGames } = useStoreGameUidList(state => state);
    useEffect(() => {
        window.ipcRenderer.invoke('getGameUidList').then(res => setGames(res));
    }, []);
    return (
        <div className="flex h-[768px] w-64 flex-col border-r border-default-100">
            <div className="font-blod p-3 text-xl text-default-800" onClick={() => navigate('/')}>
                游戏
            </div>
            <div className="flex flex-col overflow-y-scroll">
                {games.map(id => (
                    <Button
                        key={id}
                        className="mx-2 my-1 flex-none rounded bg-default-100 hover:bg-default-200"
                        onPress={() => navigate('/game/' + id)}
                    >
                        {id}
                    </Button>
                ))}
            </div>
            <div className="mt-4 flex-1">
                <AddGame />
            </div>
        </div>
    );
}
