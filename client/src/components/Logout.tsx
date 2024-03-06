import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";

/**
 * Asynchronous function to log out the user by making a request to the server.
 *
 * @param {NavigateFunction} navigate - The navigate function from React Router v6 for redirection.
 * @returns {Promise<void>} A Promise that resolves after the logout operation completes.
 */
export const LogoutUser = async (navigate: NavigateFunction) => {
    try {
        const res  = await axios.get(`http://localhost:8080/user/logout`, { withCredentials: true });
        console.log('Logout successful', res.data);
        navigate('/login');
    } catch (error: any) {
        console.error('Logout failed', error.response?.data || error.message);
    }
};

/**
 * Handles user logout.
 *
 * @returns {JSX.Element} The JSX representation of the Logout component.
 */
function Logout() {
    const navigate = useNavigate(); // This uses the navigate function from React Router v6

    return (
        <>
            <Button variant="danger" onClick={() => LogoutUser(navigate)}>
                Logout
            </Button>
        </>
    );
}

export default Logout;
