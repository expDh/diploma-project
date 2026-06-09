import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 24px;
  background-color: #0f1115;
  min-height: 100vh;
  color: #e5e7eb;
  font-family: Inter, Arial, sans-serif;
`;

export const PageTitle = styled.h1`
  text-align: left;
  margin: 0 0 30px 0;
  font-size: 28px;
  font-weight: 600;
  color: #f3f4f6;
`;

export const FilterContainer = styled.div`
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const FilterLabel = styled.label`
  font-size: 15px;
  color: #9ca3af;
  font-weight: 500;
  white-space: nowrap;
`;

export const Select = styled.select`
  background-color: #161a20;
  color: #e5e7eb;
  border: 1px solid #232833;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 15px;
  min-width: 320px;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

export const DataTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  background-color: #161a20;
  border-radius: 10px;
  overflow: hidden;

  th,
  td {
    padding: 15px 12px;
    font-size: 14px;
    color: #e5e7eb;
    border-bottom: 1px solid #232833;
    border-right: 1px solid #2a2f3a;
    white-space: normal;
    text-align: center;
  justify-content: center;
  align-items: center;
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  th {
    background-color: #1f2937;
    color: #9ca3af;
    font-weight: 500;
    
    text-transform: uppercase;
    letter-spacing: 0.04em;
    border-right: 1px solid #2a2f3a;
    text-align: center;
  }

  tbody tr {
    transition: background-color 0.15s ease;
  }

  tbody tr:hover {
    background-color: #1e2530;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

/* Специальные стили для колонок */
export const DateCell = styled.td`
  width: 160px;
  color: #a1a1aa;
`;

export const StoreCell = styled.td`
  width: 220px;
`;

export const EquipmentCell = styled.td`
  width: 280px;
  font-weight: 500;
`;

export const OperationCell = styled.td`
  width: 140px;
  text-align: center;
  font-weight: 500;
`;

export const QuantityCell = styled.td`
  width: 120px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`;

export const CommentCell = styled.td`
  color: #9ca3af;
`;

export const AuthorCell = styled.td`
  width: 160px;
  color: #a1a1aa;
`;

/* Сообщения */
export const LoadingText = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #9ca3af;
  font-size: 16px;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #6b7280;
  font-size: 16px;
`;

export const DownloadButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`;

export const DownloadButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  &.excel { background-color: #16a34a; color: white; }
  &.excel:hover { background-color: #15803d; }

  &.pdf { background-color: #ef4444; color: white; }
  &.pdf:hover { background-color: #dc2626; }

  &.word { background-color: #2563eb; color: white; }
  &.word:hover { background-color: #1d4ed8; }
`;