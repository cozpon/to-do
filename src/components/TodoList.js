import React from 'react';
import Todo from'./Todo';

const TodoList = ({todos}) => {
  console.log(todos, "one");
  return (
    <div className="todo-list">
    {
      todos.map((todo) => {
        console.log(todo, "two");
        return (
          <Todo
            description={todo.description}
            status={todo.Status.done}
            creator={todo.creator}
            key={todo.id}
          />
        );
      })
    }
    </div>
  );
}

export default TodoList;