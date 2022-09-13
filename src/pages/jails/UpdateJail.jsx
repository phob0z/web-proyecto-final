import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { JailForm } from '../../components/organisms/JailForm';

export const UpdateJail = () => {
    const { id } = useParams();
    const [jail, setJail] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getJail = async () => {
            try {
                const response = await axios.get(
                    `https://web-final-backend.herokuapp.com/api/v1/jail/${id}`,
                    //`https://127.0.0.1:8000/api/v1/jail/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const jail = { ...response.data.data.jail, id }
                setJail(jail);
                console.log(jail);
            } catch (error) {
                console.log(error);
            }
        }
        getJail()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Jail</h1>
            <hr className='mt-3' />
            {
                Object.keys(jail).length > 0 ?
                    (
                        <JailForm jail={jail} />
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this jail</p>
                    )
            }
        </div>
    )
}


