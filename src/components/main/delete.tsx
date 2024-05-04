import { useGlobalStore } from '@/store';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { useState } from 'react';

export default function Delete() {
    const { mainName, setMainName, removeGame } = useGlobalStore(store => store);
    const remove = () => {
        removeGame(mainName);
        setMainName('');
    };
    const [deleteState, setDeleteState] = useState(false);
    return (
        <>
            <Button isIconOnly title="删除游戏" className="absolute right-5 top-5" onPress={() => setDeleteState(true)}>
                <DeleteSvg />
            </Button>
            <Modal isOpen={deleteState} backdrop="blur" onClose={() => setDeleteState(false)}>
                <ModalContent>
                    {close => (
                        <>
                            <ModalHeader>删除此游戏</ModalHeader>
                            <ModalBody>请注意！此操作将不可撤销！</ModalBody>
                            <ModalFooter>
                                <Button onClick={close}>取消</Button>
                                <Button
                                    color="danger"
                                    onClick={() => {
                                        close();
                                        remove();
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

const DeleteSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 1024 1024">
        <path
            fill="currentColor"
            d="M360 184h-8c4.4 0 8-3.6 8-8zh304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32M731.3 840H292.7l-24.2-512h487z"
        ></path>
    </svg>
);
