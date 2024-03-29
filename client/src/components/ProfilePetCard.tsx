import React, {useState} from 'react';
import '../style/ProfilePetCard.css';
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ForumPetCard from "./ForumPetCard";
import {IPet, IPetUpdate} from "../interfaces/IPet";
import axios, {AxiosResponse} from "axios";
import PetModal from "../components/PetModal"


/**
 * Deletes a pet with the specified ID.
 *
 * @param {number} id - The ID of the pet to be deleted.
 * @returns {Promise<any>} - A promise that resolves when the deletion is successful.
 * @throws {Error} - If an error occurs during the deletion process.
 */
const deletePet = async(id: number) => {
    try {
        return await axios.delete(`http://localhost:8080/pet/${id}`, {withCredentials: true}).then(refreshPage);
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
};

/**
 * Sets the status of a pet to "private", "missing", "found" or "adopt".
 *
 * @param {number} id - The ID of the pet
 * @param status - The updated status of the pet
 * @returns {Promise<any>} - A promise that resolves when the status is successfully updated.
 * @throws {Error} - If an error occurs during the update process.
 */
const setStatus = async(id: number, status: string): Promise<any> => {
    if(status == "private" || status == "missing" || status == "found" || status == "adopt")
        try {
            return await axios.patch(`http://localhost:8080/pet/${id}`, {status:status}, {withCredentials: true}).then(refreshPage);
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    else {
        console.error('That status dose not exist')
    }
}
function refreshPage() {
    window.location.reload();
}

/**
 * ProfilePetCard component displays a pet card for each owned pet on the Profile page.
 * It utilizes the IPet interface attributes to showcase pet information.
 *
 * @param {Object} props - Component properties
 * @param {IPet} props.pet - Pet data to be displayed
 */
const ProfilePetCard: React.FC<{ pet: IPet }> = ({ pet}) => {
    const [petStatus, setPetStatus] = useState("Status");
    const [showModal, setShowModal] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [petId, setPetId] = useState(0);
    const [show, setShow] = useState(false);

    /**
     * Closes the modal.
     */
    const handleClose = () => setShowModal(false);

    /**
     * Shows the modal.
     */
    const handleShow = () => setShowModal(true);

    /**
     * Toggles the dropdown visibility.
     */
    const handleToggle = () => {
        setDropdown(!dropdown);
    };

    /**
     * Opens the update modal for a specific pet.
     *
     * @param {number} petId - The ID of the pet to be updated
     */
    const openUpdateModal = (petId: number) => {
        setPetId(petId);
        setShow(true);

    }

    /**
     * Closes the update modal.
     */
    const handleCloseModal = () => {
        setShow(false);
    };

    return (
        <>
            <PetModal update={true} petId={petId} showProp={show} handleCloseModal={handleCloseModal} />
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
                                    <Dropdown.Item onClick={(e) => setStatus(pet.id, "missing")}>Missing</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => setStatus(pet.id, "found")}>Found</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => setStatus(pet.id, "adopt")}>Adoption</Dropdown.Item>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item onClick={(e) => setStatus(pet.id, "private")}>Private</Dropdown.Item>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item onClick={(e) => openUpdateModal(pet.id)}>Edit</Dropdown.Item>
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
