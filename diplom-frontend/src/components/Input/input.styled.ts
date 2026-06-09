import styled from 'styled-components';

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const FieldLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #444;
`;

const baseControl = `
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #333;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.08);
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const StyledInput = styled.input`
  ${baseControl}
`;

export const StyledSelect = styled.select`
  ${baseControl}
`;

export const StyledTextarea = styled.textarea`
  ${baseControl}
  resize: vertical;
  min-height: 80px;
`;
