import styled from 'styled-components';

export const LoginContainer = styled.div`
  padding: 20px;
  max-width: 400px;
  margin: 50px auto;
  form {
    display: flex;
    flex-direction: column;
  }
  button {
    padding: 10px;
    margin-top: 10px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #555;
    }
  }
  h2{
  color:white;
  text-align: center;
  margin: 0 0 40px 0;
  font-size: 28px;
  font-weight: 600;
  }
`;
