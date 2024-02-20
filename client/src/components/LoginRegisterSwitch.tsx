import React, { useState } from 'react';
import LoginField from './LoginField';
import RegisterField from "./RegisterField";
import "../style/LoginRegisterSwitch.css";

const LoginRegisterSwitch: React.FC = () => {
    // State to track which component to show
    const [showComponentA, setShowComponentA] = useState(true);

    // Function to toggle between components

    const toggleLogin = () => {
        setShowComponentA(true);
    };
    const toggleRegister = () => {
        setShowComponentA(false);
    };


    return (
        <div className="center-container">
            <div className="align-content-center">
            {showComponentA ? <LoginField toggleRegister={toggleRegister}/> : <RegisterField toggleLogin={toggleLogin}/>}
            </div>
        </div>
    );
};

export default LoginRegisterSwitch;