import axios from "axios";
import React from "react";

const TODO_ITEMS_API = process.env.REACT_APP_TODO_ITEM_URL || "";
const TODO_API = process.env.REACT_APP_TODO_LIST_URL || "";

///Login form validation
const handleLoginValidation = (set,formData) => {
  let newError = { email: "", password: "" };

  if (!formData.email.trim()) newError.email = "Email id required";
  if (!formData.password.trim()) newError.password = "Password is required";

  if(newError.email || newError.password){
    set({error:newError})
    return false
  }

  return true;
};


//Register form validation
const handleRegisterValidation = (set,formData) => {
  let newError = { name: "", email: "", password: "" };

  // Validation
  if (!formData.name.trim()) newError.name = "Username is required";
  if (!formData.email.trim()) newError.email = "Email is required";
  if (!formData.password.trim()) newError.password = "Password is required";
  if (formData.password.trim().length < 6)newError.password = "Password must be at least 6 characters";

   if (newError.name || newError.email || newError.password) {
    set({error:newError});
    return false;
  }

  return true;
};


//Todo form validation
const handleTodoValidation = async(todoData, setError,authUser) => {

    if(!todoData.name || !todoData.name.trim()){
      setError({name:'Name is required'})
      return false
    }
    try{
      let getTodoName = await (axios.get(`${TODO_API}?userId=${authUser.id}&name=${todoData.name}`))
      if(getTodoName.data.length > 0){
        setError({name:'Todo name already taken'})
        return false
      }
    }catch (err){
      console.log(err)
    }

     return true;     
}


//Todo items form validation
const handleTodoItemsValidation = async (set,get,formData) => {
 const newErrors = {};

    const {authUser} = get()

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())newErrors.description = "Description is required";
    if (!formData.priority) newErrors.priority = "Please select priority";
    if (!formData.status) newErrors.status = "Please select status";

    try{
      let getTodoItemName = await (axios.get(`${TODO_ITEMS_API}?userId=${authUser.id}&title=${formData.title}`))
      if(getTodoItemName.data.length > 0){
        newErrors.title='Title already taken'
      }
    }catch(err){
      console.log(err)
    }

     if (Object.keys(newErrors).length > 0) {
    
        set({error:newErrors}); /////updating errors
        return false;
    }
    return true;
}

export {
  handleLoginValidation,
  handleTodoItemsValidation,
  handleRegisterValidation,
  handleTodoValidation,
};




