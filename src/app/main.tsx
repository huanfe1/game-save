import { useGlobalStore } from '@/store';

import Delete from '@/components/main/delete';
import List from '@/components/main/list';
import OpenFolder from '@/components/main/open-folder';

export default function Main() {
    const { games, mainName } = useGlobalStore(store => store);

    return (
        <div className="relative h-full w-full p-5">
            {mainName && (
                <>
                    <div>
                        <Delete />
                        <OpenFolder />
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl">{mainName}</h1>
                        </div>
                        <div className="mt-2 text-sm text-default-500">{games[mainName].path}</div>
                    </div>
                    <div>
                        <List />
                    </div>
                </>
            )}
        </div>
    );
}
