import React from 'react';
// this is the perfect ideal DUMMY component.
// completely refactored, and able to use for ANY input values
// I use this "Select" component for Users and Priorities in the NewCardForm HTML

const Select = ({list, label, type, handler}) => {
  return (
    <div>
      <span>{label}</span>
      <select onChange={handler}>
        {
          list.map(item => {
            return <option value={item.id} key={item.id}>
            {item[type]}
            </option>
          })
        }
      </select>
    </div>
  )
}

export default Select;