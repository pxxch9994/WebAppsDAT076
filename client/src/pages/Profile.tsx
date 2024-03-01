import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/Pages.css";
import NavBar from "../components/CustomNavbar";
import { useNavigate } from "react-router-dom";
import { ISessionData } from "../interfaces/ISessionData";
import ProfilePetList from "../components/ProfilePetList";
import axios from "axios";
import ProfilePetCard from "../components/ProfilePetCard";
import UserSettings from "../components/UserSettings";
import PetModal from "../components/PetModal";

const Profile: React.FC = () => {
  const [user, setUser] = useState<ISessionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const data = await axios.get("http://localhost:8080/user/session", {
          withCredentials: true,
        });
        const userData: ISessionData = data.data;
        setUser(userData);
      } catch (error) {
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) navigate("/login");

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 text-center mb-4">
            <h1>Welcome, {user?.name}!</h1>
          </div>
  
          <div className="col-md-8">
            <div className="added-pets">
              <h2>Pet List:</h2>
              <ProfilePetList />
            </div>
          </div>
  
          <div className="col-md-4">
            <div className="text-right mb-4">
              <UserSettings />
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
  
}
export default Profile;
