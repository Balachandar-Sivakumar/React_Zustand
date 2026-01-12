import React from "react";
import { handleTodoValidation } from "../helper/validation";
import useTodoStore from "../store/useStore";
import { Modal, Form, Input, Select, Button } from "antd";
import showMessage from "../helper/notification";

///todo creating
const TodoForm = () => {
  const { setActiveTodo, setAction, error, setError, todoData,setTodoData,authUser } = useTodoStore();

  const { Option } = Select;

  return (
    <Modal
      title="Create Todo"
      open={true}
      onCancel={() => {
        setActiveTodo(null)
        setTodoData({status:'active'})
      }}
      footer={null}
      centered
    >
      <Form
        layout="vertical"
        onFinish={ async() => {
          const isValid = await handleTodoValidation(todoData, setError,authUser);
          if (isValid) {
            setTodoData(todoData)
            showMessage("warning","Add minimum one todo item or todo delete automatically");
            setActiveTodo(null);
            setAction("add");
          }
        }}
      >
        <Form.Item
          label="Name"
          validateStatus={error.name ? "error" : ""}
          help={error.name}
        >
          <Input
            value={todoData.name}
            onChange={(e) => {
              setTodoData({ ...todoData, name: (e.target.value).toLowerCase() })
              setError({})
            }}
          />
        </Form.Item>

        <Form.Item label="Status">
          <Select
            value={'active'}
            onChange={(value) => setTodoData({ ...todoData, status: value })}
          >
            <Option selected value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoForm;
