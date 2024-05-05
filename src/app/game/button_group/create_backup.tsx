import { useStoreBackups, useStoreGames } from '@/store';
import { Button } from '@nextui-org/react';
import { Toaster, toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { AddSvg } from '@/lib/svg';

export default function CreateBackup() {
    const { addBackup } = useStoreBackups(store => store);
    const { uid } = useParams();
    const click = () => {
        window.ipcRenderer.invoke('createGameBackupByUid', uid).then(name => {
            // addBackup(name);
            toast.success('创建备份成功');
        });
    };
    return (
        <>
            <Button isIconOnly title="创建备份" onPress={click}>
                <AddSvg width="20px" height="20px" />
            </Button>
            <Toaster
                position="top-center"
                toastOptions={{
                    className: 'bg-background text-foreground',
                }}
            />
        </>
    );
}
