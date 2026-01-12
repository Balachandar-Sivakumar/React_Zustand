import React from "react";
import showMessage from "../helper/notification";
import axios from "axios";
import { handleLoginValidation, handleRegisterValidation } from "../helper/validation";

const USERS_API = process.env.REACT_APP_USERS_URL || '';

export const handleLogin = async (set,get,formData,setUserLog,navigate) => {

  ///Login form validation
  let isValid = handleLoginValidation(set,formData)

  if(!isValid)return

  try {
    const res = await axios.get(
      `${USERS_API}?email=${formData.email}&password=${formData.password}`
    );

    const getUser = res.data[0];

    if (getUser) {
      set({authUser:getUser});
      localStorage.setItem('authUser', JSON.stringify(getUser));
      setUserLog({ email: '', password: '' });
      navigate('/dashboard');
      showMessage('success', 'Login success');
      return;
    }

    showMessage('error', 'Login failed invalid credentials');
  } catch (err) {
    showMessage('error', 'Server error');
  }
};

export const handleRegister = async (set,get,navigate,formData) => {
  
  //Register form validation
  let isValid = handleRegisterValidation(set,formData)
  
  // If validation errors exist
  if(!isValid)return;

  try {

    // Check if email already exists
    const emailCheck = await axios.get(`${USERS_API}?email=${formData.email}`);

    if (emailCheck.data.length > 0) {
      set({error:{email: 'Email already taken' }});
      return;
    }

    // Create user
    const createUser = await axios.post(USERS_API, formData);

    localStorage.setItem(
      'authUser',
      JSON.stringify(createUser.data)
    );

    set({authUser:createUser.data}); // update auth
    set({error:{ name: '', email: '', password: '' }}); // clear errors
    showMessage('success', 'Registration successful');
    navigate('/dashboard');

  } catch (err) {
    showMessage('error', 'Internal server error');
    console.error(err);
  }
};


