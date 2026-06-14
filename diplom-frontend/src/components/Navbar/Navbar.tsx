'use client';

import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import authStore from '../../stores/authStore';

import {
  NavBarContainer,
  NavLinks,
  BurgerButton,
  MobileMenu,
  UserInfo,
  RightSection,
} from './Navbar.styled';

const Navbar: React.FC = observer(() => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!authStore.user && authStore.isAuthenticated === false) {
    return (
      <NavBarContainer>
        <NavLinks>
          <Link href="/">Главная</Link>
        </NavLinks>

        <RightSection>
          <Link href="/login">Авторизация</Link>
          <Link href="/register">Регистрация</Link>
        </RightSection>
      </NavBarContainer>
    );
  }

  const isAdmin = authStore.user?.role === 'ADMIN';
  const isManager = authStore.user?.role === 'MANAGER';
  const isResPerson = authStore.user?.position === 'RES_PERSON';

  return (
    <NavBarContainer>
      {/* Основное меню (десктоп) */}
      <NavLinks>
        <Link href="/">Главная</Link>
        {isResPerson && (
          <>
            <Link href="/res/equipments">Инвентарь магазина</Link>
            <Link href="/res/requests">Создать заявку</Link>
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
            <Link href="/manager/requests">Заявки</Link>
          </>
        )}
        {isAdmin && (
          <>
            <Link href="/admin/users">Пользователи</Link>
            <Link href="/admin/resPersons">Ответственные лица</Link>
            <Link href="/admin/equipments">Оборудование</Link>
            <Link href="/admin/stores">Магазины</Link>
            <Link href="/admin/inventory">Акты инвентаризации</Link>
            <Link href="/admin/movements">Регистр движений</Link>
            <Link href="/admin/add">Добавить</Link>
            <Link href="/admin/requests">Заявки</Link>
          </>
        )}
      </NavLinks>

      <RightSection>
        {authStore.isAuthenticated ? (
          <UserInfo>
            <span>{authStore.user?.email}</span>
            <button
              onClick={async () => {
                await authStore.logout();
                router.push('/');
              }}>
              Выйти
            </button>
          </UserInfo>
        ) : (
          <>
            <Link href="/login">Авторизация</Link>
            <Link href="/register">Регистрация</Link>
          </>
        )}

        <BurgerButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </BurgerButton>
      </RightSection>

      {/* Мобильное меню */}
      <MobileMenu $isOpen={isMobileMenuOpen}>
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
          Главная
        </Link>
        {isResPerson && (
          <>
            <Link href="/res/equipments" onClick={() => setIsMobileMenuOpen(false)}>
              Инвентарь магазина
            </Link>
            <Link href="/res/requests" onClick={() => setIsMobileMenuOpen(false)}>
              Создать заявку
            </Link>
          </>
        )}
        {isManager && (
          <>
            <Link href="/manager/users" onClick={() => setIsMobileMenuOpen(false)}>
              Пользователи
            </Link>
            <Link href="/manager/resPersons" onClick={() => setIsMobileMenuOpen(false)}>
              Ответственные лица
            </Link>
            <Link href="/manager/equipments" onClick={() => setIsMobileMenuOpen(false)}>
              Оборудование
            </Link>
            <Link href="/manager/stores" onClick={() => setIsMobileMenuOpen(false)}>
              Магазины
            </Link>
            <Link href="/admin/inventory" onClick={() => setIsMobileMenuOpen(false)}>
              Акты инвентаризации
            </Link>
            <Link href="/admin/movements" onClick={() => setIsMobileMenuOpen(false)}>
              Регистр движений
            </Link>
            <Link href="/manager/add" onClick={() => setIsMobileMenuOpen(false)}>
              Добавить
            </Link>
            <Link href="/manager/requests" onClick={() => setIsMobileMenuOpen(false)}>
              Заявки
            </Link>
          </>
        )}
        {isAdmin && (
          <>
            <Link href="/admin/users" onClick={() => setIsMobileMenuOpen(false)}>
              Пользователи
            </Link>
            <Link href="/admin/resPersons" onClick={() => setIsMobileMenuOpen(false)}>
              Ответственные лица
            </Link>
            <Link href="/admin/equipments" onClick={() => setIsMobileMenuOpen(false)}>
              Оборудование
            </Link>
            <Link href="/admin/stores" onClick={() => setIsMobileMenuOpen(false)}>
              Магазины
            </Link>
            <Link href="/admin/inventory" onClick={() => setIsMobileMenuOpen(false)}>
              Акты инвентаризации
            </Link>
            <Link href="/admin/movements" onClick={() => setIsMobileMenuOpen(false)}>
              Регистр движений
            </Link>
            <Link href="/admin/add" onClick={() => setIsMobileMenuOpen(false)}>
              Добавить
            </Link>
            <Link href="/admin/requests" onClick={() => setIsMobileMenuOpen(false)}>
              Заявки
            </Link>
          </>
        )}
      </MobileMenu>
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

//   if (!authStore.user && authStore.isAuthenticated === false) {

//     return (
//       <NavBarContainer>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//           <Link href="/">Главная</Link>
//         </div>

//         <RightGroup>
//           <Link href="/login">Авторизация</Link>
//           <Link href="/register">Регистрация</Link>
//         </RightGroup>
//       </NavBarContainer>
//     );
//   }

//   const isAdmin = authStore.user?.role === 'ADMIN';
//   const isManager = authStore.user?.role === 'MANAGER';
//   const isResPerson = authStore.user?.position === 'RES_PERSON';
//   const isManagerOrAdmin = authStore.user?.role === 'ADMIN' || authStore.user?.role === 'MANAGER';

//   return (
//     <NavBarContainer>
//       <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//         <Link href="/">Главная</Link>
//         {isResPerson && (
//           <>
//             <Link href="/res/equipments">Инвентарь магазина</Link>
//             {/* <Link href="/info">Информация</Link> */}
//             <Link href="/res/requests">Создать заявку</Link>
//             {/* <Link href="/info">Информация</Link> */}
//           </>

//         )}
//         {isManager && (
//           <>

//             <Link href="/manager/users">Пользователи</Link>
//             <Link href="/manager/resPersons">Ответственные лица</Link>
//             <Link href="/manager/equipments">Оборудование</Link>
//             <Link href="/manager/stores">Магазины</Link>
//             <Link href="/admin/inventory">Акты инвентаризации</Link>

//             <Link href="/admin/movements">Регистр движений</Link>
//             <Link href="/manager/add">Добавить</Link>
//             <Link href="/manager/requests">Заявки</Link>
//           </>
//         )}

//         {isAdmin && (
//           <>
//             <Link href="/admin/users">Пользователи</Link>
//             <Link href="/admin/resPersons">Ответственные лица</Link>
//             <Link href="/admin/equipments">Оборудование</Link>
//             <Link href="/admin/stores">Магазины</Link>
//             <Link href="/admin/inventory">Акты инвентаризации</Link>
//             {/* <Link href="/admin/inventory/[id]">Регистр движений</Link> */}
//             <Link href="/admin/movements">Регистр движений</Link>
//             <Link href="/admin/add">Добавить</Link>
//             <Link href="/admin/requests">Заявки</Link>

//           </>
//         )}

//         {/* {isManagerOrAdmin && <Link href="/admin/movements">Регистр движений</Link>} */}
//       </div>

//       <RightGroup>
//         {authStore.isAuthenticated ? (
//           <>
//             <span>{authStore.user?.email}</span>
//             <button
//               onClick={async () => {
//                 await authStore.logout();
//                 router.push('/');
//               }}>
//               Выйти
//             </button>
//           </>
//         ) : (
//           <>
//             <Link href="/login">Авторизация</Link>
//             <Link href="/register">Регистрация</Link>
//           </>
//         )}
//       </RightGroup>
//     </NavBarContainer>
//   );
// });

// export default Navbar;
