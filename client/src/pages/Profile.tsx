import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Pages.css';
import NavBar from "../components/CustomNavbar";
import {useNavigate} from "react-router-dom";
import { I_SessionData} from "../interfaces/I_SessionData";
import ProfilePetList from "../components/ProfilePetList";
import axios from "axios";


const Profile: React.FC = () => {

    const [user, setUser] = useState<I_SessionData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const data = await axios.get('http://localhost:8080/user/session', {withCredentials: true});
                const userData: I_SessionData = data.data;
                setUser(userData);
            } catch (error) {
                setError('Failed to fetch user session');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSessionData();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) navigate('/login');


    return (
      <>
          <NavBar/>
          <div className="container mt-5">
              <div className="row">
                  <h1>
                      Welcome, {user?.name}!
                  </h1>

                  <div className="col-md-8">
                      <div className="added-pets">
                          <h2>Pet List:</h2>
                          <ProfilePetList />
                      </div>
                  </div>

              </div>
          </div>
      </>

  );

}

export default Profile;
