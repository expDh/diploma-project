import React, { useState } from 'react';
import { Overlay, Modal, Actions, Button, Title, Input } from './ConfirmDeleteModal.styled'; // можно использовать те же стили

interface WriteOffModalProps {
  open: boolean;
  equipment: any;
  onClose: () => void;
  onConfirm: (quantity: number, comment?: string) => void;
}

const WriteOffModal: React.FC<WriteOffModalProps> = ({
  open,
  equipment,
  onClose,
  onConfirm,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [comment, setComment] = useState<string>('');

  if (!open || !equipment) return null;

  const maxQuantity = equipment.count || 1;

  const handleConfirm = () => {
    if (quantity < 1 || quantity > maxQuantity) {
      alert(`Количество должно быть от 1 до ${maxQuantity}`);
      return;
    }
    onConfirm(quantity, comment.trim() || undefined);
    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <Title>Списание оборудования</Title>
        
        <p>
          <strong>{equipment.name}</strong> {equipment.model && `(${equipment.model})`}
        </p>
        <p>Текущее количество: <strong>{equipment.count}</strong></p>

        <label>
          Количество для списания:
          <Input
            type="number"
            min={1}
            max={maxQuantity}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </label>

        <label>
          Комментарий (необязательно):
          <Input
            type="text"
            placeholder="Причина списания..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>

        <Actions>
          <Button onClick={onClose}>Отмена</Button>
          <Button onClick={handleConfirm} style={{ background: '#d32f2f' }}>
            Списать {quantity} шт.
          </Button>
        </Actions>
      </Modal>
    </Overlay>
  );
};

export default WriteOffModal;