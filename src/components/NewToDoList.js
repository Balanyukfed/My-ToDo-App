import React, { useState } from "react";

function NewToDoList({ name, tasks, setTasks, onUpdateListName }) {
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [taskBeingEdited, setTaskBeingEdited] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [newListName, setNewListName] = useState(name);

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompleted = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const startEditingTask = (index) => {
    setEditingIndex(index);
    setTaskBeingEdited(tasks[index].text);
  };

  const saveEditedTask = () => {
    const updatedEditingTasks = tasks.map((task, i) => {
      if (i === editingIndex) {
        return { ...task, text: taskBeingEdited };
      }
      return task;
    });
    setTasks(updatedEditingTasks);
    setEditingIndex(null);
    setTaskBeingEdited("");
  };

  // const handleListNameChange = (event) => {
  //   setEditedListName(event.target.value);
  // };

  const saveNewListName = (event) => {
    event.stopPropagation();

    onUpdateListName(newListName); // Обновляем имя списка в главном компоненте
    setIsEditingName(false); // Скрываем поле ввода
  };

  return (
    <div className="main">
      {/* <h2>Давай запишем:</h2> */}
      <div
        className="list-name-container" // Добавляем контейнер для имени и кнопки
        onClick={() => setIsEditingName(true)}
      >
        {isEditingName ? (
          <>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              />
            <button onClick={(event) => saveNewListName(event)}>
              Сохранить
            </button>
          </>
        ) : (
          <>
            <h2 className="list-name">
              {name}
              <button className="edit-button">&#9998;</button>
            </h2>
          </>
        )}
      </div>
      <div className="form">
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Добавить задачу</button>
      </div>
      <ul>
        {tasks.map((toDo, index) => (
          <li
            key={index}
            style={{ textDecoration: toDo.completed ? "line-through" : "none" }}
            className="list__task"
          >
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={taskBeingEdited}
                  onChange={(e) => setTaskBeingEdited(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveEditedTask();
                    }
                  }}
                />
                <button onClick={saveEditedTask}>Сохранить</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleTaskCompleted(index)}
                  style={{ cursor: "pointer" }}
                  className="task__name"
                >
                  {toDo.text}
                </span>

                <button onClick={() => startEditingTask(index)}>
                  Редактировать
                </button>
                <button onClick={() => removeTask(index)}>Удалить</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewToDoList;
