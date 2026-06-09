'use client';

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import authStore from '../../../stores/authStore';
import equipmentsStore from '../../../stores/equipmentsStore';

import {
  PageContainer,
  PageTitle,
  TableWrapper,
  TableHeader,
  TableBody,
  HeaderCell,
  Row,
  Cell,
  ActionsCell,
  WriteOffButton,
  StoreSectionHeader
} from '../../../styles/table.styled';

import WriteOffModal from '../../../components/Modals/WriteOffModal';
import storesStore from '@/stores/storesStore';

const ResPersonInventory = observer(() => {
  const [writeOffEquipment, setWriteOffEquipment] = useState<any>(null);
  const [userStore, setUserStore] = useState<any>(null);

  useEffect(() => {
    if (authStore.user) {
     
      const myStore = authStore.user.userStores?.[0]?.store;
      if (myStore) {
        setUserStore(myStore);
        equipmentsStore.fetchEquipments();
        
      }
    }
  }, []);

  
  const myEquipments = equipmentsStore.equipments.filter(
    (eq: any) => eq.store_id === userStore?.id_store
  );

  if (!userStore) {
    return (
      <PageContainer>
        <PageTitle>Инвентарь магазина</PageTitle>
        <p>Вы не привязаны ни к одному магазину.</p>
      </PageContainer>
    );
  }

//   const myUserStore = authStore.user?.userStores?.[0];

const fullName = authStore.user 
  ? `${authStore.user.firstName || ''} ${authStore.user.lastName || ''}`.trim() || 'Не указано'
  : 'Не назначено';



  return (
    <PageContainer>
      <PageTitle>Инвентарь магазина</PageTitle>
      {/* <h3>{userStore.address}</h3> */}
      <StoreSectionHeader>
                  
                    Адрес - {userStore.address}, ответственное лицо - {fullName}
                  </StoreSectionHeader>

      <TableWrapper>
        <TableHeader style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
          <HeaderCell>ID</HeaderCell>
          <HeaderCell>Название</HeaderCell>
          <HeaderCell>Модель</HeaderCell>
          <HeaderCell>Кол-во</HeaderCell>
          <HeaderCell>Статус</HeaderCell>
          {/* <HeaderCell>Действия</HeaderCell> */}
        </TableHeader>

        <TableBody>
          {myEquipments.map((eq: any) => (
            <Row 
              key={eq.id_equipment} 
              style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}
            >
              <Cell>{eq.id_equipment}</Cell>
              <Cell>{eq.name}</Cell>
              <Cell>{eq.model || '—'}</Cell>
              <Cell>{eq.count || '—'}</Cell>
              <Cell>{eq.status || '—'}</Cell>
              {/* <ActionsCell>
                <WriteOffButton onClick={() => setWriteOffEquipment(eq)}>
                  Списать
                </WriteOffButton>
              </ActionsCell> */}
            </Row>
          ))}
        </TableBody>
      </TableWrapper>

      <WriteOffModal
        open={!!writeOffEquipment}
        equipment={writeOffEquipment}
        onClose={() => setWriteOffEquipment(null)}
        onConfirm={(quantity, comment) => {
          equipmentsStore.writeOffEquipment(writeOffEquipment.id_equipment, quantity, comment);
          setWriteOffEquipment(null);
        }}
      />
    </PageContainer>
  );
});

export default ResPersonInventory;