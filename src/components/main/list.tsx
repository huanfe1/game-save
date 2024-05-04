import { useStoreBackups, useStoreGames } from '@/store';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import ListRemark from './list-remark';

export default function List() {
    const mainName = useStoreGames(store => store.mainName);
    const { backups, setBackups, renameBackup } = useStoreBackups(store => store);
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
                            <Button isIconOnly size="sm" title="删除存档">
                                <DeleteSvg />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

const DeleteSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 1024 1024">
        <path
            fill="currentColor"
            d="M360 184h-8c4.4 0 8-3.6 8-8zh304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32M731.3 840H292.7l-24.2-512h487z"
        ></path>
    </svg>
);
