import React, { useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() === "") {
      return;
    }
    if (editTodo !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editTodo] = newTodo;
      setTodos(updatedTodos);
      setEditTodo(null);
    } else {
      setTodos([...todos, newTodo]);
    }
    setNewTodo("");
  };

  const handleEdit = (index) => {
    setEditTodo(index);
    setNewTodo(todos[index]);
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleComplete = (index) => {
    const updatedTodos = [...todos];
    const completedTodo = updatedTodos.splice(index, 1);
    setCompletedTodos([...completedTodos, completedTodo]);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h2>To-do List</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newTodo">Add a new todo:</label>
        <input
          id="newTodo"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          type="text"
        />
        <button>{editTodo !== null ? "Update" : "Add Todo"}</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <div>
              <button className="edit-btn" onClick={() => handleEdit(index)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
              <button
                className="complete-btn"
                onClick={() => handleComplete(index)}
              >
                Complete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {completedTodos.length > 0 && (
        <div className="completed-todos">
          <h2>Completed Todos</h2>
          <ul>
            {completedTodos.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Todo;
