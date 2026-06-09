'use client';
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import storesStore from '@/stores/storesStore';
import resPersonsStore from '@/stores/resPersons';

import EditStoreModal from '@/components/Modals/EditStoreModal';

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
  EditButton
} from '../../../styles/table.styled';

const StoresPage = observer(() => {
  const [editStore, setEditStore] = useState<any>(null);

  useEffect(() => {
    storesStore.fetchStores();
    resPersonsStore.fetchFreeResPersons(); // ← важно: свободные
  }, []);

  return (
    <PageContainer>
      <PageTitle>Магазины</PageTitle>

      <TableWrapper>
        <TableHeader style={{ gridTemplateColumns: '60px 2fr 2fr 0.8fr' }}>
          <HeaderCell>ID</HeaderCell>
          <HeaderCell>Адрес</HeaderCell>
          <HeaderCell>Ответственный</HeaderCell>
          <HeaderCell>Действия</HeaderCell>
        </TableHeader>

        <TableBody>
          {storesStore.stores.map((store: any) => {
            const responsible = store.userStores?.[0]?.user;

            return (
              <Row key={store.id_store} style={{ gridTemplateColumns: '60px 2fr 2fr 0.8fr' }}>
                <Cell>{store.id_store}</Cell>
                <Cell>{store.address}</Cell>
                <Cell>
                  {responsible
                    ? `${responsible.lastName} ${responsible.firstName} ${responsible.patronymic || ''}`.trim()
                    : 'Не назначено'}
                </Cell>
                <ActionsCell>
                  <EditButton
                    onClick={() => {
                      const cleanStore = {
                        id_store: Number(store.id_store || store.id || 0),
                        address: store.address || '',
                        userStores: store.userStores
                          ? JSON.parse(JSON.stringify(store.userStores))
                          : [],
                      };

                      if (cleanStore.id_store === 0) {
                        const index = storesStore.stores.findIndex(
                          (s) => s.address === store.address
                        );
                        cleanStore.id_store = index !== -1 ? index + 1 : 999;
                      }

                      setEditStore(cleanStore);
                    }}
                  >
                    Редактировать
                  </EditButton>
                </ActionsCell>
              </Row>
            );
          })}
        </TableBody>
      </TableWrapper>

      <EditStoreModal
        open={!!editStore}
        store={editStore}
        resPersons={resPersonsStore.freeResPersons}
        onClose={() => setEditStore(null)}
        onSave={async (data) => {
          const storeId = Number(editStore?.id_store || 0);

          if (storeId <= 0) {
            alert('Ошибка: ID магазина не определён');
            return;
          }

          try {
            await storesStore.updateStoreWithResponsible(storeId, data);
            setEditStore(null);
            await storesStore.fetchStores();
            await resPersonsStore.fetchFreeResPersons();
          } catch (err: any) {
            console.error(err);
            alert('Ошибка при сохранении');
          }
        }}
      />

      <EditStoreModal
        open={!!editStore}
        store={editStore}
        resPersons={resPersonsStore.freeResPersons} // ← используем freeResPersons
        onClose={() => setEditStore(null)}
        onSave={async (data) => {
          const storeId = Number(editStore?.id_store || 0);

          console.log('=== Перед отправкой ===');
          console.log('editStore:', editStore);
          console.log('Извлечённый storeId:', storeId);

          if (storeId <= 0) {
            alert(`Ошибка: ID магазина = ${storeId}. Переоткройте модалку.`);
            return;
          }

          try {
            await storesStore.updateStoreWithResponsible(storeId, data);
            console.log('Успешно обновлено!');
            setEditStore(null);
            await storesStore.fetchStores();
            await resPersonsStore.fetchFreeResPersons();
          } catch (err: any) {
            console.error('Ошибка при сохранении:', err.response?.data || err.message);
          }
        }}
      />
    </PageContainer>
  );
});

export default StoresPage;












// 'use client';
// import { useState, useEffect } from 'react';
// import { observer } from 'mobx-react-lite';

// import storesStore from '@/stores/storesStore';
// import resPersonsStore from '@/stores/resPersons';

// import EditStoreModal from '@/components/Modals/EditStoreModal';

// import {
//   PageContainer,
//   DataTable,
//   PageTitle,
//   ActionButtons,
//   EditButton,
// } from '../../../styles/table.styled';

// const StoresPage = observer(() => {
//   const [editStore, setEditStore] = useState<any>(null);

//   useEffect(() => {
//     storesStore.fetchStores();
//     resPersonsStore.fetchFreeResPersons(); // ← важно: свободные
//   }, []);

//   return (
//     <PageContainer>
//       <PageTitle>Магазины</PageTitle>

//       <DataTable>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Адрес</th>
//             <th>Ответственный</th>
//             <th style={{ width: '200px', textAlign: 'center' }}>Действия</th>
//           </tr>
//         </thead>

//         <tbody>
//           {storesStore.stores.map((store: any) => {
//             const responsible = store.userStores?.[0]?.user;

//             return (
//               <tr key={store.id_store}>
//                 <td>{store.id_store}</td>
//                 <td>{store.address}</td>
//                 <td>
//                   {responsible
//                     ? `${responsible.lastName} ${responsible.firstName}`
//                     : 'Не назначено'}
//                 </td>

//                 <td>
//                   <ActionButtons>
//                     <EditButton
//                       onClick={() => {
//                         console.log('Сырые данные:', store);

//                         const cleanStore = {
//                           id_store: Number(store.id_store || store.id || 0),
//                           address: store.address || '',
//                           userStores: store.userStores
//                             ? JSON.parse(JSON.stringify(store.userStores))
//                             : [],
//                         };

//                         // Если id_store === 0 — пытаемся взять индекс + 1 как fallback (временный хак)
//                         if (cleanStore.id_store === 0) {
//                           const index = storesStore.stores.findIndex(
//                             (s) => s.address === store.address,
//                           );
//                           cleanStore.id_store = index !== -1 ? index + 1 : 999; // плохой fallback, только для теста
//                           console.warn('id_store был 0 → применили fallback:', cleanStore.id_store);
//                         }

//                         console.log('Чистый объект для модалки:', cleanStore);
//                         setEditStore(cleanStore);
//                       }}>
//                       Редактировать
//                     </EditButton>
//                   </ActionButtons>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </DataTable>

//       <EditStoreModal
//         open={!!editStore}
//         store={editStore}
//         resPersons={resPersonsStore.freeResPersons} // ← используем freeResPersons
//         onClose={() => setEditStore(null)}
//         onSave={async (data) => {
//           const storeId = Number(editStore?.id_store || 0);

//           console.log('=== Перед отправкой ===');
//           console.log('editStore:', editStore);
//           console.log('Извлечённый storeId:', storeId);

//           if (storeId <= 0) {
//             alert(`Ошибка: ID магазина = ${storeId}. Переоткройте модалку.`);
//             return;
//           }

//           try {
//             await storesStore.updateStoreWithResponsible(storeId, data);
//             console.log('Успешно обновлено!');
//             setEditStore(null);
//             await storesStore.fetchStores();
//             await resPersonsStore.fetchFreeResPersons();
//           } catch (err: any) {
//             console.error('Ошибка при сохранении:', err.response?.data || err.message);
//           }
//         }}
//       />
//     </PageContainer>
//   );
// });

// export default StoresPage;
