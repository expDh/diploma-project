import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import authStore from '../../stores/authStore';
import { NavBarContainer, RightGroup } from './Navbar.styled';

const Navbar = observer(() => {
  const navigate = useNavigate();

  return (
    <NavBarContainer>
      {/* Левая часть */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Link to="/">Главная</Link>

        {authStore.isAuthenticated && authStore.user.role === 'ADMIN' && (
          <Link to="/users">Пользователи</Link>
        )}
        {authStore.isAuthenticated && authStore.user.role === 'ADMIN' && (
          <Link to="/admin/resPersons">Ответственные лица</Link>
        )}

        {authStore.isAuthenticated && authStore.user.role === 'USER' && (
          <Link to="/info">Информация</Link>
        )}
      </div>

      {/* Правая часть */}
      <RightGroup>
        {!authStore.isAuthenticated && (
          <>
            <Link to="/login">Авторизация</Link>
            <Link to="/register">Регистрация</Link>
          </>
        )}

        {authStore.isAuthenticated && (
          <>
            <span>Привет, {authStore.user.firstName}</span>
            <button
              onClick={async () => {
                await authStore.logout();
                navigate('/');
              }}
            >
              Выйти
            </button>
          </>
        )}
      </RightGroup>
    </NavBarContainer>
  );
});

export default Navbar;



// // src/components/Navbar/Navbar.jsx
// import React from 'react';
// import { observer } from 'mobx-react-lite';
// import { Link, useNavigate } from 'react-router-dom';
// import authStore from '../../stores/authStore';
// import { NavBarContainer, RightGroup } from './Navbar.styled';

// const Navbar = observer(() => {
//   const navigate = useNavigate();

//   return (
//     <NavBarContainer>
//       {/* Левая часть */}
//       <Link to="/">Главная</Link>

//       {/* Правая часть */}
//       <RightGroup>
//         {!authStore.isAuthenticated && (
//           <>
//             <Link to="/login">Авторизация</Link>
//             <Link to="/register">Регистрация</Link>
//           </>
//         )}

//         {authStore.isAuthenticated && (
//           <>
//             <span>Привет, {authStore.user.firstName}</span>
//             <button
//               onClick={async () => {
//                 await authStore.logout();
//                 navigate('/');
//               }}
//             >
//               Выйти
//             </button>
//           </>
//         )}
//       </RightGroup>
//     </NavBarContainer>
//   );
// });

// export default Navbar;
