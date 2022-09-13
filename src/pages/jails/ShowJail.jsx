import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const ShowJail = () => {
    const { id } = useParams();
    const [jail, setJail] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getJail = async () => {
            try {
                const response = await axios.get(
                    `http://web-final-backend.herokuapp.com/api/v1/jail/${id}`,
                    //`http://127.0.0.1:8000/api/v1/jail/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const jail = { ...response.data.data.jail, id }
                setJail(jail);
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
            <p className='mt-3'>Jail details</p>
            {
                Object.keys(jail).length > 0 ?
                    (
                        <div className='m-5 flex justify-between'>
                            <div>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Name: </span>
                                    {jail.name}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Code: </span>
                                    {jail.code}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Type: </span>
                                    {jail.type}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Capacity: </span>
                                    {jail.capacity}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Description: </span>
                                    {jail.description}
                                </p>
                            </div>
                        </div>
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this jail</p>
                    )
            }
        </div>
    )
}


