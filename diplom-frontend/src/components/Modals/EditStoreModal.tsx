'use client';

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import * as S from './EditStoreModal.styled';

interface Props {
  open: boolean;
  store: any;
  resPersons: any[];
  onClose: () => void;
  onSave: (data: { address: string; responsibleId: number | null }) => void;
}

const EditStoreModal: React.FC<Props> = ({ open, store, resPersons, onClose, onSave }) => {
  const [address, setAddress] = useState('');
  const [responsibleId, setResponsibleId] = useState<string>('');

  useEffect(() => {
    if (store) {
      setAddress(store.address || '');
      const currentUserId = store.userStores?.[0]?.user?.id_users;
      setResponsibleId(currentUserId != null ? String(currentUserId) : '');
    }
  }, [store]);

  if (!open) return null;

  const currentResponsible = store?.userStores?.[0]?.user;

  let availablePersons = [...resPersons];

  if (currentResponsible && !availablePersons.some(p => p.id_users === currentResponsible.id_users)) {
    availablePersons.unshift(currentResponsible);
  }

  availablePersons.sort((a, b) => {
    if (a.id_users === currentResponsible?.id_users) return -1;
    if (b.id_users === currentResponsible?.id_users) return 1;
    return (a.lastName || '').localeCompare(b.lastName || '');
  });

  const handleSave = () => {
    const payload = {
      address,
      responsibleId: responsibleId === '' ? null : parseInt(responsibleId, 10),
    };
    onSave(payload);
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={e => e.stopPropagation()}>
        <S.Title>Редактировать магазин</S.Title>

        <div>
          <S.Label>Адрес магазина</S.Label>
          <S.Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="г. Макеевка, ул. Ленина, 45"
          />
        </div>

        <div>
          <S.Label>Ответственное лицо</S.Label>
          <S.Select
            value={responsibleId}
            onChange={(e) => setResponsibleId(e.target.value)}
          >
            <option value="">Не назначено</option>
            {availablePersons.map((p) => (
              <option key={p.id_users} value={String(p.id_users)}>
                {p.lastName} {p.firstName} {p.patronymic || ''}
              </option>
            ))}
          </S.Select>
        </div>

        <S.ButtonGroup>
          <S.CancelButton onClick={onClose}>Отмена</S.CancelButton>
          <S.SaveButton onClick={handleSave}>Сохранить изменения</S.SaveButton>
        </S.ButtonGroup>
      </S.Modal>
    </S.Overlay>
  );
};

export default EditStoreModal;