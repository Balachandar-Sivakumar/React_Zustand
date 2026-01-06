import React from "react";
import showMessage from "./notification";

export const HandleLogin = (setError,userLog,setUserLog,users,setAuth,navigate) => {
     
          //validate the fileds
        let newError = {email:'',password:''}
        if(!userLog.email.trim()) newError.email='Email id required'
        if(!userLog.password.trim())newError.password='Password is required'
       
        if(newError.email || newError.password){
              setError(newError)
            return
        }

        ///getting the user
        let getUser = users.find(user => user.email === userLog.email && user.password === userLog.password) 

        //if the user is valid he is going to dashboard
        if(getUser){
            setAuth(getUser) //Update the login user
            localStorage.setItem('authUser',JSON.stringify(getUser))
            setUserLog({email:'',password:''}) //clearing the login form
             navigate('/dashboard')  //navigate to dashboard
            showMessage('success',"Login success")  /// showing succes essage
            return
        }
        
        showMessage('error',"Login failed invalid credential") /// showing the error message    
}

export const handleRegister = ( setError, setAuth, navigate, formdata, setUsers, users) => {
    let newError = { email: "", password: "", name: '' };

    //validate the fileds
    if (!formdata.name.trim()) newError.name = "Username is required";
    if (!formdata.email.trim()) newError.email = "Email id required";
    if (!formdata.password.trim()) newError.password = "Password is required";
     if(formdata.password.trim().length < 6) newError.password ='Password must minimum 6 characters'
    
    if (newError.name || newError.email || newError.password) {
        setError(newError);
        return;
    }

    let checkEmail = users.find(user => user.email === formdata.email)

    if(checkEmail){
        showMessage('error','Email id already taken')
        return
    }

    localStorage.setItem('authUser',JSON.stringify(formdata))
    localStorage.setItem('users',JSON.stringify([...users,formdata]))
    setAuth(formdata);      ///Updating the Auth
    setUsers(formdata);    ///Addeng the user
    navigate('/dashboard'); ///navigate to dashboard
    showMessage('success', 'Registration successful');  ///showing message succes 

};

