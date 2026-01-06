import React from "react";
import {create} from 'zustand'

const useAuth = create ((set) => ({
    
    users: JSON.parse(localStorage.getItem('users') || '[]'),
    authUser : JSON.parse(localStorage.getItem('authUser') || '{}'),
    setUsers : (user) => set((state) => ({users:[...state.users,user]})),
    setAuth : (user) => set(() => ({authUser : user}))
}))

export default useAuth;