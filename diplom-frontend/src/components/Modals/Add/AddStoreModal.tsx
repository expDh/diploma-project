'use client';

import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import storesStore from '@/stores/storesStore';
import * as S from './AddModal.styled';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddStoreModal: React.FC<Props> = observer(({ open, onClose }) => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!address.trim()) return alert('Введите адрес магазина');

    setLoading(true);
    try {
      await storesStore.createStore(address.trim());
      alert('✅ Магазин успешно добавлен!');
      setAddress('');
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Ошибка добавления');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <S.Overlay onClick={onClose}>
  <S.Modal onClick={e => e.stopPropagation()}>
        <S.Title>Добавить новый магазин</S.Title>

        <S.Input
          placeholder="г. Макеевка, ул. Ленина, 45"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          autoFocus
        />

        <S.ButtonGroup>
          <S.CancelButton onClick={onClose} disabled={loading}>
            Отмена
          </S.CancelButton>
          <S.SaveButton onClick={handleSave} disabled={loading || !address.trim()}>
            {loading ? 'Добавление...' : 'Добавить магазин'}
          </S.SaveButton>
        </S.ButtonGroup>
      </S.Modal>
    </S.Overlay>
  );
});

export default AddStoreModal;