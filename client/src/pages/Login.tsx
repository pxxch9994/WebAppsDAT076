import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import './Pages.css';

/**
 * LoginContainer component for handling user login.
 */
const LoginContainer: React.FC = () => {
    
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    
    const [activeContainer, setActiveContainer] = useState('login');
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        if (isLoggedIn) {
            navigate('/myprofile');
        }
    }, [isLoggedIn, navigate]);

    /**
    * Handles the login button click event.
    */
    const handleLogin = async () => {
        try {
            await login(username, password);
            setIsLoggedIn(true);
            navigate('/myprofile');
        } catch (error: any) {
            setLoginError(error.message);
            console.error('Invalid username or password:', error);
        }
    };
                
    return (
        <div>
            <h1>Login</h1>
            <form>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {loginError && <span className="text-danger">{loginError}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
};

/**
 * RegisterContainer component for handling user registration.
 */
const RegisterContainer: React.FC = () => {

    const { register } = useAuth();
    
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    
    /**
     * Handles the register button click event.
     */
    const handleRegister = async () => {
        try {
            const usernameCheckResponse = await fetch(`http://localhost:8080/users/${newUsername}`);

            if (usernameCheckResponse.status === 200) {
                setUsernameError('Username already exists.');
                return;
            }

            if (newPassword !== confirmedPassword) {
            
                setPasswordError('Password and Confirm Password do not match.');
            } else {
                
                await register(newUsername, newPassword, confirmedPassword);
                clearErrors();
            }
        } catch (error) {
            console.error('Error checking username or during registration:', error);
        }
    };
    
    const clearErrors = () => {
        setUsernameError(null);
        setPasswordError(null);
    };
      
    return (
        <div>
            <h1>Register</h1>
            <form>

            <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={newUsername}
                        onChange={(e) => {
                            setNewUsername(e.target.value);
                            clearErrors();
                        }}
                    />
                    {usernameError && <span className="text-danger">{usernameError}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                        Password
                    </label>
                    <div className="input-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                clearErrors();
                            }}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <div className="input-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            id="confirmPassword"
                            value={confirmedPassword}
                            onChange={(e) => {
                                setConfirmedPassword(e.target.value);
                                clearErrors(); 
                            }}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
                        >
                            {showConfirmedPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {passwordError && <span className="text-danger">{passwordError}</span>}
                </div>
                <button type="button" className="btn btn-primary" onClick={handleRegister}>
                    Register
                </button>
            </form>
            </div>
    );
};


/**
 * Manages container switching.
 */
const ContainerSwitching: React.FC = () => {
    const [activeContainer, setActiveContainer] = useState('login');

    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/myprofile');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '20px' }}>
            <div style={{ maxWidth: '500px', width: '100%', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                <div className="btn-group mb-3" role="group" aria-label="Login/Register Switch">
                    <button type="button" className={`btn ${activeContainer === 'login' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveContainer('login')}>Login</button>
                    <button type="button" className={`btn ${activeContainer === 'register' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveContainer('register')}>Register</button>
                </div>

                {activeContainer === 'login' ? <LoginContainer /> : <RegisterContainer />}

            </div>
        </div>
    );
};

export default ContainerSwitching;


