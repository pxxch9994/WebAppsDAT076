import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import Home from './pages/Home';
import { Nav } from "react-bootstrap";
import { MemoryRouter } from 'react-router-dom';
import NavBar from "./components/CustomNavbar";
import LoginRegisterSwitch from "./components/LoginRegisterSwitch";
import LoginField from './components/LoginField';

test('renders texts in Home', () => {
  render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
  );
  screen.debug();
  const bText = screen.getByText(/Blixten is waiting to find a new family!/i);
  expect(bText).toBeInTheDocument();
});

test('renders navbar links', () => {
  render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
  );

  screen.debug();

  const linkElement = screen.getByText(/Home/i);
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


jest.mock('axios', () => ({
    post: jest.fn(),
}));

test('submits login form with valid credentials', async () => {
    (axios.post as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ data: 'Login successful' })
    );

    render(
        <MemoryRouter>
            <LoginField toggleRegister={() => {}} />
        </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByText('LOGIN');

    // test login with CORRECT credentials
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: '123' } })
    fireEvent.click(loginButton);

    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:8080/user/login',
            { username: 'admin', password: '123' },
            { withCredentials: true }
        );
    });

});