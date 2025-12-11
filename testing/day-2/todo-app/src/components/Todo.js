import React, { useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-header">My Tasks</h1>
      <div className="todo-input-group">
        <input
          type="text"
          className="todo-input"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="todo-add-btn" onClick={handleAdd}>
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span className="todo-text">{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
