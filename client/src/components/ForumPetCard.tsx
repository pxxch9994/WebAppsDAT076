import React, {useState} from 'react';
import "../style/ImageCard.css"
import {IPet} from "../interfaces/IPet";

// Basic styling for the card
// TODO this whole section below maybe should be merged into css files
const cardStyle = {
    "width": '190px',
    "height": '200px',
    "background": 'white',
    "border-radius": '10px',
    "transition": 'border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    "box-shadow": ' inset 0 -3em 3em rgba(0,0,0,0.1), 0 0  0 2px rgb(190, 190, 190), 0.3em 0.3em 1em rgba(0,0,0,0.3)',
    "margin": '20px',
};

const missingColor = {
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(117,117,189,1) 0%, rgba(208,157,157,0.9359944661458334) 0%)',
}

const adoptionColor = {
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(117,117,189,1) 0%, rgba(121,221,214,0.9359944661458334) 0%)'
}

const foundColor = {
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(117,117,189,1) 0%, rgba(121,221,126,0.9359944661458334) 0%)'
}

const backColor = {
    background: 'white'
}

const imageStyle = {
    maxWidth: '100%',
    maxHeight: '60%',
    borderRadius: '5px',
};

const titleStyle = {
    color: '#333',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
};


// ForumPetCard containing pet information on front and back of the card located on the Forum page
// It takes an IPet interface and uses its attributes to display the pet-information
// TODO Pet cards with status "missing", "adopt" and "found" should be the only cards displayed on the Forum page
const ForumPetCard: React.FC<{ pet: IPet }> = ({ pet }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    let post_status = <div style={titleStyle}>{""}</div>
    let color = {"background": 'white'};
    if (pet.status == "missing") {
        post_status = <div style={titleStyle}>{"Missing"}</div>;
        color = missingColor;
    } else if (pet.status == "adopt") {
        post_status = <div style={titleStyle}>{"Adoption"}</div>;
        color = adoptionColor;
    } else if (pet.status == "found") {
        post_status = <div style={titleStyle}>{"Found"}</div>;
        color = foundColor;
    }

    const toggleFlipCard = () => {
        setIsFlipped(!isFlipped);
    };

    // TODO create a system for when a pet was last seen or maybe remove that section
    return (
        <div className="flip-card" style={{  cursor: 'pointer' }} onClick={toggleFlipCard}>
            <div className={isFlipped ? 'flip-card-inner flip-animation' : 'flip-card-inner'}>
                <div className="flip-card-front">
                    <div style={{...cardStyle, ...color}}>
                        {post_status}
                        <img src={pet.image} alt={"['No Image']"} style={ imageStyle }  />
                        <div style={titleStyle}>{pet.name}</div>
                    </div>
                </div>
                <div className="flip-card-back">
                <div style={{...cardStyle, ...backColor}}>
                        <div className="missing-cat-container">
                            <h2 className="cat-name">{pet.name}</h2>
                            <div className="info">
                                <p className="category">Description:</p>
                                <p>{pet.description}</p>
                            </div>
                            <div className="info">
                                <p className="category">Last Seen:</p>
                                <p>2 days ago</p>
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
