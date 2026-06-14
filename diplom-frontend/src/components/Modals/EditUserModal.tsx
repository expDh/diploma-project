'use client';

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import usersStore from '@/stores/usersStore';
import * as S from './Add/AddModal.styled';

interface Props {
  open: boolean;
  user: any;
  onClose: () => void;
}

const EditUserModal: React.FC<Props> = observer(({ open, user, onClose }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    email: '',
    phoneNumber: '',
    role: 'USER',
    position: 'EMPLOYEE',
  });
  const roleNames: Record<string, string> = {
    USER: 'Пользователь',
    MANAGER: 'Менеджер',
    ADMIN: 'Администратор',
  };

  const positionNames: Record<string, string> = {
    NONE: 'Без должности',
    EMPLOYEE: 'Сотрудник',
    RES_PERSON: 'Ответственное лицо',
  };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && open) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        patronymic: user.patronymic || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        role: user.role || 'USER',
        position: user.position || 'EMPLOYEE',
      });
    }
  }, [user, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await usersStore.updateUser(user.id_users, form);
      alert('Пользователь успешно обновлён!');
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Ошибка при обновлении');
    } finally {
      setLoading(false);
    }
  };

  if (!open || !user) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Title>Редактирование пользователя</S.Title>
        <S.Input
          name="lastName"
          placeholder="Фамилия"
          value={form.lastName}
          onChange={handleChange}
        />

        <S.Input
          name="firstName"
          placeholder="Имя"
          value={form.firstName}
          onChange={handleChange}
        />

        <S.Input
          name="patronymic"
          placeholder="Отчество"
          value={form.patronymic}
          onChange={handleChange}
        />

        <S.Input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <S.Input
          name="phoneNumber"
          type="phoneNumber"
          placeholder="Номер телефона"
          value={form.phoneNumber}
          onChange={handleChange}
        />

        <S.Select name="role" value={form.role} onChange={handleChange}>
          <option value="USER">{roleNames.USER}</option>
          <option value="MANAGER">{roleNames.MANAGER}</option>
          <option value="ADMIN">{roleNames.ADMIN}</option>
        </S.Select>

        <S.Select name="position" value={form.position} onChange={handleChange}>
          <option value="NONE">{positionNames.NONE}</option>
          <option value="EMPLOYEE">{positionNames.EMPLOYEE}</option>
          <option value="RES_PERSON">{positionNames.RES_PERSON}</option>
        </S.Select>

        <S.ButtonGroup>
          <S.CancelButton onClick={onClose} disabled={loading}>
            Отмена
          </S.CancelButton>
          <S.SaveButton onClick={handleSave} disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить изменения'}
          </S.SaveButton>
        </S.ButtonGroup>
      </S.Modal>
    </S.Overlay>
  );
});

export default EditUserModal;
