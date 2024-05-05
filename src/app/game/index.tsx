import { useParams } from 'react-router-dom';

import { useStoreGames } from '@/lib/store';

import ButtonGroup from './button_group';

export default function Game() {
    const { uid } = useParams();
    if (!uid) return;
    const { games } = useStoreGames();
    const info = games[uid];
    return (
        <div className="relative h-full w-full p-5">
            <div>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl">{info?.name}</h1>
                </div>
                <div className="mt-2 text-sm text-default-500">{info?.path}</div>
                <ButtonGroup />
            </div>
        </div>
    );
}
