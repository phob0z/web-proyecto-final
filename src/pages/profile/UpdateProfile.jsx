import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserProfileForm } from '../../components/organisms/UserProfileForm';

export const UpdateProfile = () => {
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(
                    `http://web-final-backend.herokuapp.com/api/v1/profile`,
                   // `http://127.0.0.1:8000/api/v1/profile`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const user = { ...response.data.data.user, id }
                setUserProfile(user);
                console.log(user);
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>My profile</h1>
            <hr className='mt-3' />
            {
                Object.keys(userProfile).length > 0 ?
                    (
                        <UserProfileForm userProfile={userProfile} />
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this user</p>
                    )
            }
        </div>
    )
}
