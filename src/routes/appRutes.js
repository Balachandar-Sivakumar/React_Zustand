import React from "react";
import { Routes, Route } from "react-router-dom";
import MultiTodo from "../components/mainModel";
import LoginForm from "../components/loginFormModel";
import RegisterForm from "../components/registerFormModel";
import NotFound from "../components/pageNotFound404";

const AppRouts = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/dashboard" element={<MultiTodo />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouts;
