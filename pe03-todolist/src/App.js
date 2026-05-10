import { useState } from 'react';
import './index.css';
import TodoList from './todolist';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  function addTodo() {
    const text = input.trim();
    if (!text) return;
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }]);
    setInput('');
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  function toggleTodo(id) {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTodo();
  }

  const completedCount = todos.filter(t => t.done).length;

  return (
    <div className="app-container">
      <h1 className="app-title">My Tasks</h1>

      <div className="input-row">
        <input
          className="todo-input"
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="add-btn" onClick={addTodo}>
          Add Task
        </button>
      </div>

      {todos.length > 0 && (
        <p className="stats">
          {completedCount} of {todos.length} completed
        </p>
      )}

      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
      />
    </div>
  );
}

export default App;