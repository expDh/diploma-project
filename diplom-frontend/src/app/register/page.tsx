'use client';

import React, { useState } from 'react';
import FormInput from '../../components/Forms/FormAuth/FormAuth';
import authStore from '../../stores/authStore';
import { RegisterContainer } from './register.styled';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authStore.register(email, phoneNumber, password, firstName, lastName, patronymic);
      toast.success('Регистрация прошла успешно!');
      setTimeout(() => router.push('/'), 1000);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Произошла ошибка';
      toast.error(msg);
    }
  };

  return (
    <RegisterContainer>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        
        <FormInput name="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput name="phoneNumber" label="Номер телефона" type="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <FormInput name="password" label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <FormInput name="lastName" label="Фамилия" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <FormInput name="firstName" label="Имя" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <FormInput name="patronymic" label="Отчество" type="text" value={patronymic} onChange={(e) => setPatronymic(e.target.value)} />
        <button type="submit">Зарегистрироваться</button>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnHover
        draggable
        transition={Slide}
        style={{ width: 'auto', minWidth: '250px', maxWidth: '400px' }}
        toastStyle={{
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '14px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      />
    </RegisterContainer>
  );
};

export default RegisterPage;
