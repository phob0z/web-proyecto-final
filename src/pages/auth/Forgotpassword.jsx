import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Label, Button, ModalView  } from '../../components'
import { AuthContext } from '../../contexts';

export const Forgotpassword = () => 
{

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false);
    const [titleMessage, setTitleMessage] = useState('');

    const handleClose = () => setShow(false);

    const onForgotpassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/forgot-password',
                { email },
                { headers: { 'accept': 'application/json' } }
            )
            console.log(response.data.message);
            setShow(true)
            setMessage(response.data.message);
            setTitleMessage("Your account has been found")
            //const {access_token, token_type, user} = response.data.data 
            //console.warn(access_token, token_type, user);
            //login(user, `${token_type} ${access_token}`);  
            if(show === false) {
                navigate('/reset-password');  
                }     
        } catch (error) {
            setShow(true)
            console.log(error.response.data.message, 'error');
            setMessage(error.response.data.message);
            setTitleMessage("Your account has not been found")
        }
    }

    return (
        <>
        <div data-toggle="modal" data-target="#exampleModalCenter">
            <h2 className='text-2xl md:text-3xl font-bold'>Welcome Back</h2>
            <p className='text-sm text-gray-500 pb-6'>Enter your email to send you an email so you can reset your password</p>
            <form className='space-y-7 text-left' onSubmit={onForgotpassword}>
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
                <div className='pt-4 flex justify-center'>
                    <Button name='Send mail by email' styles='w-3/5' />
                </div>
            </form>
            <ModalView handleShow ={show} handleClose ={handleClose} description={message} title = {titleMessage}/>
            </div>
        </>
    );
}
