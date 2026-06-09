// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import FormInput from '../../components/FormInput/FormInput';
import authStore from '../../stores/authStore';
import { LoginContainer } from './Login.styled';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authStore.login(email, password);
    navigate('/');
  };

  return (
    <LoginContainer>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Войти</button>
      </form>
    </LoginContainer>
  );
};

export default Login;
