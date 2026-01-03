import React from "react";
import {create} from 'zustand'

const useAuth = create ((set) => ({
    
    users:[{email:'bala@gmail.com',password:'123456',name:"Balachandar"}],
    authUser : {},
    setUsers : (user) => set((state) => ({users:[...state.users,user]})),
    setAuth : (user) => set(() => ({authUser : user}))
}))

export default useAuth;