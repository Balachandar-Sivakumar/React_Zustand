import React from "react";
import { handleTodoItemsValidation } from "../helper/validation";

const handleTodoItems = async (set,get) => {

  const {activeTodo,formData,action,todoData,addTodo,updateTodoItems,addTodoItems} = get()
  //TodoItems Form validation
  let isValid = await handleTodoItemsValidation(set,get,formData);
  

  if (!isValid) return;

  let parentId = null;

  if (action === "add") {
    if (Object.keys(todoData).length > 1) {
      ////creating Todo if exists
      parentId = await addTodo(); //// getting the parent id

    }
    if (parentId) {
      console.log(parentId)
      ///if parent id here imediately create child for the created todolist
      await addTodoItems(parentId);
      set({activeTodo:parentId})
    }
    if (activeTodo) {
      ////if current todo is here it will create items only
      await addTodoItems(activeTodo);
    }
  } else {
    await updateTodoItems(); ///Updating todo
  }

   ///After completed the process everything cleared
  set({formData:{image: null,title: "",description: "",priority: "",status: "",important: false,}});
  set({action:null})
  set({activeTodo:null})
};


///handle delete todo and todoItems
const handleTodoItemsDelete = async (set,get) => {

  const {todoItems,formData,deleteTodoItems,deleteTodo} = get()

  const checkParent = todoItems.filter((item) => item.parentId === formData.parentId);

  // checking todo items if it hase only one the parent will be delete automatically
  if (checkParent.length === 1) {
    await deleteTodoItems(); ///delete todo item
    await deleteTodo(formData.parentId); // Deleting the todo
  } else {
    await deleteTodoItems(); //if todo have more than one todoItem, only todoItem delete
  }

  // Clear form data
  set({formData:{image: null,title: "",description: "",priority: "",status: "",important: false}});
  set({action:null})
  set({activeTodo:null})

};

export { handleTodoItems, handleTodoItemsDelete };
