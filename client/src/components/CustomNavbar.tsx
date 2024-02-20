import React, {ReactNode, useEffect, useState} from 'react';
import {To, useNavigate} from 'react-router-dom';
import '../style/CustomNavbar.css';
import Logout from "./Logout";
import {I_SessionData} from "../interfaces/I_SessionData";
import { Navbar, Nav } from 'react-bootstrap';
import axios from "axios";

interface NavbarProps {
  children?: ReactNode;
}

const CustomNavbar: React.FC<NavbarProps> = ({ children }) => {

    const [user, setUser] = useState<I_SessionData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const data: I_SessionData = await axios.get('http://localhost:8080/user/session', {withCredentials: true});
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

                    {user &&
                        <Logout />
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
  );
};

export default CustomNavbar;
