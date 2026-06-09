import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  color:black;
  
`;

export const Title = styled.h3`
  background: white;
  margin: 0;
  padding-bottom: 1rem;
  color: black;
  text-align: center;     /* по центру */
  font-size: 1.3rem;     /* чуть больше */
  font-weight: 500;      /* чуть жирнее для акцента */
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 6px 12px;
  cursor: pointer;
`;
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0 16px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
