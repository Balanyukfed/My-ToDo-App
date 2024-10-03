import React from "react";

// import ToDoList from "./components/ToDoList";
import MainScreen from "./components/MainScreen";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
      </header>
      {/* <ToDoList /> */}
      <MainScreen />
    </div>
  );
}

export default App;
