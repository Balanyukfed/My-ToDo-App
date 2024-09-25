import React, { useEffect, useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [taskBeingEdited, setTaskBeingEdited] = useState("");

  useEffect(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (savedTasks && Array.isArray(savedTasks)) {
        setTasks(savedTasks);
      }
    } catch (error) {
      console.error("Ошибка при загрузке задач из localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

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
      <h2>Давай запишем:</h2>
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
                >
                  {toDo.text}
                </span>

                <button onClick={() => removeTask(index)}>Удалить</button>
                <button onClick={() => startEditingTask(index)}>
                  Редактировать
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
