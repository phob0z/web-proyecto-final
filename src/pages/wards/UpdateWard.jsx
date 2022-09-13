import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { WardForm } from '../../components/organisms/WardForm';

export const UpdateWard = () => {
    const { id } = useParams();
    const [ward, setWard] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getWard = async () => {
            try {
                const response = await axios.get(
                    //`http://127.0.0.1:8000/api/v1/ward/${id}`,
                    `http://web-final-backend.herokuapp.com/api/v1/ward/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const ward = { ...response.data.data.ward, id }
                setWard(ward);
                console.log(ward);
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
            {
                Object.keys(ward).length > 0 ?
                    (
                        <WardForm ward={ward} />
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this ward</p>
                    )
            }
        </div>
    )
}


