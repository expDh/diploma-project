'use client';

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'next/navigation';

import inventoryStore from '@/stores/inventoryStore';

import {
  PageContainer,
  PageTitle,
  TableWrapper,
  TableBody,
  InfoCard,
  InfoRow,
  InventoryHeader,
  InventoryHeaderCell,
  InventoryRow,
  InventoryCell,
  FactInput,
  ResultBadge,
  FinishButton,
  StatusBadge,
} from './inventory-details.styles';

const InventoryDetailsPage = observer(() => {
  const params = useParams();

  const id = Number(params.id);

  useEffect(() => {
    inventoryStore.fetchInventoryById(id);

    return () => {
      inventoryStore.clearCurrentInventory();
    };
  }, [id]);

  const inventory = inventoryStore.currentInventory;

  if (!inventory) {
    return <PageContainer>Загрузка...</PageContainer>;
  }

  const handleFactChange = async (itemId: number, value: string) => {
    const countFact = Number(value);

    if (isNaN(countFact)) return;

    await inventoryStore.updateInventoryItem(inventory.id_inventory, itemId, countFact);
  };

  const handleFinish = async () => {
    if (!confirm('Провести инвентаризацию?')) {
      return;
    }

    try {
      await inventoryStore.finishInventory(inventory.id_inventory);

      // alert('Инвентаризация успешно проведена');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PageContainer>
      <PageTitle>Акт инвентаризации №{inventory.id_inventory}</PageTitle>

      <InfoCard>
        <InfoRow>
          <b>Магазин:</b> <span>{inventory.store?.address}</span>
        </InfoRow>

        <InfoRow>
          <b>Статус:</b> <StatusBadge status={inventory.status}>{inventory.status}</StatusBadge>
        </InfoRow>
      </InfoCard>

      <TableWrapper>
        <InventoryHeader>
          <InventoryHeaderCell>Оборудование</InventoryHeaderCell>

          <InventoryHeaderCell>Модель</InventoryHeaderCell>

          <InventoryHeaderCell>По системе</InventoryHeaderCell>

          <InventoryHeaderCell>По факту</InventoryHeaderCell>

          <InventoryHeaderCell>Результат</InventoryHeaderCell>
        </InventoryHeader>

        <TableBody>
          {inventory.inventoryItems?.map((item) => (
            <InventoryRow key={item.id}>
              <InventoryCell>{item.equipment?.name}</InventoryCell>

              <InventoryCell>{item.equipment?.model || '—'}</InventoryCell>

              <InventoryCell>{item.count_system}</InventoryCell>

              <InventoryCell>
                <FactInput
                  type="number"
                  defaultValue={item.count_fact ?? ''}
                  disabled={inventory.status === 'Проведена'}
                  onBlur={(e) => handleFactChange(item.id, e.target.value)}
                />
              </InventoryCell>

              <InventoryCell>
                <ResultBadge status={item.status_fact}>{item.status_fact || '—'}</ResultBadge>
              </InventoryCell>
            </InventoryRow>
          ))}
        </TableBody>
      </TableWrapper>

      {inventory.status !== 'Проведена' && (
        <FinishButton onClick={handleFinish}>Провести инвентаризацию</FinishButton>
      )}
    </PageContainer>
  );
});

export default InventoryDetailsPage;
