import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { adminStore } from "../../../stores/adminStore";

const ResPersonsPage = observer(() => {
  useEffect(() => {
    adminStore.fetchResPersons();
  }, []);

  if (adminStore.loadingResPersons) return <p>Загрузка данных...</p>;

  return (
    <div>
      <h2>Мы сейчас делаем вывод ответственных лиц</h2>
      <ul>
        {adminStore.resPersons.map((person) => (
          <li key={person.responsible.id_users}>
            {person.responsible.firstName}{" "}
            {person.responsible.lastName}{" "}
            {person.responsible.patronymic
              ? person.responsible.patronymic
              : ""}
            , email: {person.responsible.id_users}@mail.ru
            <br />
            Адрес: {person.address}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ResPersonsPage;
