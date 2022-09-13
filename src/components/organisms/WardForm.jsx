import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const WardForm = ({ ward }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        name: ward?.name ?? "",
        location: ward?.location ?? "",
        description: ward?.description ?? "",
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
            console.log(ward)
            if (ward?.id) {
                await axios.post(
                    `http://127.0.0.1:8000/api/v1/ward/${ward.id}/update`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            } else {
                await axios.post(
                    `http://127.0.0.1:8000/api/v1/ward/create`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            }
            navigate('/wards');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-lg shadow-lg md:w-3/4 mx-auto'>
            <h1 className='text-gray-800 font-bold uppercase text-center text-xl mb-4'>
                {ward?.id ? 'Edit' : 'Create'} Ward
            </h1>

            {
                error && <p className='text-red-700 font-semibold text-xl'>All fields are required</p>
            }

            <form onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor='name'
                        className='text-gray-700 uppercase font-bold'>Name</label>
                    <input
                        id='name'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Name'
                        name='name'
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor='location'
                        className='text-gray-700 uppercase font-bold'>Location</label>
                    <input
                        id='location'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Location'
                        name='location'
                        value={form.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='description'
                        className='text-gray-700 uppercase font-bold'>Description</label>
                    <textarea
                        id='description'
                        type="text"
                        className='border-2  h-48 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Description'
                        name='description'
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                </div>




                <input
                    type="submit" className='bg-sky-800 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-sky-900 cursor-pointer transition-all'
                    value={ward?.id ? 'Update' : 'Save'}
                />

            </form>
        </div>
    )
}


