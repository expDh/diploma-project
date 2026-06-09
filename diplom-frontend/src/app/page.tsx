'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import authStore from '../stores/authStore';
import { PageContainer } from '../styles/table.styled';

const HomePage = observer(() => {
  const user = authStore.user;

  if (!user) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h1>Система инвентарного учёта</h1>
          <p>Пожалуйста, авторизуйтесь для работы с системой.</p>
        </div>
      </PageContainer>
    );
  }

  const isResPerson = user.position === 'RES_PERSON';
  const isRegularUser = user.role === 'USER' && user.position === 'EMPLOYEE';

  return (
    <PageContainer>
      <div style={{
        maxWidth: '700px',
        margin: '80px auto',
        textAlign: 'center',
        padding: '40px 30px',
        
        background: '#161a20',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
      }}>
        

        <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '30px' }}>
          Система инвентарного учёта оборудования
        </p>

        {/* Блок "Ваша роль" — показываем только если роль не USER */}
        {user.role !== 'USER' && (
          <div style={{ 
            background: '#1e2937', 
            padding: '18px', 
            borderRadius: '8px',
            marginBottom: '25px'
          }}>
            <strong>Ваша роль:</strong> 
            <span style={{ 
              marginLeft: '10px',
              padding: '6px 14px',
              background: '#334155',
              borderRadius: '20px',
              color: '#c4d0ff'
            }}>
              {user.role === 'ADMIN' ? 'Администратор' : 
               user.role === 'MANAGER' ? 'Менеджер' : user.role}
            </span>
          </div>
        )}

        {isResPerson && (
          <div style={{ 
            background: '#334155', 
            color: '#ffffff', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3>Вы - Ответственное лицо</h3>
            <p>Теперь вы можете просматривать оборудование магазина, за который отвечаете.</p>
          </div>
        )}

        {isRegularUser && (
          <div style={{ 
            background: '#334155',
            color: '#ddd6fe', 
            padding: '20px', 
            borderRadius: '12px'
          }}>
            
            <p style={{ lineHeight: '1.7', marginTop: '12px' }}>
              Для получения доступа к системе свяжитесь с менеджером<br />
              и попросите назначить вас ответственным за магазин.
            </p>

            <div style={{ 
              textAlign: 'right',
              marginTop: '20px'
            }}>
              <strong>Почта для связи:</strong><br />
              <span style={{ fontSize: '17px', color: '#c4d0ff' }}>
                manager@mail.ru
              </span>
            </div>
          </div>
        )}

        {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
          <div style={{ 
            background: '#1e2937', 
            padding: '20px', 
            borderRadius: '8px'
          }}>
            <h3>Доступен полный функционал системы</h3>
            
          </div>
        )}
      </div>
    </PageContainer>
  );
});

export default HomePage;