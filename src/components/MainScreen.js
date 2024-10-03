import React, { useEffect, useState } from "react";
// Импортируем необходимые хуки из React: useEffect для выполнения побочных эффектов и useState для хранения состояния.

import NewToDoList from "./NewToDoList";
// Импортируем компонент NewToDoList для отображения и управления задачами внутри списка.

import "./MainScreen.css";
// Импортируем стили для компонента MainScreen.

function MainScreen() {
  // Основной компонент MainScreen, который управляет списками задач.

  const [lists, setLists] = useState(() => {
    // Состояние для хранения списков задач. Инициализируется функцией, которая проверяет наличие данных в localStorage.
    const storedLists = localStorage.getItem("lists");
    // Пытаемся получить списки из localStorage (если они там есть).

    if (storedLists) {
      // Если списки найдены, пробуем их распарсить.

      try {
        const parsedLists = JSON.parse(storedLists);
        // Преобразуем строку в массив объектов.

        if (Array.isArray(parsedLists)) {
          // Если распарсенные данные — это массив, возвращаем его.
          return parsedLists;
        }
      } catch (error) {
        // Если произошла ошибка парсинга, выводим её в консоль.
        console.error("Ошибка парсинга данных из localStorage", error);
      }
    }

    return [];
    // Если ничего не найдено или произошла ошибка, возвращаем пустой массив.
  });

  const [listName, setListName] = useState("");
  // Состояние для хранения имени нового списка.

  const [selectedListIndex, setSelectedListIndex] = useState(null);
  // Состояние для хранения индекса выбранного списка (по умолчанию — ничего не выбрано).

  useEffect(() => {
    // Хук useEffect для сохранения списков в localStorage при каждом их изменении.
    localStorage.setItem("lists", JSON.stringify(lists));
    // Преобразуем массив списков в строку и сохраняем в localStorage.
  }, [lists]);
  // Этот эффект выполняется каждый раз, когда изменяется состояние `lists`.

  const addNewList = () => {
    // Функция для добавления нового списка.
    if (listName.trim() !== "") {
      // Проверяем, что имя списка не пустое (убираем пробелы).

      const newList = { name: listName, tasks: [] };
      // Создаем новый объект списка с именем и пустым массивом задач.

      setLists([...lists, newList]);
      // Добавляем новый список в массив списков.

      setListName("");
      // Очищаем поле ввода.
    }
  };

  const openList = (index) => {
    // Функция для открытия выбранного списка.
    setSelectedListIndex(index);
    // Сохраняем индекс выбранного списка.
  };

  const deleteList = (index, event) => {
    // Функция для удаления списка.
    event.stopPropagation();
    // Предотвращаем открытие списка при нажатии на кнопку удаления.

    const updatedLists = lists.filter((_, i) => i !== index);
    // Удаляем список по индексу, возвращая все остальные списки.

    setLists(updatedLists);
    // Обновляем состояние списков.

    setSelectedListIndex(null);
    // Сбрасываем выбор списка.
  };

  if (selectedListIndex !== null) {
    // Если выбран какой-то список, отображаем его содержимое.
    return (
      <div className="main-container">
        <button
          onClick={() => setSelectedListIndex(null)}
          className="button--go-back"
        >
          &#8249;
        </button>
        {/* Кнопка для возврата на главный экран (сброс выбора списка). */}

        {/* <h2>{lists[selectedListIndex].name}</h2>  */}
        {/* Отображаем имя выбранного списка. */}

        <NewToDoList
          name={lists[selectedListIndex].name}

          tasks={lists[selectedListIndex]?.tasks || []}
          // Передаем задачи выбранного списка в компонент NewToDoList.

          setTasks={(updatedTasks) => {
            // Функция для обновления задач внутри выбранного списка.
            const updatedLists = [...lists];
            // Копируем массив списков.

            updatedLists[selectedListIndex].tasks = updatedTasks;
            // Обновляем задачи у выбранного списка.

            setLists(updatedLists);
            // Сохраняем обновленные списки в состоянии.
          }}
        />
      </div>
    );
  }

  return (
    <div className="main-container">
      <h2>Создай новый список:</h2>
      {/* Заголовок приложения. */}

      <div className="input-container">
        <input
          type="text"
          placeholder="Название нового списка"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          // Обновляем состояние listName при вводе текста.
        />
        <button onClick={addNewList}>Создать список</button>
        {/* Кнопка для добавления нового списка. */}
      </div>

      <div className="cards-container">
        {lists.map((list, index) => (
          <div
            key={index}
            className="list-card"
            onClick={() => openList(index)}
            // При клике на карточку открываем соответствующий список.
          >
            <h3>{list.name}</h3>
            {/* Отображаем название списка. */}

            <button
              className="delete-btn"
              onClick={(event) => deleteList(index, event)}
              // Кнопка для удаления списка.
            >
              &times;
              {/* Символ удаления списка (крестик). */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainScreen;
// Экспортируем компонент MainScreen по умолчанию.
