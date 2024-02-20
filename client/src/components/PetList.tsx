import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

function PetList() {
    const [data, setData] = useState([]);

    const getData = async () => {
        const {data} = await axios.get('http://localhost:8080/pet/');
        setData(data);
    };


    useEffect(() => {
        getData();
    }, []);

    interface Item {
        name: string;
        id: number | string; // Use `number` or `string` depending on your data's ID type
    }



    return <div>
        {data.map((item: Item, index: number) => (
            <React.Fragment key={index}>
                {`Name: ${item.name}, ID: ${item.id}`}<br/>
            </React.Fragment>
        ))}
    </div>

}

export default PetList;