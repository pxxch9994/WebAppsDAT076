import React, {useEffect, useState} from 'react';
import '../style/Pages.css';
import NavBar from "../components/CustomNavbar";
import ImageCard from "../components/ImageCard";
import {Col, Container, Row} from 'react-bootstrap';
import axios from "axios";
import AddPet from "../components/AddPet";

const Forum: React.FC = () => {
    const [data, setData] = useState([]);

    const getData = async () => {
        const {data} = await axios.get('http://localhost:8080/pet/');
        setData(data);
    };


    useEffect(() => {
        getData();
    }, []);

    interface Item {
        id : number;
        owner : string;
        name : string;
        image : string;
        kind : string;
        breed : string;
        birthday : number;
        status: string;
        description: string;
    }

    return (
        <>
            <NavBar />
            <AddPet />
            <Container>
                <Row className="justify-content-center">
                    {data.map((item: Item, index: number) => (
                        <Col lg={2} md={4} sm={12} className="mb-4" key={index}>
                            <ImageCard status={item.status} name={item.name} image={item.image} description={item.description} owner={item.owner}/>
                        </Col>
                    ))}

                </Row>
            </Container>
        </>
    );
}

export default Forum;