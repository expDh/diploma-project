import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usersStore from '../../stores/usersStore';

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    usersStore.getUserById(id).then(setForm);
  }, [id]);

  if (!form) return <div>Загрузка...</div>;

  const change = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const save = async () => {
    await usersStore.updateUser(id, {
      firstName: form.firstName,
      lastName: form.lastName,
      patronymic: form.patronymic,
      email: form.email,
      role: form.role,
      position: form.position,
    });

    navigate('/users');
  };

  return (
    <div>
      <h2>Редактирование пользователя</h2>

      <input name="firstName" value={form.firstName || ''} onChange={change} placeholder="Имя" />
      <input name="lastName" value={form.lastName || ''} onChange={change} placeholder="Фамилия" />
      <input name="patronymic" value={form.patronymic || ''} onChange={change} placeholder="Отчество" />
      <input name="email" value={form.email} onChange={change} />

      <select name="role" value={form.role} onChange={change}>
        <option value="USER">USER</option>
        {/* <option value="RESPONSIBLE_PERSON">RESPONSIBLE_PERSON</option>
        <option value="COMMISSION">COMMISSION</option> */}
        <option value="ADMIN">ADMIN</option>
      </select>

      <select name="position" value={form.position} onChange={change}>
        <option value="NONE">NONE</option>
        <option value="EMPLOYEE">EMPLOYEE</option>
        <option value="RESPONSIBLE_PERSON">RESPONSIBLE_PERSON</option>
      </select>

      <button onClick={save}>Сохранить</button>
    </div>
  );
};

export default EditUserPage;
