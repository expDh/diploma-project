// // src/components/FormInput/FormInput.jsx
// import React from 'react';
// import { InputContainer } from './FormInput.styled';

// const FormInput = ({ label, type, value, onChange }) => (
//   <InputContainer>
//     <label>{label}</label>
//     <input type={type} value={value} onChange={onChange} />
//   </InputContainer>
// );

// export default FormInput;



import React, { ChangeEvent } from 'react';
import { InputContainer } from './FormInput.styled';

// Определяем интерфейс пропсов
interface FormInputProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, value, onChange }) => (
  <InputContainer>
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} />
  </InputContainer>
);

export default FormInput;
