'use client';

import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import usersStore from '../../../stores/usersStore';
import authStore from '../../../stores/authStore';
import ConfirmDeleteModal from '../../../components/Modals/ConfirmDeleteModal';
import EditUserModal from '../../../components/Modals/EditUserModal';

import {
  PageContainer,
  PageTitle,
  
  ActionsCell,
  ActionButtons,
  EditButton,
  DeleteButton,
  TableWrapper,
  TableHeader,
  TableBody,
  HeaderCell,
  Row,
  Cell,
  
} from '../../../styles/table.styled';

const UsersPage = observer(() => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editUser, setEditUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  
const roleNames: Record<string, string> = {
  ADMIN: 'Администратор',
  MANAGER: 'Менеджер',
  USER: 'Пользователь',
};

const positionNames: Record<string, string> = {
  NONE: 'Без должности',
  EMPLOYEE: 'Сотрудник',
  RES_PERSON: 'Ответственное лицо',
};
  useEffect(() => {
    setIsClient(true);
    if (authStore.user?.role === 'ADMIN') {
      usersStore.fetchUsers();
    }
  }, []);
  if (!isClient) {
    return <PageContainer><PageTitle>Загрузка...</PageTitle></PageContainer>;
  }
  if (authStore.user?.role !== 'ADMIN') {
    return <div>Нет доступа</div>;
  }

  const confirmDelete = async () => {
    if (selectedUser) {
      await usersStore.deleteUser(selectedUser.id_users);
      setSelectedUser(null);
    }
  };

  return (
    <PageContainer>
      <PageTitle>Пользователи</PageTitle>

      <TableWrapper>
  <TableHeader>
    <HeaderCell>ID</HeaderCell>
    <HeaderCell>Фамилия</HeaderCell>
    <HeaderCell>Имя</HeaderCell>
    <HeaderCell>Отчество</HeaderCell>
    <HeaderCell>Email</HeaderCell>
    <HeaderCell>Роль</HeaderCell>
    <HeaderCell>Позиция</HeaderCell>
    <HeaderCell>Действия</HeaderCell>
  </TableHeader>

  <TableBody>
    {usersStore.users.map(user => (
      <Row key={user.id_users}>
        <Cell>{user.id_users}</Cell>
        <Cell>{user.lastName || '-'}</Cell>
        <Cell>{user.firstName || '-'}</Cell>
        <Cell>{user.patronymic || '-'}</Cell>
        <Cell>{user.email}</Cell>
        {/* <Cell>{user.role}</Cell>
        <Cell>{user.position}</Cell> */}
        <Cell>{roleNames[user.role] || user.role}</Cell>
  <Cell>{positionNames[user.position] || user.position}</Cell>
        <ActionsCell>
          <EditButton onClick={() => setEditUser(user)}>Редактировать</EditButton>
          <DeleteButton onClick={() => setSelectedUser(user)}>Удалить</DeleteButton>
        </ActionsCell>
      </Row>
    ))}
  </TableBody>
</TableWrapper>

      {/* Модалка редактирования */}
      <EditUserModal open={!!editUser} user={editUser} onClose={() => setEditUser(null)} />

      {/* Модалка подтверждения удаления */}
      <ConfirmDeleteModal
        open={!!selectedUser}
        title="Удаление пользователя"
        message={
          selectedUser ? (
            <>
              Вы уверены, что хотите удалить пользователя
              <br />
              <strong>{selectedUser.email} </strong>?
            </>
          ) : null
        }
        confirmText="Подтвердить"
        cancelText="Отмена"
        onClose={() => setSelectedUser(null)}
        onConfirm={confirmDelete}
      />
    </PageContainer>
  );
});

export default UsersPage;

// 'use client'; // обязательно для MobX и useState

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { observer } from 'mobx-react-lite';
// import usersStore from '../../../stores/usersStore';
// import authStore from '../../../stores/authStore';
// import ConfirmDeleteModal from '../../../components/Modals/ConfirmDeleteModal';
// // import {
// //   UsersPageContainer,
// //   UsersTable,
// //   ActionsCell,
// //   EditButton,
// //   DeleteButton
// // } from './users.styled';

// import {
//   PageContainer,
//   DataTable,
//   TableActions,
//   EditButton,
//   DeleteButton,
//   PageTitle,
// } from '../../../styles/table.styled';
// const UsersPage = observer(() => {
//   const [selectedUser, setSelectedUser] = useState<any>(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (authStore.user?.role === 'ADMIN') {
//       usersStore.fetchUsers();
//     }
//   }, []);

//   if (authStore.user?.role !== 'ADMIN') {
//     return <div>Нет доступа</div>;
//   }

//   const confirmDelete = async () => {
//     await usersStore.deleteUser(selectedUser.id_users);
//     setSelectedUser(null);
//   };

//   return (
//     <PageContainer>
//       <PageTitle>Пользователи</PageTitle>

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
//             <th>Действия</th>
//           </tr>
//         </thead>

//         <tbody>
//           {usersStore.users.map((user) => (
//             <tr key={user.id_users}>
//               <td>{user.id_users}</td>
//               <td>{user.firstName || '-'}</td>
//               <td>{user.lastName || '-'}</td>
//               <td>{user.patronymic || '-'}</td>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//               <td>{user.position}</td>
//               <TableActions>
//                 <EditButton onClick={() => router.push(`/admin/users/edit/${user.id_users}`)}>
//                   Редактировать
//                 </EditButton>
//                 <DeleteButton onClick={() => setSelectedUser(user)}>Удалить</DeleteButton>
//               </TableActions>
//             </tr>
//           ))}
//         </tbody>
//       </DataTable>

//       <ConfirmDeleteModal
//         // open={!!selectedUser}
//         // user={selectedUser}
//         // onClose={() => setSelectedUser(null)}
//         // onConfirm={confirmDelete}
//         open={!!selectedUser}
//         title="Удаление пользователя"
//         message={
//           selectedUser ? (
//             <>
//               Вы уверены, что хотите удалить пользователя
//               <br />
//               <strong>{selectedUser.email} </strong>?
//             </>
//           ) : null
//         }
//         confirmText="Подтвердить"
//         cancelText="Отмена"
//         onClose={() => setSelectedUser(null)}
//         onConfirm={confirmDelete}
//       />
//     </PageContainer>
//   );
// });

// export default UsersPage;
