
import '../style/Pages.css';
import NavBar from "../components/CustomNavbar";
import AddPet from "../components/AddPet";
import {ForumFilter} from "../components/ForumFilter"
import React from "react";
const Forum: React.FC = () => {
    return (
        <>
            <NavBar />
            <AddPet />
                <ForumFilter />
        </>
    );
}
export default Forum;