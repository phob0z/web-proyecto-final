import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Label, Button, ModalView  } from '../../components'
import { AuthContext } from '../../contexts';

export const Resetpassword = () => 
{

    const navigate = useNavigate();

    const [token, setToken] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')
    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false);
    const [titleMessage, setTitleMessage] = useState('');

    const handleClose = () => setShow(false);

    const onResetpassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/reset-password/',
                { token,email,password,password_confirmation },
                { headers: { 'accept': 'application/json' } }
            )
            //console.log(response);
            //console.log(response.errors);
            console.log(response.data.message);
            setShow(true)
            setMessage(response.data.message);
            setTitleMessage("The password change has been done successfully")
            //const {access_token, token_type, user} = response.data.data 
            //console.warn(access_token, token_type, user);
            //login(user, `${token_type} ${access_token}`);   
            //navigate('/');
            if(show === false) {
                navigate('/');  
                }   
        } catch (error) {
            setShow(true)
            console.log(error.response.data.errors.password, 'error');
            let respuesta = '';
            error.response.data.errors.password.map((resp) => {
                respuesta+= resp +'\n'
                console.log(resp)
            }
                );
            console.log(respuesta);
            setMessage(respuesta);
            setTitleMessage("The password change could not be generated")
        }
    }

    return (
        <>
        <div data-toggle="modal" data-target="#exampleModalCenter">
            <h2 className='text-2xl md:text-3xl font-bold'>Welcome Back</h2>
            <p className='text-sm text-gray-500 pb-6'>Enter your email to send you an email so you can reset your password</p>
            <form className='space-y-7 text-left' onSubmit={onResetpassword}>
                <div>
                    <Label description="Access token" htmlFor='email' />
                    <input
                        className='rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:border-cyan-500 disabled:opacity-50 block mt-2 w-full'
                        id='token'
                        name='access token'
                        type='string'
                        value={token}
                        placeholder='Enter your access token'
                        maxLength="50"
                        required
                        autoFocus
                        onChange={e => setToken(e.target.value)}
                    />
                </div>
                <div>
                    <Label description="Email address" htmlFor='email' />
                    <input
                        className='rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:border-cyan-500 disabled:opacity-50 block mt-2 w-full'
                        id='email'
                        name='email'
                        type='email'
                        value={email}
                        placeholder='Enter your email'
                        maxLength="35"
                        required
                        autoFocus
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <Label description="Password" htmlFor='password' />
                    <input
                        className='rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:border-cyan-500 disabled:opacity-50 block mt-2 w-full'
                        id='password'
                        name='password'
                        type='password'
                        value={password}
                        placeholder='Enter your new password'
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <Label description="Confirm your password" htmlFor='password' />
                    <input
                        className='rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:border-cyan-500 disabled:opacity-50 block mt-2 w-full'
                        id='password-confirm'
                        name='password'
                        type='password'
                        value={password_confirmation}
                        placeholder='Enter your new password again'
                        required
                        onChange={e => setPassword_confirmation(e.target.value)}
                    />
                </div>
                <div className='pt-4 flex justify-center'>
                    <Button name='Reset Password' styles='w-3/5' />
                </div>
            </form>
            <ModalView handleShow ={show} handleClose ={handleClose} description={message} title = {titleMessage}/>
            </div>
        </>
    );
}