import React, {ReactNode, useEffect, useState} from 'react';
import {To, useNavigate} from 'react-router-dom';
import '../style/CustomNavbar.css';
import Logout from "./Logout";
import {ISessionData} from "../interfaces/ISessionData";
import { Navbar, Nav } from 'react-bootstrap';
import axios from "axios";

const CustomNavbar: React.FC = () => {

    const [user, setUser] = useState<ISessionData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    // Checks if there is a session, which decides if we are showing the logout or login button
    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const data: ISessionData = await axios.get('http://localhost:8080/user/session', {withCredentials: true});
                setUser(data);
            } catch (error) {
                setError('Failed to fetch user session');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSessionData();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    const handleNavigate = (path: To) => {
        navigate(path);
    };


    // We decided to use React useNavigate instead of href or similar,
    // since useNavigate creates a smoother navigation system and won't reload the page if we are already on it
    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand style={{color:"var(--bs-light)"}}>........PetCommunity</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link style={{color:"var(--bs-light)"}} onClick={() => handleNavigate("/")}>Home</Nav.Link>
                    <Nav.Link style={{color:"var(--bs-light)"}} onClick={() => handleNavigate("/forum")}>Pet Forum</Nav.Link>
                    <Nav.Link style={{color:"var(--bs-light)"}} onClick={() => handleNavigate("/profile")}>Profile</Nav.Link>
                    <Nav.Link style={{color:"var(--bs-light)"}} onClick={() => handleNavigate("/devtest")}>DevTest</Nav.Link>
                    {!user &&
                        <Nav.Link onClick={() => handleNavigate("/login")}>Login</Nav.Link>
                    }

                    // TODO FIX Logout button is for unknown reason always visible.
                    {user &&
                        <Logout />
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
  );
};

export default CustomNavbar;
