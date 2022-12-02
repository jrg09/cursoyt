import React from 'react'
import { TodoItem } from './TodoItem'

export function TodoList({ToDos, toggleTodo}) {
  return (
    <ul>
        {
            ToDos.map((item) => (<TodoItem key={item.id}  todo={item} toggleTodo={toggleTodo}></TodoItem>))
        }
    </ul>
    
  )
}
