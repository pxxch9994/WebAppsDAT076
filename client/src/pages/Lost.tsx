import React, {useEffect, useState} from 'react';
import '../style/Pages.css';
import NavBar from "../components/CustomNavbar";
import ImageCard from "../components/ImageCard";
import {Col, Container, Row} from 'react-bootstrap';
import axios from "axios";


const Lost: React.FC = () => {

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
    <h1>Lost & Found Page</h1>
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

export default Lost;
