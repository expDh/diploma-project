'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import authStore from '../../stores/authStore';
import { NavBarContainer, RightGroup } from './Navbar.styled';

const Navbar: React.FC = observer(() => {
  const router = useRouter();

  
  if (!authStore.user && authStore.isAuthenticated === false) {
    
    return (
      <NavBarContainer>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Link href="/">Главная</Link>
        </div>

        <RightGroup>
          <Link href="/login">Авторизация</Link>
          <Link href="/register">Регистрация</Link>
        </RightGroup>
      </NavBarContainer>
    );
  }

  const isAdmin = authStore.user?.role === 'ADMIN';
  const isManager = authStore.user?.role === 'MANAGER';
  const isResPerson = authStore.user?.position === 'RES_PERSON';
  const isManagerOrAdmin = authStore.user?.role === 'ADMIN' || authStore.user?.role === 'MANAGER';

  return (
    <NavBarContainer>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Link href="/">Главная</Link>
        {isResPerson && (
          <>
            <Link href="/res/equipments">Инвентарь магазина</Link>
            {/* <Link href="/info">Информация</Link> */}
          </>
        )}
        {isManager && (
          <>
            
            <Link href="/manager/users">Пользователи</Link>
            <Link href="/manager/resPersons">Ответственные лица</Link>
            <Link href="/manager/equipments">Оборудование</Link>
            <Link href="/manager/stores">Магазины</Link>
            <Link href="/admin/inventory">Акты инвентаризации</Link>
            
            <Link href="/admin/movements">Регистр движений</Link>
            <Link href="/manager/add">Добавить</Link>
          </>
        )}

        {isAdmin && (
          <>
            <Link href="/admin/users">Пользователи</Link>
            <Link href="/admin/resPersons">Ответственные лица</Link>
            <Link href="/admin/equipments">Оборудование</Link>
            <Link href="/admin/stores">Магазины</Link>
            <Link href="/admin/inventory">Акты инвентаризации</Link>
            {/* <Link href="/admin/inventory/[id]">Регистр движений</Link> */}
            <Link href="/admin/movements">Регистр движений</Link>
            <Link href="/admin/add">Добавить</Link>
          </>
        )}

        {/* {isManagerOrAdmin && <Link href="/admin/movements">Регистр движений</Link>} */}
      </div>

      <RightGroup>
        {authStore.isAuthenticated ? (
          <>
            <span>{authStore.user?.email}</span>
            <button
              onClick={async () => {
                await authStore.logout();
                router.push('/');
              }}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Авторизация</Link>
            <Link href="/register">Регистрация</Link>
          </>
        )}
      </RightGroup>
    </NavBarContainer>
  );
});

export default Navbar;

// 'use client';

// import React from 'react';
// import { observer } from 'mobx-react-lite';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import authStore from '../../stores/authStore';
// import { NavBarContainer, RightGroup } from './Navbar.styled';

// const Navbar: React.FC = observer(() => {
//   const router = useRouter();

//   const isAdminOrManager =
//     authStore.isAuthenticated &&
//     (authStore.user?.role === 'ADMIN' || authStore.user?.role === 'MANAGER');

//   return (
//     <NavBarContainer>
//       {/* Левая часть — меню */}
//       <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//         <Link href="/">Главная</Link>

//         {authStore.isAuthenticated && authStore.user.role === 'USER' && (
//           <Link href="/info">Информация</Link>
//         )}

//         {/* Админские разделы */}
//         {authStore.isAuthenticated && authStore.user.role === 'ADMIN' && (
//           <>
//             <Link href="/admin/users">Пользователи</Link>
//             <Link href="/admin/resPersons">Ответственные лица</Link>
//             <Link href="/admin/equipments">Оборудование</Link>
//             <Link href="/admin/stores">Магазины</Link>
//             <Link href="/admin/add">Добавить</Link>
//           </>
//         )}

//         {/* Новый пункт — Регистр движений */}
//         {isAdminOrManager && (
//           <Link
//             href="/admin/movements"

//           >
//             Регистр движений
//           </Link>
//         )}
//       </div>

//       {/* Правая часть */}
//       <RightGroup>
//         {!authStore.isAuthenticated && (
//           <>
//             <Link href="/login">Авторизация</Link>
//             <Link href="/register">Регистрация</Link>
//           </>
//         )}

//         {authStore.isAuthenticated && (
//           <>
//             <span>Привет, {authStore.user.firstName}</span>
//             <button
//               onClick={async () => {
//                 await authStore.logout();
//                 router.push('/');
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

// 'use client';

// import React from 'react';
// import { observer } from 'mobx-react-lite';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import authStore from '../../stores/authStore';
// import { NavBarContainer, RightGroup } from './Navbar.styled';

// const Navbar: React.FC = observer(() => {
//   const router = useRouter();

//   return (
//     <NavBarContainer>
//       {/* Левая часть */}
//       <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//         <Link href="/">Главная</Link>
//         {authStore.isAuthenticated && authStore.user.role === 'USER' && (
//           <Link href="/info">Информация</Link>
//         )}
//         {authStore.isAuthenticated && authStore.user.role === 'ADMIN' && (
//           <Link href="/admin/users">Пользователи</Link>
//         )}
//         {authStore.isAuthenticated && authStore.user.role === 'ADMIN' && (
//           <Link href="/admin/resPersons">Ответственные лица</Link>
//         )}
//         {authStore.isAuthenticated && authStore.user.role === 'ADMIN' && (
//           <Link href="/admin/equipments">Оборудование</Link>
//         )}
//         {authStore.isAuthenticated && authStore.user.role === 'ADMIN' && (
//           <Link href="/admin/stores">Магазины</Link>
//         )}
//         {authStore.isAuthenticated && authStore.user.role === 'ADMIN' && (
//           <Link href="/admin/add">Добавить</Link>
//         )}

//       </div>
//       {/* Правая часть */}
//       <RightGroup>
//         {!authStore.isAuthenticated && (
//           <>
//             <Link href="/login">Авторизация</Link>
//             <Link href="/register">Регистрация</Link>
//           </>
//         )}

//         {authStore.isAuthenticated && (
//           <>
//             <span>Привет, {authStore.user.firstName}</span>
//             <button
//               onClick={async () => {
//                 await authStore.logout();
//                 router.push('/');
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
