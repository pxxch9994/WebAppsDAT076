import React, {useState} from 'react';
import Lily from '../images/Lily.jpeg'; // Import your image
import "../style/CardPetList.css";
interface Props {
    item: {
        id: number | string;
        owner: string;
        name: string;
        image: string;
        kind: string;
        breed: string;
        birthday: number;
        status: string;
        description: string;
    }
}

const Card: React.FC<Props> = ({ item }) => {
    const [isPrivate, setIsPrivate] = useState(false);

    const handleCheckboxChange = () => {
        setIsPrivate(!isPrivate);
    };
    return (
        <div className="card-wrapper" >
        <div className="cards">
            <label id="summary">
                <span className="checkbox-name">{isPrivate ? "Private " : "Public "}</span>
                <input type="checkbox" checked={isPrivate} onChange={handleCheckboxChange}/>
                <article>
                    <div className="front">
                        <header>
                            <h2>{item.name}</h2>
                            <span className="material-symbols-outlined"> </span>
                        </header>
                        <div className="col pe-auto d-flex flex-column position-static">
                            <img src={Lily} alt={item.name}
                                 style={{maxWidth: '100%', height: 'auto'}}/> {/* Adjust image size here */}
                        </div>
                        <h4>ID: {item.id}</h4>
                    </div>
                    <div className="back">
                        <header>

                            <span className="material-symbols-outlined"></span>
                        </header>

                        {/*<p>Owner: { item.owner}</p>*/}
                        <p>Kind: {item.kind}</p>
                        <p>Breed: {item.breed}</p>
                        <p>Birthday: {item.birthday}</p>
                        <p>Description: {item.description}</p>
                        {/* Add more information here as needed */}
                    </div>
                </article>
            </label>
        </div>
        </div>
    );
}

export default Card;
