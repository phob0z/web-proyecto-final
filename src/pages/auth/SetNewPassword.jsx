import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Label, Button } from '../../components'

export const SetNewPassword = () => 
{

    const navigate = useNavigate();

    const [token, setToken] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')

    const onResetpassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `https://web-final-backend.herokuapp.com/api/v1/reset-password`,
                //'https://localhost:8000/api/v1/reset-password/',
                { token, email, password, password_confirmation },
                { headers: { 'accept': 'application/json' } }
            )
            console.log(response.data.message);
            alert("La constraseña ha sido cambiada correctamente")
            navigate('/');  
                 
        } catch (error) {
            console.log(error, 'error');
            alert("No se ha podido cambiar la contraseña")
        }
    }

    return (
        <>
        <div data-toggle="modal" data-target="#exampleModalCenter">
            <h2 className='text-2xl md:text-3xl font-bold'>Cmabiar contraseña</h2>
            <p className='text-sm text-gray-500 pb-6'>Introduzca las credenciales para resetear su contraseña</p>
            <form className='space-y-7 text-left' onSubmit={onResetpassword}>
                <div>
                    <Label description="Token de acceso" htmlFor='token' />
                    <input
                        className='rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:border-cyan-500 disabled:opacity-50 block mt-2 w-full'
                        id='token'
                        name='access token'
                        type='string'
                        value={token}
                        placeholder='Introduzca el token de acceso'
                        maxLength="50"
                        required
                        autoFocus
                        onChange={e => setToken(e.target.value)}
                    />
                </div>
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
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <Label description="Nueva contraseña" htmlFor='password' />
                    <input
                        className='rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:border-cyan-500 disabled:opacity-50 block mt-2 w-full'
                        id='password'
                        name='password'
                        type='password'
                        value={password}
                        placeholder='Introduzca su nueva contraseña'
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <Label description="Confirme su contraseña" htmlFor='password' />
                    <input
                        className='rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:border-cyan-500 disabled:opacity-50 block mt-2 w-full'
                        id='password-confirm'
                        name='password'
                        type='password'
                        value={password_confirmation}
                        placeholder='Introduzca la contraseña nuevamente'
                        required
                        onChange={e => setPassword_confirmation(e.target.value)}
                    />
                </div>
                <div className='pt-4 flex justify-center'>
                    <Button name='Cambiar' styles='w-3/5' />
                </div>
            </form>
            </div>
        </>
    );
}