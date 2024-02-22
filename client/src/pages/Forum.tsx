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
import Lily from '../images/Lily.jpeg';
import bob from '../images/berner-sennen.png';


const Forum: React.FC = () => {
    const [bool, setBool] = useState(false);
    const [string, setString] = useState("");
    const [num, setNum] = useState(0);

    return(
        <>
            <NavBar/>
            <div className="card-container">
                <Card
                    endpoint="endpoint"
                    name="Bob Berner"
                    image= {bob}
                    breed="Berner Sennen"
                    status="Lost"
                    description="Bob was lost at 2 PM in Gothenburg, Lindholmen."
                />

                <Card
                    endpoint="endpoint"
                    name="Lily"
                    image = {Lily}
                    breed="Exotic Shorthair"
                    status="Lost"
                    description="Lily was last seen 7 AM at Chalmers, Johanneberg."
                />
            </div>
        </>
    );
}

export default Forum;