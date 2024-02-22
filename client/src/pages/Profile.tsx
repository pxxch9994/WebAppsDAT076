import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Pages.css';
import '../style/CardPetList.css'
import NavBar from "../components/NavBar";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {response} from "express";
import PetList from "../components/PetList";
import Logout from "../components/Logout";
import AddPet from "../components/AddPet";


interface User {
    username: string;
    name: string;
}

const Profile: React.FC = () => {
  const profilePic = '../images/profilepic.jpg';

  const username = "Guest";

  const addedPets = [       // TODO: Feth pets.
    { name: 'Fluffy', species: 'Cat' },
    { name: 'Buddy', species: 'Dog' },
  ];
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check with backend if user has a session
                const response = await axios.get('http://localhost:8080/user/session', { withCredentials: true });
                console.log('Congratulations we are logged in', response.data);
                if (response.data && response.data.username && response.data.name) {
                    setUser(response.data);
                } else {
                    setError("User not found");
                    throw new Error('User not found');
                }
            } catch (error) {
                navigate("/login");
            }
        };

        fetchData();
    }, []);

    if (error) {
        // Redirect to Login page
        navigate('/login');
    }

    if (!user) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <NavBar />

            <div className="container mt-5">
                <h1 className="mb-4"> {user.username}</h1>
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-picture">
                            <img src={profilePic} alt="Profile" className="img-fluid rounded-circle" />
                            <h1>Welcome to your profile, {user.name}!</h1>
                        </div>
                        <div className="d-flex justify-content-start align-items-center flex-wrap profile-buttons">
                            <div className="p-md-5 profile-buttons">
                                <AddPet />
                            </div>
                            <div className="p-md-5 profile-buttons">
                                <Logout />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="added-pets">
                            <h2>My Pets</h2>
                            <PetList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );


}

export default Profile;
