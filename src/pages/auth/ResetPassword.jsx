import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Label, Button } from '../../components'
import { AuthContext } from '../../components/contexts/auth/AuthContext';

export const ResetPassword = () => 
{
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('')

    const onRecover = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://web-final-backend.herokuapp.com/api/v1/forgot-password',
                //'https://localhost:8000/api/v1/forgot-password',
                { email },
                { headers: { 'accept': 'application/json' } }
            )
            console.log(response.data.message);
            alert("Cuenta encontrada!");  
            navigate('/set-new-password');       
        } catch (error) {
            console.log(error.response.data.message, 'error');
            alert("Su cuenta no fue encontrada!");
        }
    }

    return (
        <>
            <h2 className='text-2xl md:text-3xl font-bold'>Recuperar la cuenta</h2>
            <p className='text-sm text-gray-500 pb-6'>Introduzca el correo de su cuenta</p>
            <form className='space-y-7 text-left' onSubmit={onRecover}>
                <div>
                    <Label description="Correo electrónico" htmlFor='email' />
                    <input
                        className='rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:border-cyan-500 disabled:opacity-50 block mt-2 w-full'
                        id='email'
                        name='email'
                        type='email'
                        value={email}
                        placeholder='Introduzca su correo'
                        maxLength="35"
                        required
                        autoFocus
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='pt-4 flex justify-center'>
                    <Button name='Enviar' styles='w-3/5' />
                </div>
            </form>

        </>
    );
}
