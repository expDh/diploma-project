'use client';

import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';

import inventoryStore from '@/stores/inventoryStore';
import { storesApi } from '@/api/api';

import {
  PageContainer,
  PageTitle,
  TableWrapper,
  TableBody,
  InventoryHeader,
  InventoryHeaderCell,
  InventoryRow,
  InventoryCell,
  CreateSection,
  FormRow,
  Select,
  CommentInput,
  CreateButton,
  OpenLink,
  StatusBadge,
} from './inventory.styles';

interface Store {
  id_store: number;
  address: string;
}

const InventoryPage = observer(() => {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    inventoryStore.fetchInventories();

    const loadStores = async () => {
      const res = await storesApi.getAllStores();
      setStores(res.data);
    };

    loadStores();
  }, []);

  const handleCreate = async () => {
    if (!selectedStore) {
      // alert('Выберите магазин');
      return;
    }

    try {
      await inventoryStore.createInventory(
        selectedStore,
        comment,
      );

      setComment('');

      // alert('Акт успешно создан');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PageContainer>
      <PageTitle>
        Инвентаризации
      </PageTitle>

      <CreateSection>
        <h2 className="text-xl font-semibold mb-5">
          Создать новый акт
        </h2>

        <FormRow>
          <Select
            value={selectedStore}
            onChange={(e) =>
              setSelectedStore(Number(e.target.value))
            }
          >
            <option value={0}>
              Выберите магазин
            </option>

            {stores.map((store) => (
              <option
                key={store.id_store}
                value={store.id_store}
              >
                {store.address}
              </option>
            ))}
          </Select>

          <CommentInput
            placeholder="Комментарий"
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
          />

          <CreateButton onClick={handleCreate}>
            Создать акт
          </CreateButton>
        </FormRow>
      </CreateSection>

      <TableWrapper>
        <InventoryHeader>
          <InventoryHeaderCell>
            ID
          </InventoryHeaderCell>

          <InventoryHeaderCell>
            Магазин
          </InventoryHeaderCell>

          <InventoryHeaderCell>
            Дата
          </InventoryHeaderCell>

          <InventoryHeaderCell>
            Статус
          </InventoryHeaderCell>

          <InventoryHeaderCell>
            Действия
          </InventoryHeaderCell>
        </InventoryHeader>

        <TableBody>
          {inventoryStore.inventories.map(
            (inventory) => (
              <InventoryRow
                key={inventory.id_inventory}
              >
                <InventoryCell>
                  {inventory.id_inventory}
                </InventoryCell>

                <InventoryCell>
                  {inventory.store?.address}
                </InventoryCell>

                <InventoryCell>
                  {new Date(
                    inventory.inventory_date,
                  ).toLocaleString()}
                </InventoryCell>

                <InventoryCell>
                  <StatusBadge
                    status={inventory.status}
                  >
                    {inventory.status}
                  </StatusBadge>
                </InventoryCell>

                <InventoryCell>
                  <Link
                    href={`/admin/inventory/${inventory.id_inventory}`}
                    
                    
                  >
                    <OpenLink>
                      Открыть
                    </OpenLink>
                  </Link>
                </InventoryCell>
              </InventoryRow>
            ),
          )}
        </TableBody>
      </TableWrapper>
    </PageContainer>
  );
});

export default InventoryPage;