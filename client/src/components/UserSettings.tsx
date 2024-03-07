import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {ButtonGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../style/UserSettings.css"
import {ISessionData} from "../interfaces/ISessionData";
import {useNavigate} from 'react-router-dom';
import {LogoutUser} from "./Logout";
/**
 * Component for user settings, including the option to delete the user account.
 */
function UserSettings() {
    const [error, setError] = useState<string>('');
    // Function to delete pets associated with the user
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
    // Function to delete the user account
    const DeleteUser = async () =>{

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
            <div style={{marginLeft:"50px"}}>
                <h1>Settings:</h1>
                <div style={{border: "5px solid lightgray", width:"auto", height:"auto", padding:"10px", minHeight:"500px"}}>
                    <Button onClick={DeleteUser} className={"button-49"} style={{width:"auto"}}><p> DeleteAccount </p></Button>
                </div>
            </div>
            {error && <p className="error">{error}</p>}
        </ButtonGroup>
    );

}
export default UserSettings;