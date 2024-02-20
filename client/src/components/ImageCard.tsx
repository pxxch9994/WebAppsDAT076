import React, {useState} from 'react';
import "../style/ImageCard.css"

// Basic styling for the card
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

interface I_ImageCardProps {
    status: string;
    image: string;
    name: string;
    description: string,
    owner: string
}


// ImageCard component
const ImageCard = ({ status, image, name, description, owner }:I_ImageCardProps) => {
    const [isChecked, setIsChecked] = useState(false);

    let post_status = <div style={titleStyle}>{""}</div>
    let color = {"background": 'white'};
    if (status == "missing") {
        post_status = <div style={titleStyle}>{"Missing"}</div>;
        color = missingColor;
    } else if (status == "adopt") {
        post_status = <div style={titleStyle}>{"Adoption"}</div>;
        color = adoptionColor;
    } else if (status == "found") {
        post_status = <div style={titleStyle}>{"Found"}</div>;
        color = foundColor;
    }

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="flip-card" style={{  cursor: 'pointer' }} onClick={toggleCheckbox}>
            <div className={isChecked ? 'flip-card-inner flip-animation' : 'flip-card-inner'}>
                <div className="flip-card-front">
                    <div style={{...cardStyle, ...color}}>
                        {post_status}
                        <img src={image} alt={"['No Image']"} style={ imageStyle }  />
                        <div style={titleStyle}>{name}</div>
                    </div>
                </div>
                <div className="flip-card-back">
                <div style={{...cardStyle, ...backColor}}>
                        <div className="missing-cat-container">
                            <h2 className="cat-name">{name}</h2>
                            <div className="info">
                                <p className="category">Description:</p>
                                <p>{description}</p>
                            </div>
                            <div className="info">
                                <p className="category">Last Seen:</p>
                                <p>TODO 2 days ago</p>
                            </div>
                            <div className="info">
                                <p className="category">Contact Info:</p>
                                <p>{owner}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageCard;
