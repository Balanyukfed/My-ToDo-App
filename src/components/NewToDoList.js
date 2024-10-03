import React, { useState } from "react";

function NewToDoList({ name, tasks, setTasks }) {
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [taskBeingEdited, setTaskBeingEdited] = useState("");

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

  return (
    <div className="main">
      {/* <h2>Давай запишем:</h2> */}
      <h2>{name}</h2>
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
