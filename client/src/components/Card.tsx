import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import "../style/Card.css";
import "../style/Pages.css";

interface CardProps {
    endpoint: string;
    name: string;
    image: string;
    description: string;
    breed: string;
    status: string;
}


const Card: React.FC<CardProps> = ({ endpoint, name, image, description, breed, status }) => { // Constant endpoint?
    const [petData, setPetData] = useState<any>({
        name,
        image,
        breed,
        status,
        description,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(endpoint);
                setPetData(response.data);
            } catch (error) {
                console.error("Error fetching pet data:", error);
            }
        };

        fetchData();
    }, [endpoint]); // Run when endpoint prop changes

    return (
        <div className="card-container">

            <label id="summary">

                <article className="card-frame">
                    <header>
                        <h3>{petData.name}</h3>
                    </header>
                    <div >
                        <img src={petData.image} alt={petData.name} />
                    </div>
                    <h4>Status: {petData.status}</h4>
                    <h4>Breed: {petData.breed}</h4>
                    <p>Description: {petData.description}</p>
                </article>
            </label>

        </div>
    );
};

export default Card;