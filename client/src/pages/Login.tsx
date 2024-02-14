import React from 'react';
import '../style/Pages.css';
import LoginRegisterSwitch from "../components/LoginRegisterSwitch";
import LoginField from "../components/LoginField";
import NavBar from "../components/NavBar";


const Login: React.FC = () => {
    return (
        <>
            <NavBar />
            <h1>Lost & Found Page</h1>
            <LoginRegisterSwitch />

        </>
    );
}

export default Login;
