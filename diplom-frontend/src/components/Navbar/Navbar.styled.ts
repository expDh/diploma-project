import styled from 'styled-components';

export const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  background-color: #1f2937;
  
  border-bottom:1px solid #405b64;

  a {
    color: white;
    text-decoration: none;
    margin-left: 15px;
    &:hover {
      text-decoration: none;
    }
  }

  span {
    color: white;
    margin-right: 10px;
  }

  button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #555;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #777;
    }
  }
`;

export const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
