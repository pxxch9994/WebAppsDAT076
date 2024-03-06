import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
/**
 * Component for displaying a list of users stored in the database.
 * Note: This component is for development purposes and may be removed in the future.
 */
function UserList() {
    const [data, setData] = useState([]);
    // Function to fetch data from the server
    const getData = async () => {
        const {data} = await axios.get('http://localhost:8080/user/');
        setData(data);
    };
    // Fetch data on component mount
    useEffect(() => {
        getData();
    }, []);
    // Define interface for each item in the user data
    interface Item {
        username: string;
        name: string;
        password: string;
    }
    return <div>
        {data.map((item: Item, index: number) => (
            <React.Fragment key={index}>
                {`Username: ${item.username}, Name: ${item.name}, Password: ${item.password}`}<br/>
            </React.Fragment>
        ))}
    </div>
}
export default UserList;