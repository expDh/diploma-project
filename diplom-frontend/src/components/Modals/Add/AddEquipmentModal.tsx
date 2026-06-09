'use client';

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import equipmentsStore from '@/stores/equipmentsStore';
import * as S from './AddModal.styled';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddEquipmentModal: React.FC<Props> = observer(({ open, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    model: '',
    inventoryNumber: '',
    storeId: '',
    status: 'Используется',
    initialQuantity: 1,
    comment: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) equipmentsStore.fetchStores();
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.storeId) {
      return alert('Название оборудования и магазин — обязательны');
    }

    setLoading(true);
    try {
      await equipmentsStore.createEquipment({
        name: form.name.trim(),
        model: form.model.trim() || undefined,
        // inventoryNumber: form.inventoryNumber ? Number(form.inventoryNumber) : undefined,
        storeId: Number(form.storeId),
        status: form.status,
        initialQuantity: Number(form.initialQuantity),
        comment: form.comment.trim() || undefined,
      });

      // alert('Оборудование успешно добавлено!');
      setForm({ name: '', model: '', inventoryNumber: '', storeId: '', status: 'Используется', initialQuantity: 1, comment: '' });
      onClose();
    } catch (err: any) {
      // alert(err.response?.data?.message || 'Ошибка при добавлении оборудования');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <S.Overlay onClick={onClose}>   {/* ← клик по фону закрывает */}
      <S.Modal onClick={e => e.stopPropagation()}>   {/* ← защищаем модалку */}
        <S.Title>Добавить оборудование</S.Title>

        <S.Input
          name="name"
          placeholder="Название оборудования *"
          value={form.name}
          onChange={handleChange}
          required
        />

        <S.Input
          name="model"
          placeholder="Модель"
          value={form.model}
          onChange={handleChange}
        />

        {/* <S.Input
          name="inventoryNumber"
          type="number"
          placeholder="Инвентарный номер"
          value={form.inventoryNumber}
          onChange={handleChange}
        /> */}

        <S.Select name="storeId" value={form.storeId} onChange={handleChange} required>
          <option value="">Выберите магазин *</option>
          {equipmentsStore.stores.map((store: any) => (
            <option key={store.id_store} value={store.id_store}>
              {store.address}
            </option>
          ))}
        </S.Select>

        <S.Select name="status" value={form.status} onChange={handleChange}>
          <option value="Используется">Используется</option>
          <option value="На складе">На складе</option>
          <option value="Списано">Списано</option>
        </S.Select>

        <S.Input
          name="initialQuantity"
          type="number"
          min="1"
          placeholder="Начальное количество"
          value={form.initialQuantity}
          onChange={handleChange}
        />

        <S.Textarea
          name="comment"
          placeholder="Комментарий (необязательно)"
          value={form.comment}
          onChange={handleChange}
        />

        <S.ButtonGroup>
          <S.CancelButton onClick={onClose} disabled={loading}>
            Отмена
          </S.CancelButton>
          <S.SaveButton onClick={handleSave} disabled={loading || !form.name || !form.storeId}>
            {loading ? 'Добавление...' : 'Добавить оборудование'}
          </S.SaveButton>
        </S.ButtonGroup>
      </S.Modal>
    </S.Overlay>
  );
});

export default AddEquipmentModal;