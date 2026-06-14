import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: #0f0f10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
  overflow-y: auto;
`;

export const FormCard = styled.div`
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  color: #111;
  border-radius: 16px;
  padding: 32px 28px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    padding: 28px 24px;
    border-radius: 14px;
    max-width: 480px;
  }

  @media (max-width: 480px) {
    padding: 24px 20px;
    border-radius: 12px;
    max-width: 100%;
    
  }
`;

export const Title = styled.h2`
  margin-bottom: 28px;
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  color: #111;

  @media (max-width: 480px) {
    font-size: 23px;
    margin-bottom: 24px;
  }
`;

export const Field = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.div`
  font-size: 14.5px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 13px 16px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
  }

  @media (max-width: 480px) {
    padding: 12px 14px;
    font-size: 15.5px;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 13px 16px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  background: white;
  outline: none;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
  }

  @media (max-width: 480px) {
    padding: 12px 14px;
    font-size: 15.5px;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 13px 16px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  min-height: 110px;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
  }

  @media (max-width: 480px) {
    padding: 12px 14px;
    font-size: 15.5px;
    min-height: 100px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 15px;
  margin-top: 12px;
  border-radius: 10px;
  border: none;
  background: #111;
  color: #fff;
  font-size: 16.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #222;
  }
  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    padding: 14px;
    font-size: 16px;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 18px;
  }
`;

export const HelperText = styled.p`
  font-size: 13.5px;
  color: #666;
  margin-top: 6px;
`;