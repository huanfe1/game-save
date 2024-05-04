import { useStoreBackups, useStoreGames } from '@/store';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export default function List() {
    const mainName = useStoreGames(store => store.mainName);
    const { backups, setBackups } = useStoreBackups(store => store);
    useEffect(() => {
        window.ipcRenderer.invoke('get-game-backup', mainName).then(res => setBackups(res));
    }, [mainName]);
    return (
        <Table isStriped shadow="none">
            <TableHeader>
                <TableColumn>时间</TableColumn>
                <TableColumn>备注</TableColumn>
                <TableColumn>存档全称</TableColumn>
            </TableHeader>
            <TableBody emptyContent="暂时还没有存档">
                {backups.map(name => (
                    <TableRow key={name}>
                        <TableCell>
                            {dayjs(parseInt(name.replace('.zip', '').split('--')[0])).format('YYYY-MM-DD HH:mm:ss')}
                        </TableCell>
                        <TableCell>{name.replace('.zip', '').split('--')[1]}</TableCell>
                        <TableCell>{name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
