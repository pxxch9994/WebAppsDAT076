import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";


//TODO fix image text input
const LostAndFound: React.FC = () => {
    return (
        <div className="container mx-auto p-md-5 text-white bg-dark rounded">
            <div className="row">
                <div className="col-md-8">
                    <h1 className="display-4 fst-italic">Latest Lost & Found!</h1>
                    <p className="lead my-3">Bob the Berner Sennen was lost at 2 PM in Gothenburg, Lindholmen.</p>
                    <p className="lead mb-0">
                        <Link to="/lost">View more information...</Link>
                    </p>
                </div>
                <div className="col-md-4 col-auto d-none d-lg-block">
                    <img src="../images/berner-sennen.png" alt="" className="img-fluid square-image-main-header"/>
                </div>
            </div>
        </div>
    );
}

export default LostAndFound;