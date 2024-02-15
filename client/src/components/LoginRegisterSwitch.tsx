import React, { useState } from 'react';
import LoginField from './LoginField';
import RegisterField from "./RegisterField";
import "../style/LoginRegisterSwitch.css";

const LoginRegisterSwitch: React.FC = () => {
    // State to track which component to show
    const [showComponentA, setShowComponentA] = useState(true);
    const [showLogin, setShowLogin] = useState(true);

    // Function to toggle between components
    const toggleComponent = () => {
        setShowComponentA(!showComponentA);
        setShowLogin(!showLogin);
    };

    function LoginButton() {
        return (
            <div>
                <a onClick={toggleComponent} className="bn16">Login</a>
            </div>
        );
    }

    function RegisterButton() {
        return (
            <div>
                <a onClick={toggleComponent} className="bn16">Register</a>
            </div>
        );
    }

    return (
        <div className="center-container">
            <div className="align-content-center">
            {showLogin ? <RegisterButton /> : <LoginButton />}
            {showComponentA ? <LoginField /> : <RegisterField />}
            </div>
        </div>
    );
};

export default LoginRegisterSwitch;