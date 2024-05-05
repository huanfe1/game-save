import { useStoreBackups, useStoreGames } from '@/store';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';

import DoubleButton from '@/components/common/double-button';
import { DeleteSvg, SaveSvg } from '@/lib/svg';

import ListRemark from './list-remark';

export default function List() {
    const mainName = useStoreGames(store => store.mainName);
    const { backups, setBackups } = useStoreBackups(store => store);
    useEffect(() => {
        window.ipcRenderer.invoke('get-game-backup', mainName).then(res => setBackups(res));
    }, [mainName]);
    return (
        <Table aria-label="存档列表" isStriped shadow="none">
            <TableHeader>
                <TableColumn>时间</TableColumn>
                <TableColumn width={250}>备注</TableColumn>
                <TableColumn width={150}>操作</TableColumn>
            </TableHeader>
            <TableBody emptyContent="暂时还没有存档">
                {backups.map(name => (
                    <TableRow key={name}>
                        <TableCell>
                            {dayjs(parseInt(name.replace('.zip', '').split('--')[0])).format('YYYY-MM-DD HH:mm:ss')}
                        </TableCell>
                        <TableCell>{name.replace('.zip', '').split('--')[1]}</TableCell>
                        <TableCell className="space-x-3">
                            <ListRemark oldName={name} />
                            <CoverBackupButton gameName={mainName} backupName={name} />
                            <DeleteBackupButton gameName={mainName} backupName={name} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

// 删除本地存档按钮
function DeleteBackupButton({ backupName, gameName }: { backupName: string; gameName: string }) {
    const { removeBackup } = useStoreBackups(store => store);
    const click = () => {
        window.ipcRenderer
            .invoke('remove-game-backup', { name: gameName, zipName: backupName })
            .then(res => removeBackup(res));
    };
    return (
        <DoubleButton isIconOnly size="sm" content="将会删除存档，此操作不可撤销" title="删除存档" handle={click}>
            <DeleteSvg width="20px" height="20px" />
        </DoubleButton>
    );
}

function CoverBackupButton({ backupName, gameName }: { backupName: string; gameName: string }) {
    const click = () => {
        window.ipcRenderer.invoke('cover-game-backup', { name: gameName, zipName: backupName }).then(res => {
            toast.success('覆盖存档成功');
        });
    };
    return (
        <>
            <Toaster richColors position="top-center" />
            <DoubleButton
                isIconOnly
                size="sm"
                content="将会覆盖到本地存档文件，此操作不可撤销"
                title="覆盖存档"
                handle={click}
            >
                <SaveSvg width="20px" height="20px" />
            </DoubleButton>
        </>
    );
}
