import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import useTodoStore from "../store/useStore";

// rendering the todoModel
const TodoModel = () => {
  const { setFormData, setAction, todoItems, todos } = useTodoStore();

  return (
    <div className="flex justify-around px-8 flex-wrap gap-5 py-3">
      {
        todos.map((todo) => {

          if(!todo.status)return;
            //filtering the current todo items
          let getItems = todoItems.filter((item) => item.parentId === todo.id);
          let todoName = todo.name.charAt(0).toUpperCase() + todo.name.slice(1) || ""; ///first letter capital changing

          return (
            <div className="px-6 py-4 shadow-xl shadow-black/20 rounded-xl bg-white w-96 border border-gray-100 h-1/6">
              <h1 className="text-pink-600 text-2xl font-semibold text-center mb-6">
                Todo : {todoName}
              </h1>

              <ol className="w-full flex flex-col gap-3">
                {getItems.map((item, index) => (
                  <li
                    key={index} // better to use index or todo.id if available
                    className="flex items-center justify-between w-full bg-gray-100 px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-gray-600">
                        {index + 1}.
                      </p>
                      <img
                        className="h-12 w-12 rounded-sm"
                        src={item.image}
                        alt={item.title}
                      />
                      <span className="text-gray-800">{item.title[0].toUpperCase()+item.title.slice(1)}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon
                        className="text-blue-500 cursor-pointer hover:scale-110 transition duration-200"
                        icon={faEye}
                        onClick={() => {
                          setFormData(item);
                          setAction("view");
                        }}
                      />
                      <FontAwesomeIcon
                        className="text-yellow-500 cursor-pointer hover:scale-110 transition duration-200"
                        icon={faPen}
                        onClick={() => {
                          setFormData(item);
                          setAction("update");
                        }}
                      />
                      <FontAwesomeIcon
                        className="text-red-600 cursor-pointer hover:scale-110 transition duration-200"
                        icon={faTrash}
                        onClick={() => {
                          setFormData(item);
                          setAction("delete");
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          );
        })
      }
    </div>
  );
};

export default TodoModel;
