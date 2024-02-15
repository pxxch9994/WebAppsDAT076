import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/Forum.css"
import NavBar from "../components/NavBar";
import React, {useState} from "react";
import UserList from "../components/UserList";
import PetList from "../components/PetList";


const DevTest: React.FC= () => {

    const [bool, setBool] = useState(false);
    const [string, setString] = useState("");
    const [num, setNum] = useState(0);
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