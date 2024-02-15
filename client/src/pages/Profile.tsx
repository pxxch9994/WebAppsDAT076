import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Pages.css';
import NavBar from "../components/NavBar";
import {useNavigate} from "react-router-dom";

interface User {
    username: string;
    name: string;
}

const Profile: React.FC = () => {
  const profilePic = '../images/profilepic.jpg';

  const username = "Guest"; // TODO: Fetch username.

  const addedPets = [       // TODO: Feth pets.
    { name: 'Fluffy', species: 'Cat' },
    { name: 'Buddy', species: 'Dog' },
  ];
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        // Include credentials in the fetch request to ensure cookies are sent
        fetch('http://localhost:8080/user/profile', { // Ensure the URL matches your server's configuration
            credentials: 'include' // This is crucial for sessions to work across different origins
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to fetch user profile.');
            })
            .then((data: User) => setUser(data))
            .catch((error: Error) => setError(error.message || 'Please login to view this page!'));
    }, []);

    if (error) {
        // Redirect to /login
        navigate('/login');
    }

    if (!user) {
        return <div>Loading...</div>;
    }

  return (
      <><NavBar/>
          <div className="container mt-5">
              <h1 className="mb-4"> {username} </h1>
              <div className="row">


                  <div className="col-md-4">
                      <div className="profile-picture">
                          <img src={profilePic} alt="Profile" className="img-fluid rounded-circle"/>
                          <h1>Welcome to your profile, {user.name}!</h1>
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
