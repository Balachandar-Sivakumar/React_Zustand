import React, { useEffect } from "react";
import {Modal,Form,Input,Select,Radio,Checkbox,Button,Image} from "antd";
import uploadSupabase from "../helper/supabaseUrl";
import showMessage from "../helper/notification";
import useTodoStore from "../store/useStore";

///Form for todo item
const TodoItemForm = () => {
  const {
    formData,
    setError,
    action,
    setAction,
    setFormData,
    error,
    setTodoData,
    handleTodoItems,
  } = useTodoStore();

  let { Option } = Select;

  return (
    <Modal
      open={true}
      centered
      footer={null}
      width={450}
      bodyStyle={{ maxHeight: "80vh", overflowY: "auto", padding: "24px" }}
      title={
        <span className="text-gray-800 font-semibold text-lg">
          {action === "update" ? "Update Todo Item" : "Add Todo Item"}
        </span>
      }
      ////clear all values
      onCancel={() => {
        setAction(null);
        setFormData({
          image: null,
          title: "",
          description: "",
          priority: "",
          status: "",
          important: false,
        });
        setTodoData({});
        setError({});
      }}
    >
      <Form
        layout="vertical"
        className="space-y-4"
        //handle submit
        onFinish={() => {
          handleTodoItems();
        }}
      >
        {/* Image Preview */}
        {formData.image && (
          <Form.Item label="Preview">
            <div className="flex justify-center">
              <Image
                src={formData.image}
                width={300}
                height={150}
                style={{
                  borderRadius: 10,
                  objectFit: "cover",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          </Form.Item>
        )}

        {/* File Input */}
        <Form.Item label="Upload Image">
          <input
            type="file"
            accept="image/*"
            className="w-full border border-gray-300 p-2 rounded-md"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                const url = await uploadSupabase(file);
                setFormData({ ...formData, image: url });
              }
            }}
          />
        </Form.Item>

        {/* Title */}
        <Form.Item
          label="Todo Title"
          validateStatus={error.title ? "error" : ""}
          help={error.title}
        >
          <Input
            placeholder="Enter todo title"
            className="rounded-md"
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: (e.target.value).toLowerCase() });
              setError({ ...error, title: "" });
            }}
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          validateStatus={error.description ? "error" : ""}
          help={error.description}
        >
          <Input.TextArea
            rows={3}
            placeholder="Enter description"
            className="rounded-md"
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
              setError({ ...error, description: "" });
            }}
          />
        </Form.Item>

        {/* Priority */}
        <Form.Item
          label="Priority"
          validateStatus={error.priority ? "error" : ""}
          help={error.priority}
        >
          <Select
            placeholder="Select priority"
            value={formData.priority}
            className="rounded-md"
            onChange={(value) => {
              setFormData({ ...formData, priority: value });
              setError({ ...error, priority: "" });
            }}
          >
            <Option value="">Select Priority</Option>
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>

        {/* Status */}
        <Form.Item
          label="Status"
          validateStatus={error.status ? "error" : ""}
          help={error.status}
        >
          <Radio.Group
            value={formData.status}
            className="space-x-4"
            onChange={(e) => {
              setFormData({ ...formData, status: e.target.value });
              setError({ ...error, status: "" });
            }}
          >
            <Radio value="pending">Pending</Radio>
            <Radio value="completed">Completed</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Important */}
        <Form.Item>
          <Checkbox
            checked={formData.important}
            onChange={(e) =>
              setFormData({
                ...formData,
                important: e.target.checked,
              })
            }
          >
            Mark as important
          </Checkbox>
        </Form.Item>

        {/* Submit */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {action === "update" ? "Update Todo" : "Add Todo"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoItemForm;
