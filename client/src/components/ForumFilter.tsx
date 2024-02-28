
import React, {useEffect, useState} from 'react';
import '../style/Forum.css';
import ForumPetCard from "../components/ForumPetCard";
import {Col, Container, Dropdown, DropdownButton, Row} from 'react-bootstrap';
import axios, {all} from "axios";
import {IPet} from "../interfaces/IPet";

export function CustomDropdown()   {
    const [data, setData] = useState<IPet[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [filteredData, setFilteredData] = useState<IPet[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const {data} = await axios.get('http://localhost:8080/pet/');
        setData(data);
    };


    const toggleDropdown = () => setIsOpen(!isOpen);


    const filter  = async(filterD: 'missing' | 'adopt' | 'found' | 'all' )  => {
        if (filterD === "all") {
            setFilteredData(data);

        } else {
            setFilteredData(data.filter(pet => pet.status === filterD));
        }
    }


    return (
        <>
            <div className="dropdown2">
                <button className="dropdown-2toggle" onClick={toggleDropdown}>
                    Filter Options
                </button>
                {isOpen && (
                    <div className="dropdown-2menu">
                        <button onClick={() => filter('missing')} className="dropdown-2item">Filter Missing</button>
                        <button onClick={() => filter('adopt')} className="dropdown-2item">Filter Adoption</button>
                        <button onClick={() => filter('found')} className="dropdown-2item">Filter Found</button>
                        <button onClick={() => filter('all')} className="dropdown-2item">Filter All</button>
                    </div>
                )}
            </div>
            <Container>
                <Row className="justify-content-center">
                    {filteredData.map((pet: IPet, index: number) => (
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
