import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Logout() {
    const [id, setId] = useState("");


    const navigate = useNavigate(); // This uses the navigate function from React Router v6


    const LogoutUser = async () => {
        try {
            const res  = await axios.get(`http://localhost:8080/user/logout`, { withCredentials: true });
            console.log('Logout successful', res.data);
            navigate('/login'); // Using useNavigate from React Router for redirection
        } catch (error: any) {
            console.error('Logout failed', error.response?.data || error.message);
        }
    };


    return (
        <>
            <Button variant="danger" onClick={LogoutUser}>
                Logout
            </Button>
        </>
    );
}

export default Logout;