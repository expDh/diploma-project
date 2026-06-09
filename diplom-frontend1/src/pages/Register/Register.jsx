// src/pages/Register/Register.jsx
import React, { useState } from 'react';
import FormInput from '../../components/FormInput/FormInput';
import authStore from '../../stores/authStore';
import { RegisterContainer } from './Register.styled';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [patronymic, setPatronymic] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authStore.register(email, password, firstName, lastName, patronymic);
      toast.success('Регистрация прошла успешно!'); // зелёное уведомление об успехе
      setTimeout(() => navigate('/'), 1000); // переход через секунду после уведомления
    } catch (err) {
      const msg = err.response?.data?.message || 'Произошла ошибка';
      toast.error(msg); // красное уведомление об ошибке
    }
  };

  return (
    <RegisterContainer>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          label="Фамилия"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <FormInput
          label="Имя"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <FormInput
          label="Отчество"
          type="text"
          value={patronymic}
          onChange={(e) => setPatronymic(e.target.value)}
        />
        <button type="submit">Зарегистрироваться</button>
      </form>

      {/* ToastContainer отвечает за отображение уведомлений */}
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
    closeButton={({ closeToast }) => (
      <button
        onClick={closeToast}
        style={{
          border: 'none',
          background: 'transparent',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          position: 'relative',
          top: '-4px',  // крестик чуть выше
          right: '-4px' // немного выровнять по краю
        }}
      >
        ×
      </button>
    )}
  />
    </RegisterContainer>
  );
};

export default Register;



// // src/pages/Register/Register.jsx
// import React, { useState } from 'react';
// import FormInput from '../../components/FormInput/FormInput';
// import authStore from '../../stores/authStore';
// import { RegisterContainer } from './Register.styled';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [patronymic, setPatronymic] = useState('');

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await authStore.register(email, password, firstName, lastName, patronymic);
//     navigate('/');
//   };

//   return (
//     <RegisterContainer>
//       <h2>Регистрация</h2>
//       <form onSubmit={handleSubmit}>
//         <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <FormInput label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           <FormInput label="Фамилия" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//         <FormInput label="Имя" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//           <FormInput label="Отчество" type="text" value={patronymic} onChange={(e) => setPatronymic(e.target.value)} />
//         <button type="submit">Зарегистрироваться</button>
//       </form>
//     </RegisterContainer>
//   );
// };

// export default Register;
