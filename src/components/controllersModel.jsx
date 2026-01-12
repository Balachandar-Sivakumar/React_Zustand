import React from "react";
import ShowList from "./todoItemsListModel";
import useTodoStore from "../store/useStore";

const Controllers = () => {
  
  const {
    activeTodo,
    setActiveTodo,
    action,
    setAction,
    error,
    setError,
    todos,
  } = useTodoStore();

  return (
    <>
      {/* controllers */}
      <section className="relative flex justify-between px-20 py-12">
        {/* drop down for todo */}
        <div className="flex flex-col">
          <select
            value={activeTodo ?? ""}
            onChange={(e) => {
              setActiveTodo(e.target.value);
              if (action) setAction(null);
              setError({});
            }}
            className="rounded-lg outline-none px-3"
          >
            <option value="">Select todo</option>

            {todos.map((todo) => {
              if (todo.status) {
                return (
                  <option key={todo.id} value={todo.id}>
                    Todo-{todo.name}
                  </option>
                );
              } else {
                return null;
              }
            })}

            <option value="createTodo">Create Todo</option>
          </select>

          {error === "selectTodoError" && (
            <span className="absolute bottom-20 text-sm text-red-500">
              Please select the Todo
            </span>
          )}
        </div>

        <div className="flex gap-5">
          <button
            className="bg-white px-3 py-full rounded-lg hover:scale-110 transition duration-300 active:bg-black"
            onClick={() => {
              if (activeTodo) {
                setAction("add");
              } else {
                setError("selectTodoError");
              }
            }}
          >
            Add
          </button>
        </div>
        <div className="flex relative">
          <button
            className=" bg-gradient-to-r from-blue-50 to-cyan-50 px-3 rounded-lg hover:scale-110 transition duration-300 active:bg-black"
            // while clicking update button showing current todo list
            onClick={() => {
              if (activeTodo) {
                setAction("showUpdate");
              } else {
                setError("selectTodoError");
              }
            }}
          >
            Update
          </button>

        </div>

        {/* delete box */}
        <div className="relative flex">
          <button
            onClick={() => {
              if (activeTodo) {
                setAction("showDelete");
              } else {
                setError("selectTodoError");
              }
            }} //setting action
            className="bg-white px-3 py-full rounded-lg hover:scale-110 transition duration-300 active:bg-black"
          >
            Delete
          </button>

          {/* showing the delete list */}
          {(action === "showDelete" || action === "showUpdate") && (<ShowList/>)}
        </div>
      </section>
      
    </>
  );
};


export default Controllers;
