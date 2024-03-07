import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import "../style/ProfilePetList.css"
import ProfilePetCard from "./ProfilePetCard";
import {IPet} from "../interfaces/IPet"

/**
 * ProfilePetList component to display a list of pets on the user's profile.
 * Fetches pet data from the server and renders ProfilePetCard components for each pet.
 *
 * @returns {JSX.Element} - The rendered ProfilePetList component.
 */
function ProfilePetList() {

    const [data, setData] = useState([]);

    /**
     * Fetches pet data from the server.
     */
    const getData = async () => {
        const {data} = await axios.get('http://localhost:8080/pet/profile/', { withCredentials: true});
        console.log(data);
        setData(data);
    };

    useEffect(() => {
        getData().then(r => console.log(data)).catch(r => console.log("failed"));
    }, []);

    return <div>
        {data.map((pet: IPet, index: number) => (
            <ProfilePetCard pet={pet} />
        ))}
    </div>

}

export default ProfilePetList;