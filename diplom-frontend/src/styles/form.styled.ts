import styled from 'styled-components';

export const FormWrapper = styled.div`
  max-width: 520px;
  margin: 60px auto;
  padding: 32px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  color:black;
`;

export const FormTitle = styled.h2`
  margin-bottom: 24px;
  text-align: center;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 14px;
    color: #555;
  }

  input,
  select {
    padding: 10px 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #333;
    }
  }
`;

export const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 12px;
  border-radius: 8px;
  background: #333;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  border: none;

  &:hover {
    background: #000;
  }
`;
