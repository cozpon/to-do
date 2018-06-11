import React from 'react';
// giving the cards a VIEW
// the names are not important, the order matters though

const Todo = ({ description, status, creator, key, id }) => {
  console.log(status);
  return (
    <div className="Todo">
      <div> To-Do: { description } </div><br/>
      <div> Have you done this?: { status }</div><br/>
      <input type="submit" id={ id } value="Completed" />
    </div>
  );
}

export default Todo;
