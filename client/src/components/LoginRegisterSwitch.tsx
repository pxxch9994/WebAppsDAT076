import React, { useState } from 'react';
import LoginField from './LoginField';
import RegisterField from "./RegisterField";
import "../style/LoginRegisterSwitch.css";

/**
 * React component for toggling between the login and registration forms.
 *
 * @returns {JSX.Element} The JSX representation of the LoginRegisterSwitch component.
 */
const LoginRegisterSwitch: React.FC = () => {

    const [showComponentA, setShowComponentA] = useState(true); // State to track which component to show

    const toggleLogin = () => {
        setShowComponentA(true);
    };
    const toggleRegister = () => {
        setShowComponentA(false);
    };

    return (
        <>
            <div className="center-container">
                <div className="align-content-center">
                    {showComponentA ? <LoginField toggleRegister={toggleRegister}/> :
                        <RegisterField toggleLogin={toggleLogin}/>}
                </div>
            </div>
        </>
    );
};

export default LoginRegisterSwitch;