import React from 'react';
// giving the cards a VIEW
// the names are not important, the order matters though

const Todo = ({ id, description, status, creator }) => {
  return (
    <div className="Todo">
      <div> To-Do: { description } </div><br/>
      <div> Have you done this?: { status }</div><br/>
      <input type="submit" value="Complete Task" />
    </div>
  );
}

export default Todo;
