'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import usersStore from '../../../stores/usersStore';
import authStore from '../../../stores/authStore';
import ConfirmDeleteModal from '../../../components/Modals/ConfirmDeleteModal';
import {
  PageContainer,
  PageTitle,
  TableWrapper,
  TableHeader,
  TableBody,
  HeaderCell,
  Row,
  Cell,
} from '../../../styles/table.styled';
import resPersonsStore from '@/stores/resPersons';

const ResPersonsPage = observer(() => {
  const router = useRouter();

  useEffect(() => {
    if (authStore.user?.role === 'MANAGER') {
      resPersonsStore.fetchResPersons();
    }
  }, []);

  if (authStore.user?.role !== 'MANAGER') {
    return <div>Нет доступа</div>;
  }

  return (
    <PageContainer>
      <PageTitle>Ответственные лица</PageTitle>

      <TableWrapper>
        <TableHeader>
          <HeaderCell>ID</HeaderCell>
          <HeaderCell>Имя</HeaderCell>
          <HeaderCell>Фамилия</HeaderCell>
          <HeaderCell>Отчество</HeaderCell>
          <HeaderCell>Email</HeaderCell>
          <HeaderCell>Роль</HeaderCell>
          <HeaderCell>Позиция</HeaderCell>
          <HeaderCell>Адрес магазина</HeaderCell>
        </TableHeader>

        <TableBody>
          {resPersonsStore.resPersons.map((person) => (
            <Row key={person.id}>
              <Cell>{person.id}</Cell>
              <Cell>{person.firstName || '-'}</Cell>
              <Cell>{person.lastName || '-'}</Cell>
              <Cell>{person.patronymic || '-'}</Cell>
              <Cell>{person.email}</Cell>
              <Cell>{person.role}</Cell>
              <Cell>{person.position}</Cell>
              <Cell>{person.address || '—'}</Cell>
            </Row>
          ))}
        </TableBody>
      </TableWrapper>
    </PageContainer>
  );
});

export default ResPersonsPage;
