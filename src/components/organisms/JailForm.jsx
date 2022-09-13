import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const JailForm = ({ jail }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        name: jail?.name ?? "",
        code: jail?.code ?? "",
        type: jail?.type ?? "",
        capacity: jail?.capacity ?? "",
        description: jail?.description ?? "",
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
            console.log(jail)
            if (jail?.id) {
                await axios.post(
                    `http://127.0.0.1:8000/api/v1/jail/${jail.id}/update`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            } else {
                await axios.post(
                    `http://127.0.0.1:8000/api/v1/jail/create`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            }
            navigate('/jails');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-lg shadow-lg md:w-3/4 mx-auto'>
            <h1 className='text-gray-800 font-bold uppercase text-center text-xl mb-4'>
                {jail?.id ? 'Edit' : 'Create'} Jail
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
                        htmlFor='code'
                        className='text-gray-700 uppercase font-bold'>Code</label>
                    <input
                        id='code'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Code'
                        name='code'
                        value={form.code}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor='type'
                        className='text-gray-700 uppercase font-bold'>Type</label>
                    <input
                        id='type'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Type'
                        name='type'
                        value={form.type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor='capacity'
                        className='text-gray-700 uppercase font-bold'>Capacity</label>
                    <input
                        id='capacity'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Capacity'
                        name='capacity'
                        value={form.capacity}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label
                        htmlFor='ward_id'
                        className='text-gray-700 uppercase font-bold'>Ward Id</label>
                    <input
                        id='ward_id'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Ward Id'
                        name='ward_id'
                        value={form.ward_id}
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
                    value={jail?.id ? 'Update' : 'Save'}
                />

            </form>
        </div>
    )
}

