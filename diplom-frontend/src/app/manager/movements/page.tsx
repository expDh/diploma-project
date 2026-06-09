'use client';

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import * as XLSX from 'xlsx';

import storesStore from '@/stores/storesStore';
import movementsStore from '@/stores/movementStore';

import {
  PageContainer,
  PageTitle,
  FilterContainer,
  FilterLabel,
  Select,
  DataTable,
  DateCell,
  StoreCell,
  EquipmentCell,
  OperationCell,
  QuantityCell,
  CommentCell,
  AuthorCell,
  LoadingText,
  EmptyMessage,
  DownloadButtons,
  DownloadButton,
} from './movements.styled';

const MovementsPage = observer(() => {
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>('');

  const loadMovements = () => {
    movementsStore.fetchAllMovements({
      storeId: selectedStore ?? undefined,
      startDate: startDate || undefined,
    });
  };

  useEffect(() => {
    storesStore.fetchStores();
    loadMovements();
  }, [selectedStore, startDate]);

  const handleStoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const storeId = e.target.value ? parseInt(e.target.value) : null;
    setSelectedStore(storeId);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const resetFilters = () => {
    setSelectedStore(null);
    setStartDate('');
  };

  const handleDownloadExcel = async () => {
    if (movementsStore.movements.length === 0) return alert('Нет данных для выгрузки');

    const data = movementsStore.movements.map((m: any, i: number) => ({
      '№': i + 1,
      'Дата и время': movementsStore.formatDate(m.date),
      Магазин: m.store?.address || '-',
      Оборудование:
        `${m.equipment?.name || ''} ${m.equipment?.model ? `(${m.equipment.model})` : ''}`.trim(),
      Операция: m.operation_type,
      Количество: m.quantity >= 0 ? `+${m.quantity}` : m.quantity,
      Комментарий: m.comment || '-',
      Автор: movementsStore.getAuthorName ? movementsStore.getAuthorName(m.creator) : '—',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Регистр');

    const filename = `Движения_${selectedStore ? `Магазин_${selectedStore}` : 'Все'}${startDate ? `_с_${startDate}` : ''}_${new Date().toISOString().slice(0, 10)}.xlsx`;

    XLSX.writeFile(wb, filename);
  };

  const handleDownloadWord = () => {
    if (movementsStore.movements.length === 0) {
      return alert('Нет данных для выгрузки в Word');
    }

    let html = `
      <meta charset="UTF-8">
      <h2 style="text-align:center; font-family:Arial; color:#1e40af;">Регистр движений оборудования</h2>
      <p style="text-align:center; font-family:Arial; color:#374151;">
        ${selectedStore ? `Магазин: ${storesStore.stores.find((s) => s.id_store === selectedStore)?.address || ''}` : 'Все магазины'}
        ${startDate ? ` | С даты: ${startDate}` : ''}
      </p>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 10pt; margin-top: 10px;">
        <thead>
          <tr style="background-color: #1e40af; color: white; text-align: center;">
            <th style="width: 40px;">№</th>
            <th style="width: 110px;">Дата и время</th>
            <th style="width: 130px;">Магазин</th>
            <th style="width: 180px;">Оборудование</th>
            <th style="width: 90px;">Операция</th>
            <th style="width: 70px;">Количество</th>
            <th style="width: 130px;">Комментарий</th>
            <th style="width: 100px;">Автор</th>
          </tr>
        </thead>
        <tbody>
    `;

    movementsStore.movements.forEach((m: any, i: number) => {
      const qtyColor = m.quantity >= 0 ? 'green' : 'red';
      const author = movementsStore.getAuthorName
        ? movementsStore.getAuthorName(m.creator)
        : `${m.creator?.firstName || ''} ${m.creator?.lastName || ''}`.trim() || '—';

      html += `
        <tr>
          <td style="text-align:center;">${i + 1}</td>
          <td>${movementsStore.formatDate(m.date)}</td>
          <td>${m.store?.address || '-'}</td>
          <td>${m.equipment?.name || ''} ${m.equipment?.model ? `(${m.equipment.model})` : ''}</td>
          <td style="text-align:center;">${m.operation_type}</td>
          <td style="text-align:center; font-weight:bold; color:${qtyColor};">${m.quantity >= 0 ? '+' : ''}${m.quantity}</td>
          <td>${m.comment || '—'}</td>
          <td>${author}</td>
        </tr>
      `;
    });

    html += `</tbody></table>`;

    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    const dateStr = new Date().toISOString().slice(0, 10);
    const storePart = selectedStore ? `Магазин_${selectedStore}` : 'Все_магазины';
    const datePart = startDate ? `_с_${startDate}` : '';
    link.download = `Регистр_движений_${storePart}${datePart}_${dateStr}.doc`;

    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <PageContainer>
      <PageTitle>Регистр движений оборудования</PageTitle>

      <FilterContainer>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <FilterLabel>Магазин:</FilterLabel>
            <Select value={selectedStore || ''} onChange={handleStoreChange}>
              <option value="">Все магазины</option>
              {storesStore.stores.map((store: any) => (
                <option key={store.id_store} value={store.id_store}>
                  {store.address}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <FilterLabel>Дата с:</FilterLabel>
            <input
              type="date"
              value={startDate}
              onChange={handleDateChange}
              style={{
                backgroundColor: '#161a20',
                color: '#e5e7eb',
                border: '1px solid #232833',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '15px',
                minWidth: '160px',
              }}
              className="dark:[color-scheme:dark]"
            />
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', alignItems: 'end' }}>
            <button
              onClick={resetFilters}
              style={{
                padding: '10px 16px',
                background: '#374151',
                color: 'white',
                borderRadius: '8px',
              }}>
              Сбросить
            </button>

            <DownloadButton onClick={handleDownloadExcel} className="excel">
              ↓ Excel
            </DownloadButton>
            <DownloadButton onClick={handleDownloadWord} className="word">
              ↓ Word
            </DownloadButton>
          </div>
        </div>
      </FilterContainer>

      {movementsStore.loading ? (
        <LoadingText>Загрузка движений...</LoadingText>
      ) : (
        <DataTable>
          <thead>
            <tr>
              <th>Номер</th>
              <th>Дата и время</th>
              <th>Магазин</th>
              <th>Оборудование</th>
              <th>Операция</th>
              <th>Количество</th>
              <th>Комментарий</th>
              <th>Автор</th>
            </tr>
          </thead>
          <tbody>
            {movementsStore.movements.map((m: any) => (
              <tr key={m.id}>
                <td style={{ textAlign: 'center' }}>{m.id}</td>
                <DateCell>{movementsStore.formatDate(m.date)}</DateCell>
                <StoreCell>{m.store?.address || '—'}</StoreCell>
                <EquipmentCell>
                  {m.equipment?.name}
                  {m.equipment?.model && ` (${m.equipment.model})`}
                </EquipmentCell>
                <OperationCell>{m.operation_type}</OperationCell>
                <QuantityCell style={{ color: m.quantity >= 0 ? '#4ade80' : '#f87171' }}>
                  {m.quantity > 0 ? `+${m.quantity}` : m.quantity}
                </QuantityCell>
                <CommentCell>{m.comment || '—'}</CommentCell>
                <AuthorCell>
                  {m.creator
                    ? [m.creator.firstName, m.creator.lastName].filter(Boolean).join(' ') || '—'
                    : '—'}
                </AuthorCell>
              </tr>
            ))}
          </tbody>
        </DataTable>
      )}

      {!movementsStore.loading && movementsStore.movements.length === 0 && (
        <EmptyMessage>Движений по выбранным фильтрам не найдено</EmptyMessage>
      )}
    </PageContainer>
  );
});

export default MovementsPage;
