import React from "react";
import {Link} from "react-router-dom";

const PostNoImage: React.FC = () => {
    return(
        <>
            <div className="col-md-6 secondcol">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">Forum for crazy pet lovers!</strong>
                <h3 className="mb-0">Featured Post</h3>
                <div className="mb-1 text-muted">Jan 22</div>
                <strong>Question of the day!</strong>
                <p className="card-text mb-auto">What is a good toy for a kitten?</p>
                <Link to="/forum">Forum</Link>
            </div>
            </div>
            </div>
        </>
    );
}
export default PostNoImage;