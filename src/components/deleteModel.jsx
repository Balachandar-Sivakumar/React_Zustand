import { useEffect } from "react";
import { Modal, Button } from "antd";
import showMessage from "../helper/notification";
import useTodoStore from "../store/useStore";

///Delete Model
function Delete() {
  const {
    formData,
    setFormData,
    setAction,
    setActiveTodo,
    todoItems,
    handleTodoItemsDelete,
  } = useTodoStore();

  const resetState = () => {
    setFormData({
      image: null,
      title: "",
      description: "",
      priority: "",
      status: "",
      important: false,
    });
    setAction(null);
    setActiveTodo(null);
  };

  useEffect(() => {
    const hasSingleItem =todoItems.filter((item) => item.parentId === formData.parentId).length === 1;

    if (hasSingleItem) {
      showMessage("warning","If the parent Todo doesn't have any items, the todo list will automatically be deleted.");
    }
  }, []);

  return (
    <Modal
      title="Delete Todo"
      open
      centered
      footer={null}
      onCancel={resetState}
    >
      <p className="text-center">
        Are you sure you want to delete this Todo item: <b>{formData.title.toUpperCase()}</b>
      </p>

      <div className="flex gap-2 justify-between">
        <Button className="w-1/2" onClick={resetState}>
          Cancel
        </Button>

        <Button
          className="w-1/2"
          danger
          type="primary"
          onClick={() => handleTodoItemsDelete()}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}

export default Delete;
