import { Button } from '@nextui-org/react';
import { Toaster, toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { useStoreBackups } from '@/lib/store';
import { AddSvg } from '@/lib/svg';

export default function CreateBackup() {
    const { refresh } = useStoreBackups(store => store);
    const { uid } = useParams();
    const click = () => {
        window.ipcRenderer.invoke('createGameBackupByUid', uid).then(() => {
            toast.success('创建备份成功');
            refresh(uid!);
        });
    };
    return (
        <>
            <Button isIconOnly title="创建备份" onPress={click}>
                <AddSvg width="20px" height="20px" />
            </Button>
        </>
    );
}
