import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import DoubleButton from '@/components/common/double-button';
import { useStoreBackups } from '@/lib/store';
import { DeleteSvg, SaveSvg } from '@/lib/svg';

import Remark from './remark';

export default function Menu({ zipName }: { zipName: string }) {
    const { uid } = useParams();
    const { refresh } = useStoreBackups(store => store);
    const deleteZip = () => {
        window.ipcRenderer.invoke('deleteGameBackup', { uid, zipName }).then(() => {
            refresh(uid!);
        });
    };
    const CoverZip = () => {
        window.ipcRenderer.invoke('coverGameBackup', { uid, zipName }).then(() => {
            toast.success('覆盖存档成功');
        });
    };
    return (
        <div className="space-x-3">
            <Remark uid={uid!} zipName={zipName} />
            <DoubleButton
                isIconOnly
                size="sm"
                content="将会覆盖到本地存档文件，此操作不可撤销"
                title="覆盖存档"
                handle={CoverZip}
            >
                <SaveSvg width="20px" height="20px" />
            </DoubleButton>
            <DoubleButton
                isIconOnly
                size="sm"
                content="将会删除存档，此操作不可撤销"
                title="删除存档"
                handle={deleteZip}
            >
                <DeleteSvg width="20px" height="20px" />
            </DoubleButton>
        </div>
    );
}

const MenuSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.5 6.5h15M4.5 12h15m-15 5.5h15"
        ></path>
    </svg>
);
