// src/components/Modals/AddModal.styled.ts
import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: #ffffff;
  padding: 32px;
  border-radius: 12px;
  width: 520px;
  max-width: 90vw;
  color: #111827;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  position: relative;
`;

export const Title = styled.h3`
  margin: 0 0 24px 0;
  text-align: center;
  font-size: 24px;
  color: #1f2937;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  min-height: 80px;
  resize: vertical;
  margin-bottom: 16px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 14px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const CancelButton = styled.button`
  padding: 11px 22px;
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;

  &:hover { background: #4b5563; }
`;

export const SaveButton = styled.button`
  padding: 11px 26px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;

  &:hover { background: #059669; }
  &:disabled { background: #9ca3af; cursor: not-allowed; }
`;