// src/pages/Home/Home.jsx
import React from 'react';
import { HomeContainer } from './Home.styled';

const Home = () => {
  return (
    <HomeContainer>
      <h1>Добро пожаловать в систему инвентаризации!</h1>
      <p>Авторизуйтесь или зарегистрируйтесь для работы с системой.</p>
    </HomeContainer>
  );
};

export default Home;
