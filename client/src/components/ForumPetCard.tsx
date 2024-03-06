import React, {useState} from 'react';
import "../style/ImageCard.css"
import {IPet} from "../interfaces/IPet";

// ForumPetCard containing pet information on front and back of the card located on the Forum page
// It takes an IPet interface and uses its attributes to display the pet-information
const ForumPetCard: React.FC<{ pet: IPet }> = ({ pet }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    let post_status = <div className="titleStyle">{""}</div>
    let color = {"background": 'white'};
    if (pet.status == "missing") {
        post_status = <div className="titleStyle missingColor">{"Missing"}</div>;

    } else if (pet.status == "adopt") {
        post_status = <div className="titleStyle adoptionColor">{"Adoption"}</div>;

    } else if (pet.status == "found") {
        post_status = <div className="titleStyle foundColor">{"Found"}</div>;

    }

    const toggleFlipCard = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flip-card" style={{  cursor: 'pointer' }} onClick={toggleFlipCard}>
            <div className={isFlipped ? 'flip-card-inner flip-animation' : 'flip-card-inner'}>
                <div className="flip-card-front">
                    <div className={"cardStyle color"}>
                        {post_status}
                        <img src={pet.image} alt={"['No Image']"} className = {"imageStyle"}  />
                        <div className ={"titleStyle"}>{pet.name}</div>
                    </div>
                </div>
                <div className="flip-card-back">
                <div className={"cardStyle backColor"}>
                        <div className="missing-cat-container">
                            <h2 className="cat-name">{pet.name}</h2>
                            <div className="info">
                                <p className="category">Description:</p>
                                <p>{pet.description}</p>
                            </div>
                            <div className="info">
                                <p className="category">Contact Info:</p>
                                <p>{pet.owner}</p>
                                <p>{pet.ownerEmail}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForumPetCard;
