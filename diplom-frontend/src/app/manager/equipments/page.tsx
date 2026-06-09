'use client';

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import storesStore from '@/stores/storesStore';
import equipmentsStore from '@/stores/equipmentsStore';
import resPersonsStore from '@/stores/resPersons';
import WriteOffModal from '@/components/Modals/WriteOffModal';

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
  StoreSectionHeader,
} from '../../../styles/table.styled';

const StoresPage = observer(() => {
  const [writeOffEquipment, setWriteOffEquipment] = useState<any>(null);

  useEffect(() => {
    storesStore.fetchStores();
    equipmentsStore.fetchEquipments();
    resPersonsStore.fetchResPersons();
  }, []);

  // Группируем оборудование по магазинам
  const storesWithEquipments = storesStore.stores.map((store: any) => {
    const responsible = resPersonsStore.resPersons.find(
      (user: any) => user.address?.trim() === store.address?.trim()
    );

    const equipments = equipmentsStore.equipments.filter(
      (eq: any) => eq.store_id === store.id_store
    );

    return {
      ...store,
      responsible,
      equipments,
    };
  });

  return (
    <PageContainer>
      <PageTitle>Оборудование</PageTitle>

      {storesWithEquipments.map((store: any) => {
        const responsible = store.responsible;
        const fullName = responsible
          ? [responsible.lastName, responsible.firstName, responsible.patronymic]
              .filter(Boolean)
              .join(' ')
          : 'Не назначено';

        return (
          <div key={store.id_store} style={{ marginBottom: '50px' }}>
            <StoreSectionHeader>
            
              Адрес - {store.address}, ответственное лицо - {fullName}
            </StoreSectionHeader>

            <TableWrapper>
              <TableHeader style={{ gridTemplateColumns: '60px 2fr 2fr 1.5fr 1.5fr 1fr' }}>
                <HeaderCell>ID</HeaderCell>
                <HeaderCell>Название</HeaderCell>
                <HeaderCell>Модель</HeaderCell>
                <HeaderCell>Кол-во</HeaderCell>
                <HeaderCell>Статус</HeaderCell>
                <HeaderCell>Действия</HeaderCell>
              </TableHeader>

              <TableBody>
                {store.equipments.length > 0 ? (
                  store.equipments.map((eq: any) => (
                    <Row 
                      key={eq.id_equipment} 
                      style={{ gridTemplateColumns: '60px 2fr 2fr 1.5fr 1.5fr 1fr' }}
                    >
                      <Cell>{eq.id_equipment}</Cell>
                      <Cell>{eq.name}</Cell>
                      <Cell>{eq.model || '—'}</Cell>
                      <Cell>{eq.count || '—'}</Cell>
                      <Cell>{eq.status || '—'}</Cell>
                      <ActionsCell>
                        <WriteOffButton 
                          onClick={() => setWriteOffEquipment(eq)}
                        >
                          Списать
                        </WriteOffButton>
                      </ActionsCell>
                    </Row>
                  ))
                ) : (
                  <Row style={{ gridTemplateColumns: '1fr' }}>
                    <Cell style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '30px 0', color: '#888' }}>
                      В этом магазине нет оборудования
                    </Cell>
                  </Row>
                )}
              </TableBody>
            </TableWrapper>
          </div>
        );
      })}

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

export default StoresPage;




















// 'use client';
// import React, { useEffect, useState } from 'react';
// import { observer } from 'mobx-react-lite';
// import { useRouter } from 'next/navigation';

// import {
//   PageContainer,
//   PageTitle,
//   // SectionHeader,
//   // DataTable,
//   ActionButtons,
//   EditButton,
//   DeleteButton,
// } from '../../../styles/table.styled'; // замените на свои UI-компоненты
// import storesStore from '@/stores/storesStore';
// import equipmentsStore from '@/stores/equipmentsStore';
// import resPersonsStore from '@/stores/resPersons';
// import ConfirmDeleteModal from '@/components/Modals/ConfirmDeleteModal';
// import EditEquipmentModal from '@/components/Modals/EditEquipmentModal';
// import WriteOffModal from '@/components/Modals/WriteOffModal';

// const StoresPage: React.FC = observer(() => {
//   const router = useRouter();
//   const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
//   const [editEquipment, setEditEquipment] = useState<any>(null);
//   const [writeOffEquipment, setWriteOffEquipment] = useState<any>(null);
//   useEffect(() => {
//     storesStore.fetchStores();
//     equipmentsStore.fetchEquipments();
//     resPersonsStore.fetchResPersons();
//   }, []);

//   // Формируем данные для отображения: адрес + ответственный + список оборудования
//   const storesWithEquipments = storesStore.stores.map((store: any) => {
//     const responsible = resPersonsStore.resPersons.find(
//       (user: any) => user.address?.trim() === store.address?.trim(),
//     );

//     const equipments = equipmentsStore.equipments.filter(
//       (eq: any) => eq.store_id === store.id_store,
//     );

//     return {
//       ...store,
//       responsible,
//       equipments,
//     };
//   });

//   return (
//     <PageContainer>
//       <PageTitle>Оборудование</PageTitle>

//       {storesWithEquipments.map((store: any, index: number) => {
//         const { address, responsible, equipments = [] } = store;

//         const fullName = responsible
//           ? [responsible.lastName, responsible.firstName, responsible.patronymic]
//               .filter(Boolean)
//               .join(' ')
//           : 'Не назначено';

//         return (
//           <div key={index} style={{ marginBottom: '30px' }}>
//             <SectionHeader>
//               Адрес: {address} | Ответственное лицо: {fullName}
//             </SectionHeader>

//             <DataTable>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   {/* <th>Инв. №</th> */}
//                   <th>Название</th>
//                   <th>Модель</th>
//                   <th>Количество</th>
//                   <th>Статус</th>
//                   <th style={{ width: '200px', textAlign: 'center' }}>Действия</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {equipments.map((eq: any) => (
//                   <tr key={eq.id_equipment}>
//                     <td>{eq.id_equipment}</td>
//                     {/* <td>{eq.inventory_number || '-'}</td> */}
//                     <td>{eq.name}</td>
//                     <td>{eq.model || '-'}</td>
//                     <td>{eq.count || '-'}</td>
//                     <td>{eq.status || '-'}</td>
//                     <td>
//                       <ActionButtons>
//                         {/* <EditButton onClick={() => setEditEquipment(eq)}>Редактировать</EditButton> */}
//                         <DeleteButton onClick={() => setWriteOffEquipment(eq)}>
//                           Списать
//                         </DeleteButton>
//                       </ActionButtons>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </DataTable>
//           </div>
//         );
//       })}

//       {/* Модалка подтверждения удаления */}
//       {/* <ConfirmDeleteModal
//         open={!!selectedEquipment}
//         user={{ email: selectedEquipment?.name }}
//         onClose={() => setSelectedEquipment(null)}
//         onConfirm={() => {
//           equipmentsStore.deleteEquipment(selectedEquipment.id_equipment);
//           setSelectedEquipment(null);
//         }}
//       /> */}
//       <WriteOffModal
//         open={!!writeOffEquipment}
//         equipment={writeOffEquipment}
//         onClose={() => setWriteOffEquipment(null)}
//         onConfirm={(quantity, comment) => {
//           equipmentsStore.writeOffEquipment(writeOffEquipment.id_equipment, quantity, comment);
//           setWriteOffEquipment(null);
//         }}
//       />

//       {/* Модалка редактирования */}
//       {/* <EditEquipmentModal
//         open={!!editEquipment}
//         equipment={editEquipment}
//         onClose={() => setEditEquipment(null)}
//         onSave={(data) => {
//           equipmentsStore.updateEquipment(editEquipment.id_equipment, data);
//           setEditEquipment(null);
//         }}
//       /> */}
//     </PageContainer>
//   );
// });

// export default StoresPage;

// 'use client';
// import React, { useEffect, useState } from 'react';
// import { observer } from 'mobx-react-lite';
// import { useRouter } from 'next/navigation';

// import {
//   PageContainer,
//   PageTitle,
//   SectionHeader,
//   DataTable,
//   ActionButtons,
//   EditButton,
//   DeleteButton,
// } from '../../../styles/table.styled'; // замените на свои UI-компоненты
// import storesStore from '@/stores/storesStore';
// import equipmentsStore from '@/stores/equipmentsStore';
// import resPersonsStore from '@/stores/resPersons';
// import ConfirmDeleteModal from '@/components/Modals/ConfirmDeleteModal';
// import EditEquipmentModal from '@/components/Modals/EditEquipmentModal';

// const StoresPage: React.FC = observer(() => {
//   const router = useRouter();
//   const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
//   const [editEquipment, setEditEquipment] = useState<any>(null);

//   useEffect(() => {
//     storesStore.fetchStores();
//     equipmentsStore.fetchEquipments();
//     resPersonsStore.fetchResPersons();
//   }, []);

//   // Формируем данные для отображения: адрес + ответственный + список оборудования
//   const storesWithEquipments = storesStore.stores.map((store: any) => {
//     const responsible = resPersonsStore.resPersons.find(
//       (user: any) => user.address?.trim() === store.address?.trim(),
//     );

//     const equipments = equipmentsStore.equipments.filter(
//       (eq: any) => eq.store_id === store.id_store,
//     );

//     return {
//       ...store,
//       responsible,
//       equipments,
//     };
//   });

//   return (
//     <PageContainer>
//       <PageTitle>Оборудование</PageTitle>

//       {storesWithEquipments.map((store: any, index: number) => {
//         const { address, responsible, equipments = [] } = store;

//         const fullName = responsible
//           ? [responsible.lastName, responsible.firstName, responsible.patronymic]
//               .filter(Boolean)
//               .join(' ')
//           : 'Не назначено';

//         return (
//           <div key={index} style={{ marginBottom: '30px' }}>
//             <SectionHeader>
//               Адрес: {address} | Ответственное лицо: {fullName}
//             </SectionHeader>

//             <DataTable>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Инв. №</th>
//                   <th>Название</th>
//                   <th>Модель</th>
//                   <th>Количество</th>
//                   <th>Статус</th>
//                   <th>Действия</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {equipments.map((eq: any) => (
//                   <tr key={eq.id_equipment}>
//                     <td>{eq.id_equipment}</td>
//                     <td>{eq.inventory_number || '-'}</td>
//                     <td>{eq.name}</td>
//                     <td>{eq.model || '-'}</td>
//                     <td>{eq.count || '-'}</td>
//                     <td>{eq.status || '-'}</td>
//                     <td>
//                       <ActionButtons>
//                         {/* <EditButton onClick={() => setEditEquipment(eq)}>Редактировать</EditButton> */}
//                         <DeleteButton onClick={() => setSelectedEquipment(eq)}>
//                           Списать
//                         </DeleteButton>
//                       </ActionButtons>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </DataTable>
//           </div>
//         );
//       })}

//       {/* Модалка подтверждения удаления */}
//       {/* <ConfirmDeleteModal
//         open={!!selectedEquipment}
//         user={{ email: selectedEquipment?.name }}
//         onClose={() => setSelectedEquipment(null)}
//         onConfirm={() => {
//           equipmentsStore.deleteEquipment(selectedEquipment.id_equipment);
//           setSelectedEquipment(null);
//         }}
//       /> */}
//       <ConfirmDeleteModal
//         open={!!selectedEquipment}
//         title="Подтверждение удаления"
//         message={
//           <span>
//             Вы точно хотите удалить оборудование {selectedEquipment?.name} {selectedEquipment?.model} {selectedEquipment?.count}?
//           </span>
//         }
//         onClose={() => setSelectedEquipment(null)}
//         onConfirm={() => {
//           equipmentsStore.deleteEquipment(selectedEquipment.id_equipment);
//           setSelectedEquipment(null);
//         }}
//         confirmText="Удалить"
//         cancelText="Отмена"
//       />

//       {/* Модалка редактирования */}
//       {/* <EditEquipmentModal
//         open={!!editEquipment}
//         equipment={editEquipment}
//         onClose={() => setEditEquipment(null)}
//         onSave={(data) => {
//           equipmentsStore.updateEquipment(editEquipment.id_equipment, data);
//           setEditEquipment(null);
//         }}
//       /> */}
//     </PageContainer>
//   );
// });

// export default StoresPage;
