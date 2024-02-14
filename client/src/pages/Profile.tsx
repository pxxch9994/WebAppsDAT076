import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Pages.css';
import NavBar from "../components/NavBar";

const Profile: React.FC = () => {
  const profilePic = '/images/profilepic.jpg';

  const username = "Guest"; // TODO: Fetch username.

  const addedPets = [       // TODO: Feth pets.
    { name: 'Fluffy', species: 'Cat' },
    { name: 'Buddy', species: 'Dog' },
  ];

  return (
      <><NavBar/>
          <div className="container mt-5">
              <h1 className="mb-4"> {username} </h1>
              <div className="row">


                  <div className="col-md-4">
                      <div className="profile-picture">
                          <img src={profilePic} alt="Profile" className="img-fluid rounded-circle"/>
                      </div>
                  </div>


                  <div className="col-md-8">
                      <div className="added-pets">

                          <h2>My Pets</h2>

                          {addedPets.map((pet, index) => (
                              <div key={index} className="card mb-3">
                                  <div className="card-body">
                                      <p className="card-text">Name: {pet.name}</p>
                                      <p className="card-text">Species: {pet.species}</p>
                                  </div>
                              </div>
                          ))}

                      </div>
                  </div>

              </div>
          </div>
      </>

  );


}

export default Profile;
