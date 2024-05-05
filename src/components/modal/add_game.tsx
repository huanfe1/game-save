import { useStoreGames } from '@/store';
import { Button, Input } from '@nextui-org/react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useState } from 'react';

export default function AddGame() {
    const [state, setState] = useState(false);
    const [name, setName] = useState<string>('');
    const [path, setPath] = useState<string>('');
    const addGame = useStoreGames(state => state.addGame);
    const select = () => {
        window.ipcRenderer.invoke('choose-folder').then(res => setPath(res));
    };
    const enter = () => {
        if (!name || !path) return;
        addGame(name, path);
        setName('');
        setPath('');
    };
    return (
        <>
            <div
                className="mx-3 flex cursor-pointer items-center justify-center space-x-2 rounded border-2 border-dotted border-default-300 py-2"
                onClick={() => setState(true)}
            >
                <AddSvg />
                <span>添加游戏</span>
            </div>
            <Modal isOpen={state} backdrop="blur" onClose={() => setState(false)}>
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader>添加游戏</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="游戏名称"
                                    type="text"
                                    isRequired
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                <Input
                                    label="存档路径"
                                    isRequired
                                    value={path}
                                    onChange={e => setPath(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" variant="ghost" onPress={select}>
                                    路径选择
                                </Button>
                                <Button
                                    color="primary"
                                    variant="ghost"
                                    onPress={() => {
                                        onClose();
                                        enter();
                                    }}
                                >
                                    确定
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

const AddSvg = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="18px" height="18px" viewBox="0 0 256 256">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={16}>
            <circle cx={128} cy={128} r={112}></circle>
            <path d="M 79.999992,128 H 176.0001"></path>
            <path d="m 128.00004,79.99995 v 96.0001"></path>
        </g>
    </svg>
);
