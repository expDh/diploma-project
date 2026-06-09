'use client';

import { InputHTMLAttributes } from 'react';
import {
  FieldWrapper,
  FieldLabel,
  StyledInput,
} from './input.styled';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Input = ({ label, ...props }: Props) => {
  return (
    <FieldWrapper>
      <FieldLabel>{label}</FieldLabel>
      <StyledInput {...props} />
    </FieldWrapper>
  );
};

export default Input;
