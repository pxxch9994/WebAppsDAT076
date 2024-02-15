import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import "../style/Card.css";
import "../style/Pages.css"
import Lily from "../images/Lily.jpeg"

//TODO fix image text input

const Card: React.FC = () => {
    return (
        <>
            <head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Card 4</title>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap"
                    rel="stylesheet"
                />
            </head>
            <div className="cards">

                <label id="summary">
                    <input type="checkbox"/>
                    <article>
                        <div className="front">
                            <header>
                                <h2>Summary</h2>
                                <span className="material-symbols-outlined"> more_vert </span>
                            </header>
                            <div className="col pe-auto d-flex flex-column position-static">

                                <img src={Lily} alt={"hello"}/>

                            </div>
                            <h4>Completed: 13</h4>
                        </div>
                        <div className="back">
                        <header>
                                <h2>Summary</h2>
                                <span className="material-symbols-outlined"> close </span>
                            </header>
                            <p>Lily</p>
                        </div>

                    </article>
                </label>
            </div>
        </>
    );
}

export default Card;