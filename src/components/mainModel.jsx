import React, { act, useEffect } from "react";
import TodoModel from "./todoModel";
import View from "./viewModel";
import Delete from "./deleteModel";
import { useSetTodoList } from "../handler/handleSetTodoList";
import Form from "./todoItemFormModel";
import TodoForm from "./todoForm";
import "antd/dist/reset.css";
import Controllers from "./controllersModel";
import useTodoStore from "../store/useStore";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./profileModel";

function MultiTodo() {

//getting data from backend  
useSetTodoList()
  
const {authUser,action,activeTodo} = useTodoStore()

    let navigate = useNavigate()

    // logout function if user click logout
    useEffect(() => {
      if (!Object.keys(authUser).length > 0) {
        navigate("/");
      }
    },[authUser]);

    return (
      <>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 md:w-full">
        <h1 className="text-center py-8 text-white text-5xl font-bold">
          Dynamic todo
        </h1>

        {/* profile */}
       <ProfileModal/>

        {/* controllers */}
        <Controllers/>

        {/* todoList */}
        <TodoModel/>
         
        {/* showing the delete model */}
        {action === "delete" && <Delete/>}

         {/* Todo items Form  */}
        {(action === "add" || action === "update") && <Form/>}

        {/* ///View the todo item */}
        {action === "view" && <View />} 

        {/* //Todo form */}
        {activeTodo === "createTodo" && <TodoForm/>}
      </div>
    
    </>)
}

export default MultiTodo;
