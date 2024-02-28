import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {ButtonGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../style/UserSettings.css"
import {ISessionData} from "../interfaces/ISessionData";
import {useNavigate} from 'react-router-dom';
import {LogoutUser} from "./Logout";

function UserSettings() {

    const [error, setError] = useState<string>('');

    const deletePets = async (username: string) => {
        try {
            // @ts-ignore
            return await axios.delete(`http://localhost:8080/pet/all/${username}`, {withCredentials: true});
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    };

    const navigate = useNavigate(); // This uses the navigate function from React Router v6

    const DeleteUser = async () =>{


        console.log("DELETE");
        try {
            const session:ISessionData = await axios.get(`http://localhost:8080/user/session`, { withCredentials: true });
            // @ts-ignore
            console.log(session.data.username);
            // @ts-ignore
            await deletePets(session.data.username);
            // @ts-ignore
            const response = await axios.delete(`http://localhost:8080/user/${session.data.username}`, { withCredentials: true });

            await LogoutUser(navigate);
            console.log(response + "The account has been deleted successfully");
            console.log(response + "All pets for this user have been deleted successfully");

        }catch (error) {
            console.error("The account could not be deleted",error);
            setError('Account could not be deleted');
        }
    }

    return (
        <ButtonGroup vertical>
            <Button onClick={DeleteUser} className={"button-49"}>Delete Account</Button>
            {error && <p className="error">{error}</p>}
        </ButtonGroup>
    );

}

export default UserSettings;