import React from 'react'

export function TodoItem({todo, toggleTodo}) {
    const {id, task, completed} = todo;

    const handleChangeInput = () => {
      toggleTodo(id);
    }

  return (
    <li><label><input type="checkbox" onChange={handleChangeInput} checked={completed}/>&nbsp;
        {task}</label>
    </li>
  )
}
