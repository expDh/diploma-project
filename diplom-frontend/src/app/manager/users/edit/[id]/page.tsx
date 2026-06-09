'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import usersStore from '../../../../../stores/usersStore';
import InputAuthContainer from '../../../../../components/Forms/FormAuth/FormAuth';
import Input from '../../../../../components/Input/input';

import {
  FormWrapper,
  FormTitle,
  StyledForm,
  FormGroup,
  SubmitButton
} from '../../../../../styles/form.styled';

type UserForm = {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  role: 'USER' | 'MANAGER' | 'ADMIN';
  position: 'NONE' | 'EMPLOYEE' | 'RESPONSIBLE_PERSON';
};

const EditUserPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const [form, setForm] = useState<UserForm | null>(null);


  useEffect(() => {
    usersStore.getUserById(userId).then(setForm);
  }, [userId]);

  const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  setForm((prev: UserForm | null) => {
    if (!prev) return prev;

    return {
      ...prev,
      [name]: value,
    };
  });
};


  const save = async () => {
    await usersStore.updateUser(userId, form);
    router.push('/admin/users');
  };

  if (!form) return <div>Загрузка...</div>;

  return (
    <FormWrapper>
      <FormTitle>Редактирование пользователя</FormTitle>

      <StyledForm
        onSubmit={e => {
          e.preventDefault();
          save();
        }}
      >
        <FormGroup>
          <Input label="Имя" name="firstName" type="text" value={form.firstName || ''} onChange={change} />
        </FormGroup>

        <FormGroup>
          <Input label="Фамилия" name="lastName" type="text" value={form.lastName || ''} onChange={change} />
        </FormGroup>

        <FormGroup>
          <Input label="Отчество" name="patronymic" type="text" value={form.patronymic || ''} onChange={change} />
        </FormGroup>

        <FormGroup>
          <Input label="Email" name="email" type="email" value={form.email || ''} onChange={change} />
        </FormGroup>

        <FormGroup>
          <label>Роль</label>
          <select name="role" value={form.role} onChange={change}>
            <option value="USER">USER</option>
            <option value="MANAGER">MANAGER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </FormGroup>

        <FormGroup>
          <label>Позиция</label>
          <select name="position" value={form.position} onChange={change}>
            <option value="NONE">Новый пользователь</option>
            <option value="EMPLOYEE">Работник</option>
            <option value="RES_PERSON">Ответственное лицо</option>
          </select>
        </FormGroup>

        <SubmitButton type="submit">Сохранить</SubmitButton>
      </StyledForm>
    </FormWrapper>
  );
};

export default EditUserPage;
