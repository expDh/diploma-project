import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 24px;
  background-color: #0f1115;
  min-height: 100vh;
  color: #e5e7eb;
  font-family: Inter, Arial, sans-serif;
`;

export const PageTitle = styled.h1`
  text-align: center;
  margin: 0 0 40px 0;
  font-size: 28px;
  font-weight: 600;
  color: #f3f4f6;
`;

export const TableWrapper = styled.div`
  background: #161a20;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 75px;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 1fr 1fr 1fr 0.7fr 0.7fr 0.7fr 1.2fr;
  justify-content: center;
  background: #1f2937;
  color: #9ca3af;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 0.5px;
`;

export const TableBody = styled.div``;

export const HeaderCell = styled.div`
  padding: 14px 12px;
  border-bottom: 1px solid #232833;
  border-right: 1px solid #303746;
  text-align: center;
  justify-content: center;
  &:last-child {
    border-right: none;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 1fr 1fr 1fr 0.7fr 0.7fr 0.7fr 1.2fr;

  border-bottom: 1px solid #232833;
  transition: background 0.2s;

  &:hover {
    background: #1e2530;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const Cell = styled.div`
  padding: 12px 12px;
  border-right: 1px solid #232833;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
  &:last-child {
    border-right: none;
  }
`;

export const ActionsCell = styled(Cell)`
  justify-content: center;
  gap: 8px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 6px;
`;

export const ActionButton = styled.button`
  width: 42px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.1);
  }
`;

export const EditButton = styled(ActionButton)`
  background: #3b82f6;
  width: 7rem;
  color: white;
`;

export const DeleteButton = styled(ActionButton)`
  background: #ef4444;
  width: 7rem;
  color: white;
`;

export const WriteOffButton = styled(ActionButton)`
  background: #ef4444;
  width: 7rem;
  color: white;
`;

export const StoreSectionHeader = styled.div`
  background: linear-gradient(90deg, #27354b, #202a3f);
  border-left: 0.6rem solid #60a5fa;
  padding: 16px 24px;
  margin-bottom: 24px;
  border-radius: 10px;
  font-size: 16px;
  color: #e0f2fe;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 14px;
`;
