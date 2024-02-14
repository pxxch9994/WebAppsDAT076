import React from 'react';
import '../style/Pages.css';
import LoginRegisterSwitch from "../components/LoginRegisterSwitch";
import LoginField from "../components/LoginField";
import NavBar from "../components/NavBar";


const Login: React.FC = () => {
    return (
        <>
            <NavBar />

            <LoginRegisterSwitch />

        </>
    );
}

export default Login;
