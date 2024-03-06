import React, {ReactNode, useEffect, useState} from 'react';
import {To, useNavigate} from 'react-router-dom';
import '../style/CustomNavbar.css';
import Logout from "./Logout";
import {ISessionData} from "../interfaces/ISessionData";
import { Navbar, Nav } from 'react-bootstrap';
import axios from "axios";

/**
 * Navbar component.
 * Displays navigation links and handles user session data to show appropriate buttons.
 * Uses React Router for navigation and axios for making API requests.
 */
const CustomNavbar: React.FC = () => {

    const [user, setUser] = useState<ISessionData | null>();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    /**
     * Fetches user session data on component mount to determine login status.
     * Sets the user state based on the fetched data.
     * Decides if we are showing the logout or login button.
     */
    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const data: ISessionData = await axios.get('http://localhost:8080/user/session', {withCredentials: true});
                console.log(data);
                setUser(data);
                setLoggedIn(true);
            } catch (error) {
                setError('Failed to fetch user session');
                setLoggedIn(false);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSessionData();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    /**
     * Navigates to the specified path using React Router's useNavigate hook.
     *
     * @param {To} path - The path to navigate to.
     */
    const handleNavigate = (path: To) => {
        navigate(path);
    };

    /**
     * We decided to use React useNavigate instead of href or similar,
     * since useNavigate creates a smoother navigation system and won't reload the page if we are already on it.
     *
     * @returns {JSX.Element} The JSX representation of the Navbar component.
     */
    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand style={{color:"var(--bs-light)"}}>PetCommunity</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link style={{color:"var(--bs-light)"}} onClick={() => handleNavigate("/")}>Home</Nav.Link>
                    <Nav.Link style={{color:"var(--bs-light)"}} onClick={() => handleNavigate("/forum")}>Pet Forum</Nav.Link>
                    <Nav.Link style={{color:"var(--bs-light)"}} onClick={() => handleNavigate("/profile")}>Profile</Nav.Link>
                    <Nav.Link style={{color:"var(--bs-light)"}} onClick={() => handleNavigate("/devtest")}>DevTest</Nav.Link>
                    {user &&
                        <Logout />
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
  );
};

export default CustomNavbar;
