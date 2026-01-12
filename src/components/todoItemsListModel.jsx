import React from "react";
import useTodoStore from "../store/useStore";

///Model show delete list
export function ShowList() {

    const { todoItems, setAction, setFormData, activeTodo, action } = useTodoStore()

    //filter the current active todo items
    let getItems = todoItems.filter(item => item.parentId === activeTodo)

    //if there is no items is here return
    if(!getItems.length > 0){
        return <p className="text-gray-500 text-sm">No items found</p>
    }
 
    return (
        <ul className={`absolute bg-white top-12 ${action === 'showUpdate' ? 'right-40' : 'right-0'} w-64 flex flex-col gap-2 px-3 py-2 rounded-md z-5 h-64 overflow-y-scroll overflow-x-hidden`}>
            <span 
            onClick={() => setAction(null)}
            className="relative top-0 left-52 text-sm cursor-pointer">❌</span>

                {getItems.map(item => {
                    return <li
                        className="bg-gray-300 px-3 py-1 rounded-lg cursor-pointer hover:scale-110 w-full transition duration-200"
                        key={item.id}
                        onClick={() => {
                            setFormData(item);       //current delete data getting
                         if(action === 'showUpdate'){
                            setAction('update')       ///choosing update or delete
                         }else{
                            setAction('delete')
                         }
                            
                        }}
                    >
                        {item.title}
                    </li>
                })
            }
            
        </ul>
    );
}

export default ShowList;