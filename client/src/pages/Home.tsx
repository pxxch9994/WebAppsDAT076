import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Pages.css';
import NavBar from "../components/CustomNavbar";;

// TODO: Our lovely homepage has experienced some unexpected modifications during the development process. We might consider to review and potentially upgrade it

const Home: React.FC = () => {
  return (
    <>
      <NavBar />

{/* Main header */}

      {/* Featured posts */}
  <div className="container mx-auto">
  <div className="row mb-2">

    {/* Row 1, Col 1 */}

    <div className="col-md-6 firstcol">
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

      <div className="col p-4 d-flex flex-column position-static">
        <strong className="d-inline-block mb-2 text-primary">Adopt a pet today!</strong>
        <h3 className="mb-0">Featured Post</h3>
        <div className="mb-1 text-muted">Age: 2 yo</div>
        <div className="mb-1 text-muted">Breed: Persian</div>
        <div className="mb-1 text-muted">Pick Up: Gothenburg</div>
        <p className="card-text mb-auto">Blixten längtar efter att hitta en ny familj! </p>
        <a href="adopt.html" className="stretched-link">Continue Reading...</a>
      </div>

      <div className="col-auto d-none d-xl-block">
        <img src="../images/persian-cat.png" alt="" className="square-image" />
      </div>

    </div>
    </div>

    {/* Row 1, Col 2 */}

    {/* Row 2, Col 1 */}

    <div className="col-md-3">
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-25 shadow-sm h-md-150 position-relative">
        
        <div className="col p-3 d-flex flex-column position-static">
          <h3 className="mb-2">Meet Lily!</h3>
          <div className="mb-3 text-muted">Jan 26</div>
          <strong className="mb-2">Lily</strong>
          <div className="square-image2">
            <img src="../images/Lily.jpeg" alt="" className="square-image2" />
          </div>
          <div className="mb-2 text-muted">Age: 3 yo</div>
          <div className="mb-2 text-muted">Breed: Persian</div>
          <p className="card-text mb-25">Lily is a sweet cat!</p>
          <a href="forum.html" className="stretched-link">View discussion thread...</a>
        </div>

    </div>
    </div>

    <div className="col-md-3">
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-25 shadow-sm h-md-150 position-relative">

        <div className="col p-3 d-flex flex-column position-static">
          <h3 className="mb-2">Meet Simon!</h3>
          <div className="mb-3 text-muted">Jan 26</div>
          <strong className="mb-2">Simon</strong>
          <div className="square-image2">
            <img src="../images/simon.jpeg" alt="" className="square-image2" />
          </div>
          <div className="mb-2 text-muted">Age: 14 yo</div>
          <div className="mb-2 text-muted">Breed: Persian</div>
          <p className="card-text mb-25">Simon is Lily's friend and they live in the same place!</p>
          <a href="forum.html" className="stretched-link">View discussion thread...</a>
        </div>
        
    </div>
    </div>

    {/* End of Row 2, Col 1 */}

  </div>
  </div>
      </>
  );
}

export default Home;
