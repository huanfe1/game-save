import { useGlobalStore } from '@/store';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { Button } from '@nextui-org/react';

export default function List() {
    const mainName = useGlobalStore(store => store.mainName);
    window.ipcRenderer.invoke('get-game-backup', mainName).then(res => console.log(res));
    return (
        <Table aria-label="快照存档列表" isStriped className="mt-10" shadow="none">
            <TableHeader>
                <TableColumn>时间</TableColumn>
                <TableColumn>备注</TableColumn>
                <TableColumn>操作</TableColumn>
            </TableHeader>
            <TableBody emptyContent="暂时还没有存档">
                <TableRow key="1">
                    <TableCell>Tony Reichert</TableCell>
                    <TableCell>CEO</TableCell>
                    <TableCell>Paused</TableCell>
                </TableRow>
                <TableRow key="2">
                    <TableCell>Zoey Lang</TableCell>
                    <TableCell>Technical Lead</TableCell>
                    <TableCell>Paused</TableCell>
                </TableRow>
                <TableRow key="3">
                    <TableCell>Jane Fisher</TableCell>
                    <TableCell>Senior Developer</TableCell>
                    <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key="4">
                    <TableCell>William Howard</TableCell>
                    <TableCell>Community Manager</TableCell>
                    <TableCell>Vacation</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
