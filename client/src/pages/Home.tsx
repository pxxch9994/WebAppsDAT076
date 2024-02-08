import React from 'react';
import './Pages.css';

const Home: React.FC = () => {
  return (
    <>
{/* Main header */}
<br />
      <div className="container mx-auto p-md-5 text-white bg-dark rounded">
        <div className="row">
          {/* Col 1: text */}
          <div className="col-md-8">
            <h1 className="display-4 fst-italic">Latest Lost & Found!</h1>
            <p className="lead my-3">Bob the Berner Sennen was lost at 2 PM in Gothenburg, Lindholmen.</p>
            <p className="lead mb-0"><a href="lost.html" className="text-white fw-bold">View more information...</a></p>
          </div>
          {/* Col 2: Image */}
          <div className="col-md-4 col-auto d-none d-lg-block">
            <img src="/berner-sennen.png" alt="" className="img-fluid square-image-main-header" />
          </div>
        </div>
      </div>
      <br />
      {/* Featured posts */}
      <div className="container mx-auto">
        <div className="row mb-2">
          {/* Col 1 */}
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
                <img src="/persian-cat.png" alt="" className="square-image" />
              </div>
            </div>
          </div>
          {/* Col 2 */}
          <div className="col-md-6 secondcol">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">Forum for crazy pet lovers!</strong>
                <h3 className="mb-0">Featured Post</h3>
                <div className="mb-1 text-muted">Jan 22</div>
                <strong>Question of the day!</strong>
                <p className="card-text mb-auto">What is a good toy for a kitten?</p>
                <a href="forum.html" className="stretched-link">View discussion thread...</a>
              </div>
            </div>
          </div>
          {/* Third Column */}
          <div className="col-md-3">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-25 shadow-sm h-md-150 position-relative">
              <div className="col p-3 d-flex flex-column position-static">
                <h3 className="mb-2">Meet Lily!</h3>
                <div className="mb-3 text-muted">Jan 26</div>
                <strong className="mb-2">Lily</strong>
                <div className="square-image2">
                  <img src="/Lily.jpeg" alt="" className="square-image2" />
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
                  <img src="/simon.jpeg" alt="" className="square-image2" />
                </div>
                <div className="mb-2 text-muted">Age: 14 yo</div>
                <div className="mb-2 text-muted">Breed: Persian</div>
                <p className="card-text mb-25">Simon is Lily's friend and they live in the same place!</p>
                <a href="forum.html" className="stretched-link">View discussion thread...</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
