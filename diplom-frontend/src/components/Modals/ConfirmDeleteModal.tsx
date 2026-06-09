import React from 'react';
import { Overlay, Modal, Actions, Button, Title } from './ConfirmDeleteModal.styled';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: React.ReactNode;
  onConfirm: () => void;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  message,
  onConfirm,
  onClose,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
}) => {
  if (!open) return null;

  return (
    <Overlay>
      <Modal>
        <Title>{title}</Title>
        <p>{message}</p>

        <Actions>
          <Button onClick={onClose}>{cancelText}</Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </Actions>
      </Modal>
    </Overlay>
  );
};

export default ConfirmModal;
