import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useStoreBackups } from '@/lib/store';

import Menu from './menu';

export default function List() {
    const { uid } = useParams();
    const { backups, refresh } = useStoreBackups(store => store);
    useEffect(() => refresh(uid!), [uid]);
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
                        <TableCell>{dayjs(parseInt(name.split('--')[0])).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                        <TableCell>{name.replace('.zip', '').split('--')[1]}</TableCell>
                        <TableCell className="space-x-3">
                            <Menu zipName={name} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
