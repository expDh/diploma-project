
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
  width: 480px;
  max-width: 90vw;
  color: #111827;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
`;

export const Title = styled.h3`
  margin: 0 0 28px 0;
  text-align: center;
  font-size: 24px;
  color: #1f2937;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
  font-size: 15px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  margin-bottom: 20px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 14px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  margin-bottom: 20px;
  background: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

export const CancelButton = styled.button`
  padding: 11px 22px;
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    background: #4b5563;
  }
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

  &:hover {
    background: #059669;
  }
`;



// import styled from 'styled-components';

// export const Overlay = styled.div`
//   position: fixed;
//   top: 0; left: 0; right: 0; bottom: 0;
//   background: rgba(0,0,0,0.5);
//   display: flex; justify-content: center; align-items: center;
//   z-index: 1000;
// `;

// export const Modal = styled.div`
//   background: #ffffff;
//   padding: 20px;
//   width: 400px;
//   border-radius: 8px;
//   color: black
 
// `;

// export const Label = styled.label`
//   display: block;
//   margin-top: 10px;
//   margin-bottom: 4px;
//   font-weight: 500;
// `;

// export const Input = styled.input`
//   width: 100%;
//   padding: 8px;
//   margin-bottom: 6px;
//   border-radius: 4px;
//   border: 1px solid #ccc;
// `;

// export const Actions = styled.div`
//   margin-top: 16px;
//   text-align: right;
// `;

// export const Button = styled.button`
//   padding: 6px 12px;
//   margin-left: 8px;
//   border-radius: 4px;
//   border: none;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.9;
//   }
// `;

// export const Select = styled.select`
//   width: 100%;
//   margin-top: 5px;
//   padding: 8px;
 
// `;