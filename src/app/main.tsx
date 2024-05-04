import { useStoreGames } from '@/store';

import AddBackup from '@/components/main/add_backup';
import Delete from '@/components/main/delete';
import List from '@/components/main/list';
import OpenFolder from '@/components/main/open_folder';

export default function Main() {
    const { games, mainName } = useStoreGames(store => store);

    return (
        <div className="relative h-full w-full p-1">
            {mainName && (
                <>
                    <div className="absolute right-10 top-5 space-x-3">
                        <AddBackup />
                        <OpenFolder />
                        <Delete />
                    </div>
                    <div className="p-5">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl">{mainName}</h1>
                        </div>
                        <div className="mt-2 text-sm text-default-500">{games[mainName].path}</div>
                    </div>
                    <div>
                        <div className="ml-5">存档列表</div>
                        <List />
                    </div>
                </>
            )}
        </div>
    );
}
