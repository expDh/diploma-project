// src/components/Navbar/Navbar.styled.js
import styled from 'styled-components';

export const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between; // главное слева, остальное справа
  align-items: center;
  padding: 10px 20px;
  background-color: #333;

  a {
    color: white;
    text-decoration: none;
    margin-left: 15px;
    &:hover {
      text-decoration: underline;
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

// отдельный контейнер для правой части
export const RightGroup = styled.div`
  display: flex;
  align-items: center;
`;


// // src/components/Navbar/Navbar.styled.js
// import styled from 'styled-components';

// export const NavBarContainer = styled.nav`
//   display: flex;
//   gap: 20px;
//   padding: 10px 20px;
//   background-color: #333;
//   align-items: center;

//   a {
//     color: white;
//     text-decoration: none;
//     &:hover {
//       text-decoration: underline;
//     }
//   }

//   span {
//     color: white;
//   }

//   button {
//     margin-left: auto;
//     padding: 5px 10px;
//     border: none;
//     border-radius: 5px;
//     background-color: #555;
//     color: white;
//     cursor: pointer;
//     &:hover {
//       background-color: #777;
//     }
//   }
// `;
