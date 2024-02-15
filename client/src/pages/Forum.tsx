import React, {useState} from "react";
import NavBar from "../components/NavBar";
import PostNoImage from "../components/PostNoImage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/Forum.css"
import LostAndFound from "../components/LostAndFound";
import Card from "../components/Card";
import LoginField from "../components/LoginField";
import AddPet from "../components/AddPet";
import Navbar from "../components/NavBar"


const Forum: React.FC = () => {
    const [bool, setBool] = useState(false);
    const [string, setString] = useState("");
    const [num, setNum] = useState(0);

    return(
        <>
            <NavBar />
            <AddPet />
            <Card />
        </>
    );
}

export default Forum;