import React, { useEffect } from "react";
import useAuth from "../store/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

function Dashboard() {
  const {authUser,setAuth} = useAuth()

  const navigate = useNavigate()

 useEffect(() => {
   if(!Object.keys(authUser).length > 0){
    navigate('/')
  }
 },[authUser])

  return (
   <div className="flex flex-col gap-2 items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Hello {authUser.name}</h1>
      <Button onClick={() =>{
         setAuth({})
        localStorage.removeItem('authUser')
        }
      }>
        LogOut
      </Button>
    </div>
  );
}

export default Dashboard;
