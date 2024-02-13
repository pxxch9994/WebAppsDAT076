import React, { useState } from 'react';
import './Pages.css';




/**
 * LoginContainer component for handling user login.
 */
const LoginContainer: React.FC = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    
    /**
    * Handles the login button click event.
    */
    const handleLogin = async () => {
        try {
            // Checking username and password using fetch
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, password }),
            });

            if (response.ok) {
                const user = await response.json();

                // TODO: Handle successful login
                
                console.log('Login successful:', user);

            } else {
                setLoginError('Invalid username or password');
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            setLoginError('An error occurred during login');
            console.error('Error during login:', error);
        }
    };
    return (
        <div>
            <h1>Login</h1>
            <form>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {loginError && <span className="text-danger">{loginError}</span>} {/* Display error message */}
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
// Inside RegisterContainer component
const RegisterContainer: React.FC = () => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [usernameExists, setUsernameExists] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);


    const handleCheckUsername = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/${newUsername}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (response.status === 200) {
              setUsernameExists(true);
              console.log('Username already exists.');
            } else if (response.status === 404) {
              setUsernameExists(false);
              console.log('Username is available.');
            } else {
              console.error('Error checking username:', response.statusText);
            }
            } catch (error) {
                console.error('Error checking username:', error);
            }
      };

    /**
     * Handles the register button click event.
     */
    const handleRegister = async () => {
        try {

            await handleCheckUsername();

            if (!usernameExists) {

                if (newPassword !== confirmedPassword) {
                    console.error('Password and Confirm Password do not match.');
                    return;
                }

                const response = await fetch('http://localhost:8080/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: newUsername, password: newPassword }),
                });

                if (response.ok) {
                    const newUser = await response.json();

                    // TODO: Handle successful registration

                    console.log('Registration successful:', newUser);
                } else {
                    console.error('Registration failed:', response.statusText);
                }
            }else{
                console.error('Username already exists. Choose a different username.');
            }

        } catch (error) {
            console.error('Error during registration:', error);
        }

    };
  
  
    return (
        <div>
            <h1>Register</h1>
            <form>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Username</label>
                    <input type="text" className="form-control" id="name" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
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

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="confirmPassword"
                            value={confirmedPassword}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
                        >
                            {showConfirmedPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <button type="button" className="btn btn-primary" onClick={handleRegister}>Register</button>

            </form>
        </div>
    );
};

/**
 * Manages container switching.
 */
const Login: React.FC = () => {
    const [activeContainer, setActiveContainer] = useState('login');
  
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '20px' }}>
        <div style={{ maxWidth: '500px', width: '100%', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <div className="btn-group mb-3" role="group" aria-label="Login/Register Switch">
            <button type="button" className={`btn ${activeContainer === 'login' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveContainer('login')}>Login</button>
            <button type="button" className={`btn ${activeContainer === 'register' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveContainer('register')}>Register</button>
          </div>
  
        {/* Display either LoginContainer or RegisterContainer based on activeContainer */}
          {activeContainer === 'login' ? <LoginContainer /> : <RegisterContainer />}
        </div>
      </div>
    );
};

export default Login;
