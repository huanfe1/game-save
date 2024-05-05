import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import DoubleButton from '@/components/common/double-button';
import { useStoreGames } from '@/lib/store';
import { DeleteSvg } from '@/lib/svg';

export default function DeleteGame() {
    const navigate = useNavigate();
    const { uid } = useParams();
    const refresh = useStoreGames(state => state.refresh);
    const click = () => {
        window.ipcRenderer.invoke('removeGame', uid);
        refresh();
        navigate('/');
    };
    return (
        <DoubleButton isIconOnly title="删除此游戏" content="请注意！此操作将不可撤销！" handle={click}>
            <DeleteSvg width="20px" height="20px" />
        </DoubleButton>
    );
}
