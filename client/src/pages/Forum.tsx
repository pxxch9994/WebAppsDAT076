import React, {useState} from "react";
import NavBar from "../components/NavBar";
import PostNoImage from "../components/PostNoImage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/Forum.css"


const Forum: React.FC = () => {
    const [bool, setBool] = useState(false);
    const [string, setString] = useState("");
    const [num, setNum] = useState(0);

    return(
        <>
            <NavBar />
            <PostNoImage />
        </>
    );
}

export default Forum;