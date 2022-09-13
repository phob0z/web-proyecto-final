import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UserProfileForm = ({ userProfile }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        first_name: userProfile?.first_name ?? "",
        last_name: userProfile?.last_name ?? "",
        username: userProfile?.username ?? "",
        email: userProfile?.email ?? "",
        personal_phone: userProfile?.personal_phone ?? "",
        home_phone: userProfile?.home_phone ?? "",
        address: userProfile?.address ?? ""
    });
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(form).includes("")) {
            console.log("error");
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2500);
            return;
        }

        try {
            console.log(userProfile)
            await axios.post(
                `http://127.0.0.1:8000/api/v1/profile`,
                { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            alert("¡USUARIO ACTUALIZADO CORRECTAMENTE!");
            navigate("/");

        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-lg shadow-lg md:w-3/4 mx-auto'>
            <h1 className='text-gray-800 font-bold uppercase text-center text-xl mb-4'>
                Update my profile
            </h1>

            {
                error && <p className='text-red-700 font-semibold text-xl'>All fields are required</p>
            }

            <form onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor='first_name'
                        className='text-gray-700 uppercase font-bold'>First Name</label>
                    <input
                        id='first_name'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='First Name'
                        name='first_name'
                        value={form.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='last_name'
                        className='text-gray-700 uppercase font-bold'>Last Name</label>
                    <input
                        id='last_name'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Last Name'
                        name='last_name'
                        value={form.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='username'
                        className='text-gray-700 uppercase font-bold'>Username</label>
                    <input
                        id='username'
                        type="username"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Username'
                        name='username'
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='email'
                        className='text-gray-700 uppercase font-bold'>Email</label>
                    <input
                        id='email'
                        type="email"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        name='email'
                        placeholder='Email'
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor='personal_phone'
                        className='text-gray-700 uppercase font-bold'>Phone Number</label>
                    <input
                        id='personal_phone'
                        type="tel"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        name='personal_phone'
                        placeholder='Phone Number'
                        value={form.personal_phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor='home_phone'
                        className='text-gray-700 uppercase font-bold'>Home Number</label>
                    <input
                        id='home_phone'
                        type="tel"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        name='home_phone'
                        placeholder='Home Number'
                        value={form.home_phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='address'
                        className='text-gray-700 uppercase font-bold'>Address</label>
                    <textarea
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Address'
                        name='address'
                        value={form.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <input
                    type="submit" className='bg-sky-800 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-sky-900 cursor-pointer transition-all'
                    value={userProfile?.id ? 'Update' : 'Save'}
                />

            </form>
        </div>
    )
}
