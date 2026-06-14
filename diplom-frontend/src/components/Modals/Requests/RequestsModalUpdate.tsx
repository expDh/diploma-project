'use client';

import { useEffect, useState } from 'react';
import { ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalField,
  ModalLabel,
  ModalSelect,
  ModalTextarea,
  ModalActions,
  SaveButton,
  CancelButton,
 } from './requests.styled';



interface Props {
  open: boolean;
  request: any;
  onClose: () => void;
  onSave: (status: string, comment?: string) => Promise<void>;
}

export default function RequestStatusModal({
  open,
  request,
  onClose,
  onSave,
}: Props) {
  const [status, setStatus] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (request) {
      setStatus(request.status);
      setComment(request.comment || '');
    }
  }, [request]);

  if (!open || !request) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalTitle>
          Заявка №{request.id}
        </ModalTitle>

        <ModalField>
          <ModalLabel>Статус</ModalLabel>

          <ModalSelect
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="CREATED">Создана</option>
            <option value="IN_PROGRESS">В работе</option>
            <option value="COMPLETED">Выполнена</option>
            <option value="REJECTED">Отклонена</option>
          </ModalSelect>
        </ModalField>

        <ModalField>
          <ModalLabel>Комментарий</ModalLabel>

          <ModalTextarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </ModalField>

        <ModalActions>
          <CancelButton onClick={onClose}>
            Отмена
          </CancelButton>

          <SaveButton
            onClick={async () => {
              await onSave(status, comment);
            }}
          >
            Сохранить
          </SaveButton>
        </ModalActions>
      </ModalContainer>
    </ModalOverlay>
  );
}