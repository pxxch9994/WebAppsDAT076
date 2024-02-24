import React, {useEffect, useState} from 'react';
import '../style/Pages.css';
import NavBar from "../components/CustomNavbar";
import ForumPetCard from "../components/ForumPetCard";
import {Col, Container, Row} from 'react-bootstrap';
import axios from "axios";
import AddPet from "../components/AddPet";
import {IPet} from "../interfaces/IPet";

const Forum: React.FC = () => {
    const [data, setData] = useState([]);

    const getData = async () => {
        const {data} = await axios.get('http://localhost:8080/pet/');
        setData(data);
    };


    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <NavBar />
            <AddPet />
            <Container>
                <Row className="justify-content-center">
                    {data.map((pet: IPet, index: number) => (
                        // 6 cards large screen, 3 cards medium screen and 1 card small screen
                        <Col lg={2} md={4} sm={12} className="mb-4" key={index}>
                            <ForumPetCard pet={pet}/>
                        </Col>
                    ))}

                </Row>
            </Container>
        </>
    );
}

export default Forum;