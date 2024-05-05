import { useStoreGames } from '@/store';
import { DeleteSvg } from '@/svg';

import DoubleButton from '@/components/common/double-button';
import AddBackup from '@/components/main/add_backup';
import Delete from '@/components/main/delete';
import List from '@/components/main/list';
import OpenFolder from '@/components/main/open_folder';

export default function Main() {
    const { games, mainName, setMainName, removeGame } = useStoreGames(store => store);
    return (
        <div className="relative h-full w-full p-1">
            {mainName && (
                <>
                    <div className="absolute right-10 top-5 space-x-3">
                        <AddBackup />
                        <OpenFolder />
                        <DoubleButton
                            content="您将删除此游戏，注意此操作将不可撤销！"
                            isIconOnly
                            title="删除游戏"
                            handle={() => {
                                removeGame(mainName);
                                setMainName('');
                            }}
                        >
                            <DeleteSvg width="20px" height="20px" />
                        </DoubleButton>
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
