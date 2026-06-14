'use client';

import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import equipmentRequestsStore from '@/stores/equipmentRequestsStore';

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
import RequestStatusModal from '@/components/Modals/Requests/RequestsModalUpdate';

const EquipmentRequestsPage = observer(() => {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  useEffect(() => {
    equipmentRequestsStore.fetchRequests();
  }, []);

  const formatFIO = (user?: any) => {
    if (!user) return '-';

    return [user.lastName, user.firstName, user.patronymic].filter(Boolean).join(' ');
  };

  const formatDate = (date: string) => new Date(date).toLocaleString('ru-RU');

  const formatType = (type: string) => {
    if (type === 'REPAIR') return 'Ремонт';
    return 'Закупка';
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case 'CREATED':
        return 'Создана';
      case 'IN_PROGRESS':
        return 'В работе';
      case 'COMPLETED':
        return 'Выполнена';
      case 'REJECTED':
        return 'Отклонена';
      default:
        return status;
    }
  };

  return (
    <PageContainer>
      <PageTitle>Заявки</PageTitle>

      <TableWrapper>
        <TableHeader
          style={{
            gridTemplateColumns: '60px 1.2fr 2fr 1fr 1fr 2fr 1.5fr 1.5fr 2fr 1.5fr',
          }}>
          <HeaderCell>ID</HeaderCell>
          <HeaderCell>Тип</HeaderCell>
          <HeaderCell>Оборудование</HeaderCell>
          <HeaderCell>Кол-во</HeaderCell>
          <HeaderCell>Статус</HeaderCell>
          <HeaderCell>Магазин</HeaderCell>
          <HeaderCell>Создал</HeaderCell>
          <HeaderCell>Обработал</HeaderCell>
          <HeaderCell>Комментарий</HeaderCell>
          <HeaderCell>Дата</HeaderCell>
        </TableHeader>

        <TableBody>
          {equipmentRequestsStore.requests.length > 0 ? (
            equipmentRequestsStore.requests.map((req: any) => (
              <Row
                key={req.id}
                onClick={() => setSelectedRequest(req)}
                style={{
                  cursor: 'pointer',
                  gridTemplateColumns: '60px 1.2fr 2fr 1fr 1fr 2fr 1.5fr 1.5fr 2fr 1.5fr',
                }}>
                <Cell>{req.id}</Cell>

                <Cell>{formatType(req.type)}</Cell>

                <Cell>
                  {req.equipment ? `${req.equipment.name} ${req.equipment.model ?? ''}` : '-'}
                </Cell>

                <Cell>{req.quantity}</Cell>

                <Cell>{formatStatus(req.status)}</Cell>

                <Cell>{req.store?.address ?? '-'}</Cell>

                <Cell>{formatFIO(req.creator)}</Cell>

                <Cell>{formatFIO(req.handler)}</Cell>

                <Cell>{req.comment || '-'}</Cell>

                <Cell>{formatDate(req.created_at)}</Cell>
              </Row>
            ))
          ) : (
            <Row style={{ gridTemplateColumns: '1fr' }}>
              <Cell
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '30px 0',
                  color: '#888',
                }}>
                Нет заявок
              </Cell>
            </Row>
          )}
        </TableBody>
      </TableWrapper>

      <RequestStatusModal
        open={!!selectedRequest}
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onSave={async (status, comment) => {
          await equipmentRequestsStore.updateStatus(selectedRequest.id, status, comment);

          await equipmentRequestsStore.fetchRequests();

          setSelectedRequest(null);
        }}
      />
    </PageContainer>
  );
});

export default EquipmentRequestsPage;
