import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import "../style/ProfilePetList.css"
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function ProfilePetList() {
    const [data, setData] = useState([]);

    const getData = async () => {
        const {data} = await axios.get('http://localhost:8080/pet/profile', { withCredentials: true});
        setData(data);
    };


    useEffect(() => {
        getData();
    }, []);

    interface Item {
        name: string;
        id: number | string; // Use `number` or `string` depending on your data's ID type
    }



    return <div>
        {data.map((item: Item, index: number) => (
            <div className="item" key={index}>
                <span className="item-name">{item.name}</span>
                <span className="item-id">{item.id}</span>
            </div>
        ))}
        <ListGroup as="ol" numbered>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Bolivar</div>
                    A cute little dog
                </div>
                <Dropdown data-bs-theme="dark">
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                        Status
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" active>
                            Missing
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Adoption</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Found</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-4">Private</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-4">Edit</Dropdown.Item>
                        <Dropdown.Item href="#/action-4">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ListGroup.Item>
        </ListGroup>
    </div>

}

export default ProfilePetList;