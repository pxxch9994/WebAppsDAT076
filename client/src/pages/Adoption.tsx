import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/Forum.css"
import NavBar from "../components/CustomNavbar";
import React, {useState} from "react";


const Adoption: React.FC= () => {

    const [bool, setBool] = useState(false);
    const [string, setString] = useState("");
    const [num, setNum] = useState(0);
    return(
        <>
            <NavBar />

        </>
    );
}

export default Adoption;