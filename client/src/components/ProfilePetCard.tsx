import React, {useState} from 'react';
import '../style/ProfilePetCard.css';
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ForumPetCard from "./ForumPetCard";
import {IPet} from "../interfaces/IPet";
import axios from "axios";


// TODO much repetitive code here. Fix one function to rule them all
const deletePet = async (id: number) => {
    try {
        return await axios.delete(`http://localhost:8080/pet/${id}`, {withCredentials: true});
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
};

const setMissing = async (id: number) => {
    try {
        return await axios.patch(`http://localhost:8080/pet/${id}`, {status:"missing"}, {withCredentials: true});
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
};

const setAdoption = async (id: number) => {
    try {
        return await axios.patch(`http://localhost:8080/pet/${id}`, {status:"adopt"}, {withCredentials: true});
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
};

const setFound = async (id: number) => {
    try {
        return await axios.patch(`http://localhost:8080/pet/${id}`, {status:"found"}, {withCredentials: true});
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
};

const setPrivate = async (id: number) => {
    try {
        return await axios.patch(`http://localhost:8080/pet/${id}`, {status:"private"}, {withCredentials: true});
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
};


// ProfilePetCard a pet card. One for each owned pet located on the Profile page
// It takes an IPet interface and uses its attributes to display the pet-information
const ProfilePetCard: React.FC<{ pet: IPet }> = ({ pet}) => {
    const [petStatus, setPetStatus] = useState("Status");
    const [showModal, setShowModal] = useState(false);
    const [dropdown, setDropdown] = useState(false);


    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleToggle = () => {
        setDropdown(!dropdown);
    };

    // TODO The browser should automatically refresh and display the new data when petStatus is changed
    return (
        <>
            <Modal show={showModal} onHide={handleClose} style={{backgroundColor:"none"}}>
                    <Form>
                        <ForumPetCard pet={pet}></ForumPetCard>
                    </Form>
            </Modal>
            <ListGroup as="ol">
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    style={{border: "none"}}
                >
                        <div className="" style={{display:"flex"}}>
                        <div className="dark-pet-card" style={{cursor: 'pointer'}} onClick={handleShow}>
                            <div className="dark-profile-picture">
                                <img src={pet.image} alt={pet.name}/>
                            </div>
                            <div className="dark-profile-info">
                                <span className="dark-name">{pet.name}</span>
                                <span>Status: {pet.status}</span>
                            </div>
                        </div>
                            <Dropdown className={"profileCardDropdown"} data-bs-theme="dark">
                                <Dropdown.Toggle id="dropdown-button-dark-example1"
                                                 variant="secondary" >{petStatus}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={(e) => setMissing(pet.id)}>Missing</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => setAdoption(pet.id)}>Adoption</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => setFound(pet.id)}>Found</Dropdown.Item>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item onClick={(e) => setPrivate(pet.id)}>Private</Dropdown.Item>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item onClick={(e) => setPetStatus("")}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => deletePet(pet.id)}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                </ListGroup.Item>
            </ListGroup>
        </>
);
};

export default ProfilePetCard;
