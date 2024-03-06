import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Pages.css';
import NavBar from "../components/CustomNavbar";
import Lily from "../images/Lily.jpeg";
import Simon from "../images/simon.jpeg"
import Persian from "../images/persian-cat.png"
import berner from "../images/berner-sennen.png"
import koa from "../images/Koa.jpg"
const Home: React.FC = () => {
  return (
      <>
        <NavBar/>
        <br/>
        <div className="animate-header container mx-auto p-md-5 text-white bg-dark rounded">
          <div className="row">
            <div className="col-md-8">
              <h1 className="display-4 fst-italic">Lost Pet!</h1>
              <p className="lead my-3">Bob the Berner Sennen was lost at 2 PM in Gothenburg, Lindholmen.</p>
              <a href="forum" className="stretched-link">More information</a>
              <p className="lead mb-0"></p>
            </div>
            <div className="col-md-4 col-auto d-none d-lg-block">
            <img src= {berner} alt="" className="img-fluid square-image-main-header"/>
            </div>
          </div>
        </div>

        <br/>

        <div className="container mx-auto">
          <div className="row mb-2">

            <div className="col-md-6 firstcol">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary">Adopt a pet today!</strong>
                  <h3 className="mb-0">Adoption</h3>
                  <div className="mb-1 text-muted">Age: 2 yo</div>
                  <div className="mb-1 text-muted">Breed: Persian</div>
                  <div className="mb-1 text-muted">Pick Up: Stockholm</div>
                  <p className="card-text mb-auto">Blixten is waiting to find a new family! </p>
                </div>

                <div className="col-auto d-none d-xl-block align-self-center">
                  <img src={Persian} alt="" className="img-fluid square-image" style={{height: "250px"}}/>
                </div>

              </div>
            </div>

            <div className="col-md-6 secondcol">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary">Founded pet today!</strong>
                  <h3 className="mb-0">Found</h3>
                  <div className="mb-1 text-muted">Age: 4 yo</div>
                  <div className="mb-1 text-muted">Breed: Golden</div>
                  <div className="mb-1 text-muted">Pick Up: Gothenburg</div>
                  <p className="card-text mb-auto">Koa is back to his family </p>
                </div>

                <div className="col-auto d-none d-xl-block align-self-center">
                  <img src={koa} alt="" className="img-fluid square-image" style={{height: "250px"}}/>
                </div>

              </div>
            </div>

            <div className="col-md-6 secondcol">
              <div
                  className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary">Adopt a pet today!</strong>
                  <h3 className="mb-0">Adoption</h3>
                  <div className="mb-1 text-muted">Age: 4 yo</div>
                  <div className="mb-1 text-muted">Breed: Persian</div>
                  <div className="mb-1 text-muted">Pick Up: Gothenburg</div>
                  <p className="card-text mb-auto">Lily is looking for a new home </p>
                </div>

                <div className="col-auto d-none d-xl-block align-self-center">
                  <img src={Lily} alt="" className="img-fluid square-image" style={{height: "250px"}}/>
                </div>

              </div>
            </div>

            <div className="col-md-6 secondcol">
              <div
                  className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary">Founded pet today!</strong>
                  <h3 className="mb-0">Found</h3>
                  <div className="mb-1 text-muted">Age: 13 yo</div>
                  <div className="mb-1 text-muted">Breed: Persian</div>
                  <div className="mb-1 text-muted">City: Gothenburg</div>
                  <p className="card-text mb-auto">Simon is back to his family </p>
                </div>

                <div className="col-auto d-none d-xl-block align-self-center">
                  <img src={Simon} alt="" className="img-fluid square-image" style={{height: "250px"}}/>
                </div>

              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default Home;
