'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import equipmentsStore from '@/stores/equipmentsStore';
import equipmentRequestsStore from '@/stores/equipmentRequestsStore';
import { authApi } from '@/api/api';

import {
  PageWrapper,
  FormCard,
  Title,
  Field,
  Label,
  Input,
  Select,
  Textarea,
  Button,
  Row,
} from './resPersonRequests.styled';

const ResPersonRequests = observer(() => {
  const [type, setType] = useState<'REPAIR' | 'PURCHASE'>('REPAIR');
  const [equipmentId, setEquipmentId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [comment, setComment] = useState('');
  const [myStoreId, setMyStoreId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await authApi.getMyProfile();
        
        const userStores = data?.userStores || [];
        const storeLink = userStores[0]; 

        const storeId = storeLink?.store?.id_store || storeLink?.store_id || storeLink?.id;

        if (storeId) {
          setMyStoreId(storeId);
        } else {
          console.error('Магазин не найден в профиле:', data);
        }
      } catch (err) {
        console.error('Ошибка загрузки профиля:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    equipmentsStore.fetchEquipments();
  }, []);

  const availableEquipments = useMemo(() => {
    if (!myStoreId) return [];
    return (equipmentsStore.equipments || []).filter((eq: any) => 
      eq?.store_id === myStoreId || eq?.store?.id_store === myStoreId
    );
  }, [equipmentsStore.equipments, myStoreId]);

  
  const handleSubmit = async () => {
  if (!myStoreId) {
    alert('Не удалось определить ваш магазин');
    return;
  }

  if (type === 'REPAIR' && !equipmentId) {
    alert('Выберите оборудование');
    return;
  }
  if (type === 'PURCHASE' && !comment.trim()) {
    alert('Напишите что нужно закупить');
    return;
  }

  const payload: any = {
    storeId: myStoreId,
    type,
    comment: comment || undefined,
  };

  if (type === 'REPAIR') {
    payload.equipmentId = Number(equipmentId);
    payload.quantity = quantity;
  }

  try {
    await equipmentRequestsStore.createRequest(payload);

    setEquipmentId('');
    setQuantity(1);
    setComment('');

    alert('Заявка успешно отправлена!');
  } catch (e: any) {
    console.error(e);
    alert(e.response?.data?.message || 'Ошибка создания заявки');
  }
};

  if (loading) {
    return <PageWrapper>Загрузка данных...</PageWrapper>;
  }

  if (!myStoreId) {
    return (
      <PageWrapper>
        <FormCard>
          <Title>Ошибка</Title>
          <p>У вас не привязан магазин. Обратитесь к администратору.</p>
        </FormCard>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <FormCard>
        <Title>Создание заявки</Title>

        <Field>
          <Label>Тип заявки</Label>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as 'REPAIR' | 'PURCHASE')}
          >
            <option value="REPAIR">Ремонт</option>
            <option value="PURCHASE">Закупка</option>
          </Select>
        </Field>

        {type === 'REPAIR' && (
          <>
            <Field>
              <Label>Оборудование</Label>
              <Select
                value={equipmentId}
                onChange={(e) => setEquipmentId(e.target.value)}
              >
                <option value="">Выберите оборудование</option>
                {availableEquipments.map((eq: any) => (
                  <option key={eq.id_equipment} value={eq.id_equipment}>
                    {eq.name} {eq.model ? `(${eq.model})` : ''} 
                    {eq.count != null && ` - ${eq.count} шт.`}
                  </option>
                ))}
              </Select>
              {availableEquipments.length === 0 && (
                <p style={{ color: '#f57c00', marginTop: '8px' }}>
                  В вашем магазине нет оборудования
                </p>
              )}
            </Field>

            <Row>
              <Field style={{ flex: 1 }}>
                <Label>Количество</Label>
                <Input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                />
              </Field>
            </Row>
          </>
        )}

        <Field>
          <Label>
            {type === 'PURCHASE' ? 'Что нужно закупить' : 'Комментарий'}
          </Label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={
              type === 'PURCHASE'
                ? 'Например: Мониторы 27" Samsung - 5 шт.'
                : 'Укажите проблему, желаемые сроки и т.д.'
            }
          />
        </Field>

        <Button onClick={handleSubmit}>Отправить заявку</Button>
      </FormCard>
    </PageWrapper>
  );
});

export default ResPersonRequests;