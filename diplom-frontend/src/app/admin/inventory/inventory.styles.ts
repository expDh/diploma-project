import styled from 'styled-components';
import {
  PageContainer,
  PageTitle,
  TableWrapper,
  TableHeader,
  HeaderCell,
  TableBody,
  Row,
  Cell,
} from '@/styles/table.styled';

export {
  PageContainer,
  PageTitle,
  TableWrapper,
  TableBody,
};

export const InventoryHeader = styled(TableHeader)`
  grid-template-columns:
    80px
    1fr
    1fr
    1fr
    1fr;
`;

export const InventoryRow = styled(Row)`
  grid-template-columns:
    80px
    1fr
    1fr
    1fr
    1fr;
`;

export const InventoryCell = styled(Cell)`
  min-height: 58px;
`;

export const InventoryHeaderCell = styled(HeaderCell)`
  min-height: 54px;
`;

export const CreateSection = styled.div`
  background: #161a20;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const Select = styled.select`
  background: #1f2937;
  border: 1px solid #374151;
  color: #f3f4f6;
  border-radius: 8px;
  padding: 12px;
  min-width: 20rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const CommentInput = styled.input`
  background: #1f2937;
  border: 1px solid #374151;
  color: #f3f4f6;
  border-radius: 8px;
  padding: 12px;
  min-width: 20rem;
  height: 48px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const CreateButton = styled.button`
  background: #22c55e;
  color: white;
  border: none;
  height:3rem;
  border-radius: 8px;
  padding: 12px 20px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;

  &:hover {
    background: #16a34a;
  }
`;

export const OpenLink = styled.button`
  color: #60a5fa;
  text-decoration: none;
  font-weight: 500;
    padding:10px;
  &:hover {
    color: #93c5fd;
  }
`;

export const StatusBadge = styled.div<{ status: string }>`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;

  background:
    ${({ status }) =>
      status === 'Проведена'
        ? '#14532d'
        : '#78350f'};

  color:
    ${({ status }) =>
      status === 'Проведена'
        ? '#bbf7d0'
        : '#fde68a'};
`;