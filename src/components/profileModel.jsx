import React from "react";
import { Modal, Avatar, Descriptions, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import useTodoStore from "../store/useStore";

///Profile 
const ProfileModal = () => {
  
  const { authUser,setAuth } = useTodoStore();

  const [open, setOpen] = useState(false);

  if(!Object.keys(authUser).length > 0){
    return null
  }

  //converting first letter capital
  const name =  (authUser.name.charAt(0).toUpperCase() + authUser.name.slice(1)) || '';

  return (
    <>
      <div className="absolute top-8 right-8 flex items-center gap-2">
        <h1 className="text-white">Hello, {name}</h1>

        <Avatar
          size={40}
          icon={<UserOutlined />}
          onClick={() => setOpen(true)} //showing the details
          className="cursor-pointer"
          style={{ backgroundColor: "#7a1bb1ff" }}
        />
      </div>
      <Modal                     /////This is profile model
        title="User Profile"
        open={open}
        centered
        footer={null}
        onCancel={() => setOpen(false)}
      >
        <div className="text-center mb-5">
          <Avatar size={80} icon={<UserOutlined />} src={authUser?.avatar} />
          <h3 className="mt-3">{name}</h3>
          <p>{authUser?.email}</p>
        </div>

        <Descriptions bordered column={1}>
          <Descriptions.Item label="Username">
            {name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{authUser?.email}</Descriptions.Item>
        </Descriptions>

        {/* Logout Button */}
        <div className="flex justify-center mt-6">
          <Button danger type="primary" onClick={() => {
            setAuth({})
            localStorage.removeItem('authUser')
          }}>
            Logout
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ProfileModal;
