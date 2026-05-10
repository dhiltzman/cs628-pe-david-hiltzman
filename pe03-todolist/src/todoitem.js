function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span className={`todo-text${todo.done ? ' done' : ''}`}>
        {todo.text}
      </span>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;