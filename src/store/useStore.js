import React from "react";
import {create} from 'zustand'
import { handleLogin,handleRegister } from "../handler/handleRegisterAndLogin";
import { handleTodoItems, handleTodoItemsDelete } from "../handler/handleTodoItems";
import { addTodo,deleteTodo } from "../handler/handleTodoService";
import { addTodoItems,updateTodoItems,deleteTodoItems } from "../handler/handleTodoItemsService";

const useTodoStore = create ((set,get) => ({

    authUser : JSON.parse(localStorage.getItem('authUser') || '{}'),
    todos : [],
    todoItems : [],
    action : null,
    error : {},
    activeTodo:null,
    formData : {image: null,title: "",description: "",priority: "",status: "",important: false},
    todoData : {status:'active'},

    //setters
    setAuth : (user) => set({authUser : user}),
    setTodo : (todo) => set({todos:todo}),
    setTodoItems : (item) => set({todoItems:item}),
    setAction : (act) => set({action:act}),
    setError : (err) => set({error:err}),
    setActiveTodo : (data) => set({activeTodo:data}),
    setFormData : (data) => set({formData:data}),
    setTodoData : (data) => set({todoData:data}),

    //functions
    handleLogin :(...args) => handleLogin(set,get,...args),
    handleRegister : (...args) => handleRegister(set,get,...args),
    handleTodoItems : (...args) => handleTodoItems(set,get,...args),
    handleTodoItemsDelete : (...args) => handleTodoItemsDelete(set,get,...args),
    addTodo : (...args) => addTodo(set,get,...args),
    deleteTodo : (...args) => deleteTodo(set,get,...args),
    addTodoItems : (...args) => addTodoItems(set,get,...args),
    updateTodoItems : (...args) => updateTodoItems(set,get,...args),
    deleteTodoItems : () => deleteTodoItems(set,get)
}))

export default useTodoStore;