import React, { useState, FormEvent } from 'react';
import "../style/LoginField.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

interface LoginProps {
    toggleRegister: () => void;
}

const LoginField: React.FC<LoginProps> = ({toggleRegister}) => {
    // State variables to store username and password
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/user/login', { username, password }, { withCredentials: true });
            console.log('Login successful:', response.data);
            setError('');
            navigate('/'); // Navigate to the profile page on success
        } catch (error: any) {
            console.error('Login failed:', error.response ? error.response.data : 'Login failed');
            // Update error state to display the error message
            setError('Login failed. Please check your username and password.');
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

    function ToggleVisibilityIcon() {
        if (passwordVisibility) {
            return (
                <div>
                        <span className="material-symbols-outlined toggle-hidden"
                              onClick={togglePassword}> visibility_off </span>
                </div>
            );
        } else {
            return (
                <div>
                        <span className="material-symbols-outlined toggle-hidden"
                              onClick={togglePassword}> visibility </span>
                </div>
            );
        }
    }


    return (
        <>
            <div className="login">
                <h2>Login</h2>
                <h3>Welcome to PetCom</h3>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="textbox">
                        <input type="text" placeholder="Username" value={username}  onChange={(e) => setUsername(e.target.value)} />
                        <span className="material-symbols-outlined textboxIcons"> account_circle </span>
                    </div>
                    <div className="textbox">
                        <input type="password" id="password" className="control" placeholder="Password" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                        <span className="material-symbols-outlined textboxIcons"> lock </span>
                        <ToggleVisibilityIcon />
                    </div>
                    <button type="submit" className="login-form-button">LOGIN</button>
                    <button className="bn16" onClick={toggleRegister}>REGISTER</button>
                    {error && <p className="login-error">{error}</p>}
                </form>
                <a href="">Forgot your credentials?</a>
            </div>
        </>
    )};

export default LoginField;