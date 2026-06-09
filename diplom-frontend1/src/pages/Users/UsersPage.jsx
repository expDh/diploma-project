import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import usersStore from '../../stores/usersStore';
import authStore from '../../stores/authStore';
import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';
import { useNavigate } from 'react-router-dom';
import {
  UsersPageContainer,
  UsersTable,
  ActionsCell,
  EditButton,
  DeleteButton
} from './UsersPage.styled';

const UsersPage = observer(() => {
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStore.user?.role === 'ADMIN') {
      usersStore.fetchUsers();
    }
  }, []);

  if (authStore.user?.role !== 'ADMIN') {
    return <div>Нет доступа</div>;
  }

  const confirmDelete = async () => {
    await usersStore.deleteUser(selectedUser.id_users);
    setSelectedUser(null);
  };

  return (
    <UsersPageContainer>
      <h1>Пользователи</h1>

      <UsersTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Позиция</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          {usersStore.users.map(user => (
            <tr key={user.id_users}>
              <td>{user.id_users}</td>
              <td>{user.firstName || '-'}</td>
              <td>{user.lastName || '-'}</td>
              <td>{user.patronymic || '-'}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.position}</td>
              <ActionsCell>
                <EditButton onClick={() => navigate(`/users/edit/${user.id_users}`)}>
                  Редактировать
                </EditButton>
                <DeleteButton onClick={() => setSelectedUser(user)}>
                  Удалить
                </DeleteButton>
              </ActionsCell>
            </tr>
          ))}
        </tbody>
      </UsersTable>

      <ConfirmDeleteModal
        open={!!selectedUser}
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onConfirm={confirmDelete}
      />
    </UsersPageContainer>
  );
});

export default UsersPage;
