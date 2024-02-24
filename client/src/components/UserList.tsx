import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';


// TODO This class is for development purpose could be removed in the future
// this class only purpose is to display all users stored in the database for development purpose
function UserList() {
    const [data, setData] = useState([]);

    const getData = async () => {
        const {data} = await axios.get('http://localhost:8080/user/');
        setData(data);
    };


    useEffect(() => {
        getData();
    }, []);

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