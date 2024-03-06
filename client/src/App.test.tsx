/**
 * Testing the rendering and functionality of components in the React application using Jest and
 * the `@testing-library/react` library.
 */

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

/**
 * Test to ensure that specific texts are rendered in the Home component.
 */
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

/**
 * Ensuring that navbar links are rendered.
 */
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

/**
 * Test to simulate the submission of a login form with valid credentials.
 */
test('submits login form with valid credentials', async () => {

    // Mocking the Axios post method to resolve with successful login data.
    (axios.post as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ data: 'Login successful' })
    );

    render(
        <MemoryRouter>
            <LoginField toggleRegister={() => {}} />
        </MemoryRouter>
    );

    // Selecting form inputs and login button.
    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByText('LOGIN');

    // Filling in the form with correct credentials.
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: '123' } })
    fireEvent.click(loginButton);

    // Waiting for the Axios post request to be called with the expected parameters.
    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:8080/user/login',
            { username: 'admin', password: '123' },
            { withCredentials: true }
        );
    });

});

