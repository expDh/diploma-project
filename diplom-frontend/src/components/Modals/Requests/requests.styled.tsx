import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.45);

  z-index: 9999;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 550px;

  background: #fff;

  border-radius: 12px;
color:black;
  padding: 24px;

  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
`;

export const ModalTitle = styled.h2`
  margin: 0 0 20px;
  
`;

export const ModalField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-bottom: 16px;
`;

export const ModalLabel = styled.label`
  font-weight: 500;
`;

export const ModalSelect = styled.select`
  padding: 10px 12px;

  border: 1px solid #d9d9d9;
  border-radius: 8px;

  font-size: 14px;
`;

export const ModalTextarea = styled.textarea`
  min-height: 120px;

  padding: 10px 12px;

  border: 1px solid #d9d9d9;
  border-radius: 8px;

  resize: vertical;

  font-size: 14px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  margin-top: 24px;
`;

export const SaveButton = styled.button`
  padding: 10px 20px;

  border: none;
  border-radius: 8px;

  cursor: pointer;

  background: #1677ff;
  color: white;
`;

export const CancelButton = styled.button`
  padding: 10px 20px;

  border: 1px solid #d9d9d9;
  border-radius: 8px;

  cursor: pointer;

  background: white;
`;