// handler/setTodoList.js
import { useEffect } from "react";
import axios from "axios";
import useAuth from "../store/useStore";

const TODO_API = process.env.REACT_APP_TODO_LIST_URL || "";
const TODO_ITEMS_API = process.env.REACT_APP_TODO_ITEM_URL || "";

//setting data for todo and todoItems
export function useSetTodoList() {
  
   const authUserId = useAuth(state => state.authUser?.id)

   const setTodo = useAuth(state => state.setTodo)
   const setTodoItems = useAuth(state => state.setTodoItems)

  useEffect(() => {
     
    if (!authUserId) return; // if user not login it will return

    async function getData() {
      try {
        const getTodo = await axios.get(`${TODO_API}?userId=${authUserId}`)
        const getTodoItems = await axios.get(`${TODO_ITEMS_API}?userId=${authUserId}`)

        setTodo(getTodo.data);
        setTodoItems(getTodoItems.data);
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, [authUserId]); //id change it will run
}
