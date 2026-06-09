'use client';

import { useState } from 'react';
import storesStore from '@/stores/storesStore';

export default function AddModal({ onClose }: { onClose: () => void }) {
  const [address, setAddress] = useState('');

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Добавить магазин</h3>

        <input
          style={input}
          placeholder="Адрес магазина"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div style={buttons}>
          <button
            style={saveButton}
            onClick={async () => {
              await storesStore.createStore(address);
              onClose();
            }}
          >
            Сохранить
          </button>

          <button style={cancelButton} onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

const overlay: React.CSSProperties = {
  color:"black",
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.3)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modal: React.CSSProperties = {
  background: '#fff',
  padding: 20,
  borderRadius: 8,
  width: 600,
  height: 200,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const input: React.CSSProperties = {
  color: 'black',
  padding: 10,
  fontSize: 16,
  border:"1px solid black",
  borderRadius:10
};

const buttons: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: 12,
};

const saveButton: React.CSSProperties = {
  padding: '8px 16px',
  background: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
};

const cancelButton: React.CSSProperties = {
  padding: '8px 16px',
  background: '#e0e0e0',
  color: '#000',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
};
