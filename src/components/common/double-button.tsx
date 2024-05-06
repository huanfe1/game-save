import { Button } from '@nextui-org/react';
import type { ButtonProps } from '@nextui-org/react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';

export default function DoubleButton(props: ButtonProps & { handle?: () => void }) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const click = () => {
        onClose();
        props.handle && props.handle();
    };
    return (
        <>
            <Button onPress={onOpen} {...props}>
                {props.children}
            </Button>
            <Modal isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange} isDismissable hideCloseButton>
                <ModalContent>
                    <ModalHeader>{props.title || '请注意'}</ModalHeader>
                    <ModalBody>{props.content}</ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={onClose}>
                            取消
                        </Button>
                        <Button color="danger" onPress={click}>
                            确定
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export function DoubleFunction() {
    return;
}
