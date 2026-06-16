'use client';

import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';



import {
  PageContainer,
  PageTitle,
} from '@/styles/table.styled'; // или любой твой общий стиль страницы
import AddStoreModal from '@/components/Modals/Add/AddStoreModal';
import AddEquipmentModal from '@/components/Modals/Add/AddEquipmentModal';

const AddPage: React.FC = observer(() => {
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);

  return (
    <PageContainer>
      <PageTitle>Добавить новое</PageTitle>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '600px',
        margin: '40px auto'
      }}>
        
        {/* Кнопка Добавить магазин */}
        <button
          onClick={() => setShowStoreModal(true)}
          style={bigButtonStyle('#10b981')}
        >
          Добавить новый магазин
        </button>

        {/* Кнопка Добавить оборудование */}
        <button
          onClick={() => setShowEquipmentModal(true)}
          style={bigButtonStyle('#3b82f6')}
        >
          Добавить оборудование
        </button>

      </div>

      {/* Модалки */}
      <AddStoreModal 
        open={showStoreModal} 
        onClose={() => setShowStoreModal(false)} 
      />

      <AddEquipmentModal 
        open={showEquipmentModal} 
        onClose={() => setShowEquipmentModal(false)} 
      />
    </PageContainer>
  );
});

const bigButtonStyle = (color: string) => ({
  padding: '20px 24px',
  fontSize: '18px',
  fontWeight: '600',
  border: 'none',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  backgroundColor: color,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
});

export default AddPage;