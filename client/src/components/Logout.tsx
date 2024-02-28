import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";

// Define LogoutUser outside of the Logout component
export const LogoutUser = async (navigate: NavigateFunction) => {
    try {
        const res  = await axios.get(`http://localhost:8080/user/logout`, { withCredentials: true });
        console.log('Logout successful', res.data);
        navigate('/login');
    } catch (error: any) {
        console.error('Logout failed', error.response?.data || error.message);
    }
};

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
