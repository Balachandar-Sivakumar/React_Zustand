import React from "react";
import axios from "axios";
import showMessage from "../helper/notification";

const TODO_API = process.env.REACT_APP_TODO_LIST_URL || "";

//Adding TodoItems parent parent
const addTodo = async (set,get) => {

    const {todoData, todos, authUser} = get()

  let idGen = String( todos.length > 0 ? Number(todos[todos.length - 1].id) + 1 : todos.length + 1); ///generating id

  try {
    //Creating Parent todo in backend
    const todoAdder = await axios.post(`${TODO_API}`, {...todoData,id: idGen,status: todoData.status === "active" ? 1 : 0, userId: authUser.id});

    set({todos:[...todos, todoAdder.data]});
    set({todoData:{status:'active'}}); ///After adding to backend the todoData goes to normal
    showMessage("success", "Todo created Success fully");
    return todoAdder.data.id; ////returning the id
  } catch (err) {
    showMessage("error", "Todo create Something went wrong");
    console.log(err);
  }
};

// Deleting Parent Todo
const deleteTodo = async (set,get,id) => {
    const {todos} = get()
  try {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    set({todos:updatedTodos});

    await axios.delete(`${TODO_API}/${id}`);
    showMessage("success", "Todo Deleted Success fully");
  } catch (err) {
    showMessage("error", "Todo Delete Something went wrong");
    // Handle the error
    console.error("Error deleting todo:", err);
  }
};

export { addTodo, deleteTodo };
