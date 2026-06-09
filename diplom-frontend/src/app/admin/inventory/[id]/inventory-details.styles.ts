import styled from 'styled-components';

import {
  PageContainer,
  PageTitle,
  TableWrapper,
  TableBody,
} from '@/app/admin/inventory/inventory.styles';

export {
  PageContainer,
  PageTitle,
  TableWrapper,
  TableBody,
};

export const InfoCard = styled.div`
  background: #161a20;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 28px;
`;

export const InfoRow = styled.div`
  margin-bottom: 10px;
  font-size: 15px;

  b {
    color: #f3f4f6;
  }

  span {
    color: #d1d5db;
  }
`;

export const InventoryHeader = styled.div`
  display: grid;

  grid-template-columns:
    1fr
    1fr
    1fr
    1fr
    1fr;

  background: #1f2937;
`;

export const InventoryHeaderCell =
  styled.div`
    padding: 16px;

    border-right: 1px solid #303746;

    text-align: center;

    font-size: 13px;
    font-weight: 600;

    color: #9ca3af;

    text-transform: uppercase;

    &:last-child {
      border-right: none;
    }
  `;

export const InventoryRow = styled.div`
  display: grid;

  grid-template-columns:
    1fr
    1fr
    1fr
    1fr
    1fr;

  border-bottom: 1px solid #232833;

  transition: 0.2s;

  &:hover {
    background: #1e2530;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const InventoryCell = styled.div`
  padding: 16px;

  border-right: 1px solid #232833;

  display: flex;

  align-items: center;
  justify-content: center;

  &:last-child {
    border-right: none;
  }
`;

export const FactInput = styled.input`
  width: 8rem;
  height: 38px;

  background: #111827;

  border: 1px solid #374151;
  border-radius: 8px;

  color: white;

  text-align: center;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const ResultBadge = styled.div<{
  status?: string;
}>`
  padding: 6px 12px;

  border-radius: 999px;

  font-size: 13px;
  font-weight: 600;

  background:
    ${({ status }) => {
      switch (status) {
        case 'Совпадает':
          return '#14532d';

        case 'Недостача':
          return '#7f1d1d';

        case 'Излишек':
          return '#78350f';

        default:
          return '#1f2937';
      }
    }};

  color:
    ${({ status }) => {
      switch (status) {
        case 'Совпадает':
          return '#bbf7d0';

        case 'Недостача':
          return '#fecaca';

        case 'Излишек':
          return '#fde68a';

        default:
          return '#d1d5db';
      }
    }};
`;

export const FinishButton = styled.button`
  background: #22c55e;

  color: white;

  border: none;
  border-radius: 8px;

  padding: 14px 22px;

  margin-top: 24px;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: #16a34a;
  }
`;

export const StatusBadge = styled.div<{
  status: string;
}>`
  display: inline-flex;

  padding: 6px 14px;

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