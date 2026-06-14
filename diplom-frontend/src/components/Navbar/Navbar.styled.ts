import styled from 'styled-components';

export const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #1f2937;
  border-bottom: 1px solid #405b64;
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 720px) {
    padding: 12px 16px;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: #97c3fa;
    }
  }

  @media (max-width: 720px) {
    display: none;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  margin-left: auto; 
  justify-content: flex-end;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  span {
    color: #9ca3af;
    font-size: 14.5px;
  }

  button {
    padding: 6px 12px;
    border: none;
    border-radius: 5px;
    background-color: #374151;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #4b5563;
    }
  }
`;

export const BurgerButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  padding: 4px 8px;
  margin-left: 12px;

  @media (max-width: 720px) {
    display: block;
  }

  @media (min-width: 721px) {
    display: none;
  }
`;

export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #1f2937;
  padding: 20px;
  gap: 12px;
  border-top: 1px solid #405b64;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    padding: 8px 0;
  }
`;