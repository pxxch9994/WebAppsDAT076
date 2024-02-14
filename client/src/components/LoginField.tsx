import React, { useState, ChangeEvent, FormEvent } from 'react';
import "../style/LoginField.css";
import axios from 'axios';
import {NavigateFunction, useNavigate} from 'react-router-dom';

interface LoginProps {
    // Define props here if any
}

const LoginField: React.FC<LoginProps> = () => {
    // State variables to store username and password
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate(); // This uses the navigate function from React Router v6

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior
        try {
            const response = await axios.post('http://localhost:8080/user/login', { username, password }, { withCredentials: true });
            console.log('Login successful:', response.data);
            // Reset any error upon successful login
            setError('');
            navigate('/profile'); // Navigate to home page on success
        } catch (error: any) {
            console.error('Login failed:', error.response ? error.response.data : 'Login failed');
            // Update error state to display the error message
            setError('Login failed. Please check your username and password.');
            // Optionally, keep the user on the login page or navigate to a specific error page
        }
    };


    const togglePassword: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        const button = event.currentTarget; // CurrentTarget is the button that triggered the event
        button.classList.toggle("showing");
        console.log("hello");
        const input = document.getElementById("password") as HTMLInputElement;
        if (input) {
            input.type = input.type === "password" ? "text" : "password";
            console.log("hello");
            input.focus();
        }
    };


    return (
        <>
            <head>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,600,0,0"/>
                <title>Login</title>

            </head>
            <div className="login">

                <h2>Login</h2>
                <div className="flex-container">

                    <button type="submit" className="login-form-button">LOGIN</button>

                    <button type="submit" className="login-form-button">REGISTE</button>
                </div>
                <h3>Welcome to PetCom</h3>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="textbox">
                        <input type="text" placeholder="Username" value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                        <span className="material-symbols-outlined"> account_circle </span>
                    </div>
                    <div className="textbox">
                        <input type="password" id="password" className="control" placeholder="Password" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                        <span className="material-symbols-outlined"> lock </span>
                        <button
                            className="toggle-hidden"
                            type="button"
                            onClick={togglePassword}
                        ></button>
                    </div>
                    <button type="submit" className="login-form-button">LOGIN</button>
                    {error && <p className="error">{error}</p>}
                </form>
                <a href="">Forgot your credentials?</a>
            </div>
        </>
    );
};

export default LoginField;