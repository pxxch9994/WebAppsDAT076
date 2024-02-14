import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function AddPet() {
    const [show, setShow] = useState(false);
    const [owner, setOwner] = useState("");
    const [name, setName] = useState("");
    const [kind, setKind] = useState("");
    const [breed, setBreed] = useState("");
    const [birthday, setBirthday] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const add = async () => {
        const res  = await axios.post(`http://localhost:8080/pet/`, {owner, name, kind, breed, birthday});
    };

    return (
        <>
            <div className="center-container">
            <div className="center-content">
            <Button variant="primary" onClick={handleShow}>
                Add Pet
            </Button>
            </div>
                </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a pet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Owner</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="username"
                                onChange={(e) => setOwner(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Pet name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Pet name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Kind</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cat, Dog, Bird etc"
                                onChange={(e) => setKind(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Breed</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Breed"
                                onChange={(e) => setBreed(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="080101"
                                onChange={(e) => setBirthday(parseInt(e.target.value))}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={add}>
                        Add Pet
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddPet;