import React from 'react';
// giving the todos a VIEW
// the names are not important, the order matters though

const Todo = ({ description, status, creator, key, id }) => {
  return (
    <div className="Todo">
      <div id="description"> To-Do: { description } </div><br/>
      <div id="status"> Have you done this? { status }</div><br/>
      <input type="submit" id={ id } value="Completed" />
    </div>
  );
}

export default Todo;
