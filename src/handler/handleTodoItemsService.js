import axios from "axios";
import showMessage from "../helper/notification";


const TODO_ITEMS_API = process.env.REACT_APP_TODO_ITEM_URL || "";

// Adding todo
const addTodoItems = async (set,get,parentId) => {

    const {formData, todoItems, authUser} = get()

    let addId = String(todoItems.length > 0 ? Number(todoItems[todoItems.length - 1].id) + 1 : todoItems.length + 1) //generating id
   
    try {
        const addItem = await axios.post(`${TODO_ITEMS_API}`, { ...formData, id: addId, parentId: parentId,userId:authUser.id });

        set({todoItems:[...todoItems, addItem.data]}); //After adding to backend that data updating to frontend
        showMessage("success","Todo item Added Success fully");
       
    } catch (err) {
        showMessage("error","Todo item adding Something went wrong");
        console.log(err);
    }
}

// updating the todoItems
const updateTodoItems = async (set,get) => {

    const {todoItems, formData} = get()
     
    try{
        const updateItem = await axios.put(`${TODO_ITEMS_API}/${formData.id}`,formData)
        
        let updater = todoItems.map(item => item.id === formData.id ? {...updateItem.data}:item)

        set({todoItems:updater})
         showMessage("success","Todo item Updated Success fully");
    }catch (err){
         showMessage("error","Todo item update Something went wrong");
        console.log(err); 
    }
}

// delete todo items
const deleteTodoItems = async (set,get) => {

    const {todoItems,formData} = get()
    
    try{
        await axios.delete(`${TODO_ITEMS_API}/${formData.id}`)
        
        let deleter = todoItems.filter(item => item.id !== formData.id)

        set({todoItems:deleter})
        showMessage("success","Todo item Deleted Success fully");
    }catch (err){
         showMessage("error","Todo item Deleted Something went wrong");
        console.log(err)
    }
}



export {addTodoItems,updateTodoItems,deleteTodoItems}
