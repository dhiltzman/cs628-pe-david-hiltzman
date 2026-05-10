import TodoItem from './todoitem';

function TodoList({ todos, onDelete, onToggle }) {
  if (todos.length === 0) {
    return <p className="empty-state">No tasks yet. Add one above!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default TodoList;