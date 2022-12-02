import React, {Fragment, useRef, useState, useEffect} from "react";
import { TodoList } from "./components/TodoList";
import { v4 as uuidv4 } from "uuid"

const LOCALSTORA_KEY_TODOS = 'TodoApp.todos'

export function App() {
    const [todos, setTodos] = useState([
        {id:1, task:'tarea 1', completed: false},
        {id:2, task:'tarea 2', completed: true},
        {id:3, task:'tarea 3', completed: false},
    ]);


    const todoTaskRef = useRef();
    
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCALSTORA_KEY_TODOS));
        if(storedTodos)
        setTodos(storedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCALSTORA_KEY_TODOS,JSON.stringify(todos))
    }, [todos]);

    

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if(task === '') return;

        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuidv4(), task, completed: false}]
        });

        todoTaskRef.current.value = null;
    };

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((item) => item.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    } ;

    const handleEliminarClick = () => {
        var newTodos = [...todos];
        var noTerminados = newTodos.filter(item => !item.completed);
        setTodos(noTerminados);
    }

    const handleKeyDownText = (e) => {
        //console.log(e.key);
        if(e.key === 'Enter') {
            handleTodoAdd();
        }
    }

    return (
        <Fragment>
            <TodoList ToDos={todos} toggleTodo={toggleTodo}></TodoList>
            <input ref={todoTaskRef} type='text' placeholder="Nueva tarea" onKeyDown={handleKeyDownText}></input>
            <button onClick={handleTodoAdd}>➕</button>
            <button onClick={handleEliminarClick}>🗑</button>
            <div>Te quedan <b>{todos.filter(item => !item.completed).length}</b> tareas por terminar</div>
        </Fragment>
    );
}