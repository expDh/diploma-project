'use client'; // обязательно для MobX и useState

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
//   const [selectedUser, setSelectedUser] = useState<any>(null);
  const router = useRouter();
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
  useEffect(() => {
    if (authStore.user?.role === 'ADMIN') {
      resPersonsStore.fetchResPersons();
    }
  }, []);

  if (authStore.user?.role !== 'ADMIN') {
    return <div>Нет доступа</div>;
  }

//   const confirmDelete = async () => {
//     await usersStore.deleteUser(selectedUser.id_users);
//     setSelectedUser(null);
//   };

  return (
    <PageContainer>
      <PageTitle>Ответственные лица</PageTitle>

      <TableWrapper>
        <TableHeader >
          <HeaderCell>ID</HeaderCell>
          <HeaderCell>Фамилия</HeaderCell>
          <HeaderCell>Имя</HeaderCell>
          
          <HeaderCell>Отчество</HeaderCell>
          <HeaderCell>Email</HeaderCell>
          <HeaderCell>Роль</HeaderCell>
          <HeaderCell>Позиция</HeaderCell>
          <HeaderCell>Адрес магазина</HeaderCell>
        </TableHeader>

        <TableBody>
          {resPersonsStore.resPersons.map(person => (
            <Row key={person.id} >
              <Cell>{person.id}</Cell>
              <Cell>{person.lastName || '-'}</Cell>
              <Cell>{person.firstName || '-'}</Cell>
              <Cell>{person.patronymic || '-'}</Cell>
              <Cell>{person.email}</Cell>
              <Cell>{roleNames[person.role] || person.role}</Cell>
              <Cell>{positionNames[person.position] || person.position}</Cell>
              <Cell>{person.address || '—'}</Cell>
            </Row>
          ))}
        </TableBody>
      </TableWrapper>
    </PageContainer>
  );
});

export default ResPersonsPage;




// 'use client'; // обязательно для MobX и useState

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { observer } from 'mobx-react-lite';
// import usersStore from '../../../stores/usersStore';
// import authStore from '../../../stores/authStore';
// import ConfirmDeleteModal from '../../../components/Modals/ConfirmDeleteModal';
// import {
//   PageContainer,
// DataTable,
// TableActions,
// EditButton,
// DeleteButton,
// PageTitle

// } from '../../../styles/table.styled';
// import resPersonsStore from '@/stores/resPersons';


// const ResPersonsPage = observer(() => {
// //   const [selectedUser, setSelectedUser] = useState<any>(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (authStore.user?.role === 'ADMIN') {
//       resPersonsStore.fetchResPersons();
//     }
//   }, []);

//   if (authStore.user?.role !== 'ADMIN') {
//     return <div>Нет доступа</div>;
//   }

// //   const confirmDelete = async () => {
// //     await usersStore.deleteUser(selectedUser.id_users);
// //     setSelectedUser(null);
// //   };

//   return (
//     <PageContainer>
//       <PageTitle>Ответственные лица</PageTitle>

//       <DataTable>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Имя</th>
//             <th>Фамилия</th>
//             <th>Отчество</th>
//             <th>Email</th>
//             <th>Роль</th>
//             <th>Позиция</th>
//             <th>Адрес магазина</th>
            
//           </tr>
//         </thead>

//         <tbody>
//           {resPersonsStore.resPersons.map(person => (
//             <tr key={person.id}>
//               <td>{person.id}</td>
              
//               <td>{person.firstName || '-'}</td>
//               <td>{person.lastName || '-'}</td>
//               <td>{person.patronymic || '-'}</td>
//               <td>{person.email}</td>
//               <td>{person.role}</td>
//               <td>{person.position}</td>
//               <td title={person.address}>{person.address}</td>

//               {/* <ActionsCell>
//                 <EditButton onClick={() => router.push(`/users/edit/${user.id_users}`)}>
//                   Редактировать
//                 </EditButton>
//                 <DeleteButton onClick={() => setSelectedUser(user)}>
//                   Удалить
//                 </DeleteButton>
//               </ActionsCell> */}
//             </tr>
//           ))}
//         </tbody>
//       </DataTable>

//       {/* <ConfirmDeleteModal
//         open={!!selectedUser}
//         user={selectedUser}
//         onClose={() => setSelectedUser(null)}
//         onConfirm={confirmDelete}
//       /> */}
//     </PageContainer>
//   );
// });

// export default ResPersonsPage;
