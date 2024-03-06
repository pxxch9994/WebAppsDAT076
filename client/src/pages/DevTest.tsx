import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/Forum.css"
import NavBar from "../components/CustomNavbar";
import React, {useState} from "react";
import UserList from "../components/UserList";
import PetList from "../components/PetList";
// Page for development testing purposes
const DevTest: React.FC= () => {
    return(
        <>
            <NavBar />
            <h2>User List:</h2>
            <UserList />
            <h2>Pet List:</h2>
            <PetList />

        </>
    );
}
export default DevTest;