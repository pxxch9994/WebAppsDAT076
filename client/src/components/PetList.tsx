import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

// TODO This class is for development purpose could be removed in the future
// this class only purpose is to display all pets stored in the database for development purpose

/**
 * React component for displaying a list of pets fetched from the server.
 * This component is intended for development purposes only.
 *
 * @returns {JSX.Element} The JSX representation of the PetList component.
 */

function PetList() {
    const [data, setData] = useState([]);

    /**
     * Fetches pet data from the server.
     */
    const getData = async () => {
        const {data} = await axios.get('http://localhost:8080/pet/');
        setData(data);
    };

    useEffect(() => {
        getData();
    }, []);

    /**
     * Interface representing the structure of a pet.
     *
     * @property {string} name - The name of the pet.
     * @property {number | string} id - The ID of the pet.
     */
    interface Pet {
        name: string;
        id: number | string;
    }

    /**
     * We use React.Fragment here to easily group pet elements
     */
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