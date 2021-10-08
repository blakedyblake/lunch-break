import LogIn from "../components/Login/LoginForm";
import SignIn from "../components/Login/SignInForm";
import LoginPicture from "../components/Login/TitlePicture";
import React from "react";


const LoginPage = ()=>{
    return(
        <div id='loginPage'> 
        <h1 className="login-title">Lunch Break</h1> 
            <LoginPicture/>
            <LogIn/>
            <SignIn/>

        </div>
    )
}

export default LoginPage;