import React from 'react';
import axios from 'axios';
import CardPetList from './CardPetList'; // Import your custom Card component
import 'bootstrap/dist/css/bootstrap.min.css';

function PetList() {
    const [data, setData] = React.useState([]);

    const getData = async () => {
        const { data } = await axios.get('http://localhost:8080/pet/');
        setData(data);
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/session', { withCredentials: true });
                console.log('Congratulations we are logged in', response.data);
                if (response.data && response.data.username && response.data.name) {
                    getData();
                } else {
                    throw new Error('User not found');
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="row">
            {data.map((item, index) => (
                <div className="col-md-4" key={index}>
                    <CardPetList item={item} /> {/* Pass each item as props to a custom Card component */}
                </div>
            ))}
        </div>
    );
}

export default PetList;