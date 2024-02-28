import React, {useEffect, useState} from 'react';
import '../style/Pages.css';
import NavBar from "../components/CustomNavbar";
import ForumPetCard from "../components/ForumPetCard";
import {Col, Container, Row} from 'react-bootstrap';
import axios from "axios";
import AddPet from "../components/AddPet";
import {IPet} from "../interfaces/IPet";

const Forum: React.FC = () => {


    return (
        <>
            <NavBar />
            <AddPet />

                <CustomDropdown />

        </>
    );
}

export default Forum;