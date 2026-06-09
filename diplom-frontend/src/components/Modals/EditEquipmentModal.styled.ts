import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: #ffffff;
  padding: 20px;
  width: 400px;
  border-radius: 8px;
  color: black
`;

export const Label = styled.label`
  display: block;
  margin-top: 10px;
  margin-bottom: 4px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const Actions = styled.div`
  margin-top: 16px;
  text-align: right;
`;

export const Button = styled.button`
  padding: 6px 12px;
  margin-left: 8px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;