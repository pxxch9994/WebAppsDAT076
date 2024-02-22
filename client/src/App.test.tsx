import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import { Nav } from "react-bootstrap";
import { MemoryRouter } from 'react-router-dom';
import NavBar from "./components/NavBar";
import LoginRegisterSwitch from "./components/LoginRegisterSwitch";




test('renders texts in Home', () => {
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );
    screen.debug();
    const bText = screen.getByText(/Blixten längtar efter att hitta en ny familj!/i);
    expect(bText).toBeInTheDocument();
});

test('renders navbar links', () => {
    render(
        <MemoryRouter>
            <NavBar />
        </MemoryRouter>
    );

    screen.debug();

    const linkElement = screen.getByText(/Lost & Found/i);
    expect(linkElement).toBeInTheDocument();

});
//test for Register
test('renders Register button', () => {
    render(
        <MemoryRouter>
            <LoginRegisterSwitch />
        </MemoryRouter>
    );

    const buttonElement = screen.getByText(/Register/i);
    expect(buttonElement).toBeInTheDocument();
});