import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const ShowWard = () => {
    const { id } = useParams();
    const [ward, setWard] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getWard = async () => {
            try {
                const response = await axios.get(
                    `http://web-final-backend.herokuapp.com/api/v1/ward/${id}`,
                    //`http://127.0.0.1:8000/api/v1/ward/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const ward = { ...response.data.data.ward, id }
                setWard(ward);
            } catch (error) {
                console.log(error);
            }
        }
        getWard()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Ward</h1>
            <hr className='mt-3' />
            <p className='mt-3'>Ward details</p>
            {
                Object.keys(ward).length > 0 ?
                    (
                        <div className='m-5 flex justify-between'>
                            <div>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Name: </span>
                                    {ward.name}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Location: </span>
                                    {ward.location}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Description: </span>
                                    {ward.description}
                                </p>
                            </div>
                        </div>
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this ward</p>
                    )
            }
        </div>
    )
}


