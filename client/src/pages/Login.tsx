import React, { useState } from 'react';
import './Pages.css';

/**
 * LoginContainer component for handling user login.
 */
const LoginContainer: React.FC = () => {
    
    const [identifier, setIdentifier] = useState(''); // create state variables for identifier and password
    const [password, setPassword] = useState('');

    /**
    * Handles the login button click event.
    */
    const handleLogin = () => {
        // TODO: login logic
        console.log('Logging in with:', identifier, password);
    };

    return (
        <div>
        <h1>Login</h1>
        <form>
            <div className="mb-3">
            <label htmlFor="identifier" className="form-label">Email or Username</label>
            <input type="text" className="form-control" id="identifier" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
            </div>
            <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
  const [name, setName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  /**
   * Handles the register button click event.
   */
  const handleRegister = () => {
    // TODO: registration logic
    console.log('Registering with:', name, newEmail, newPassword);
  };

  return (
    <div>
      <h1>Register</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="newEmail" className="form-label">Email address</label>
          <input type="email" className="form-control" id="newEmail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
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
  