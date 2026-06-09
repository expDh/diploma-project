import React, { ChangeEvent } from 'react';
import { InputAuthContainer } from './FormAuth.styled';

interface FormInputProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const FormAuth: React.FC<FormInputProps> = ({ label, type, value, onChange ,name}) => (
  <InputAuthContainer>
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} />
  </InputAuthContainer>
);

export default FormAuth;
