import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';


// TODO This class is for development purpose could be removed in the future
// this class only purpose is to display all pets stored in the database for development purpose
function PetList() {
    const [data, setData] = useState([]);

    const getData = async () => {
        const {data} = await axios.get('http://localhost:8080/pet/');
        setData(data);
    };


    useEffect(() => {
        getData();
    }, []);

    interface Pet {
        name: string;
        id: number | string;
    }


    // We use React.Fragment here to easily group pet elements
    return (
        <div>
            {data.map((pet: Pet, index: number) => (
                <React.Fragment key={index}>
                    {`Name: ${pet.name}, ID: ${pet.id}`}<br/>
                </React.Fragment>
            ))}
        </div>
    )}

export default PetList;