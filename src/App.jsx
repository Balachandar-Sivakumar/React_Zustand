import logo from './logo.svg';
import './App.css';
import RegisterForm from './component/registerForm';
import Dashboard from './component/dashboard';
import LoginForm from './component/loginForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<LoginForm/>}/>
      <Route path="/register" element={<RegisterForm/>}/>
      <Route path="/dashboard" element = {<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
