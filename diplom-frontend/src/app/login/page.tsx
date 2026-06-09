'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';

import FormAuth from '../../components/Forms/FormAuth/FormAuth';
import authStore from '../../stores/authStore';
import { LoginContainer } from './login.styled';

const LoginPage = observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authStore.login(email, password);
      // toast.success('✅ Авторизация прошла успешно!', { autoClose: 2000 });
      router.push('/');
    } catch (err: any) {
      const message = 
        err.response?.data?.message || 
        err.message || 
        'Неверный email или пароль';

      toast.error(message, {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <FormAuth 
          label="Email" 
          type="email" 
          name="email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <FormAuth 
          label="Пароль" 
          type="password" 
          name="password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </LoginContainer>
  );
});

export default LoginPage;

// 'use client'; // обязательно, т.к. используется useState и observer/хуки MobX

// import React, { useState } from 'react';
// import FormAuth from '../../components/Forms/FormAuth/FormAuth';
// import authStore from '../../stores/authStore';
// import { LoginContainer } from './login.styled';
// import { useRouter } from 'next/navigation';

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await authStore.login(email, password);
//     router.push('/');
//   };

//   return (
//     <LoginContainer>
//       <h2>Авторизация</h2>
//       <form onSubmit={handleSubmit}>
//         <FormAuth label="Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <FormAuth label="Пароль" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit">Войти</button>
//       </form>
//     </LoginContainer>
//   );
// };

// export default LoginPage;
