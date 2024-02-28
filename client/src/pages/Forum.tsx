import React, {useEffect, useState} from 'react';
import '../style/Pages.css';
import NavBar from "../components/CustomNavbar";
import ForumPetCard from "../components/ForumPetCard";
import {Col, Container, Dropdown, DropdownButton, Row} from 'react-bootstrap';
import axios, {all} from "axios";
import AddPet from "../components/AddPet";
import {IPet} from "../interfaces/IPet";
import Button from "react-bootstrap/Button";
import {CustomDropdown} from "../components/ForumFilter"

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