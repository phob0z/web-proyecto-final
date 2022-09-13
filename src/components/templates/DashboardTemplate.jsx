import React, { useContext } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/auth/AuthContext';

export const DashboardTemplate = () => 
{

    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const urlActual = location.pathname;
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const onLogout = async () => 
    {
        try {
            await axios.post(
                'https://web-final-backend.herokuapp.com/api/v1/logout',
                //'https://127.0.0.1:8000/api/v1/logout',
                {}, { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            navigate('/login', { replace: true });
            logout();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='md:flex md:min-h-screen'>
            console.console.log({user});
            <div className='md:w-1/4 bg-sky-900 px-5 py-10'>
                <h2 className='text-3xl font-black text-center text-white border-b-2 border-red-700 rounded'>Sistema de prisión</h2>
                <img src={user.avatar} alt="img-client" className="m-auto mt-4" width={120} />
                <h3 className='font-black text-center text-white'>{user.full_name}</h3>
                <h3 className='text-xl font-black text-center text-white'>Rol: {user.role}</h3>
                <hr className="mt-5 text-orange-900" />
                <ul className="mt-5 list-disc list-outside px-5">
                    <li className={`${urlActual === '/update-profile' ? 'text-blue-300': ''}`}>
                        <Link to='/update-profile' className={`${urlActual === '/update-profile' ? 'text-blue-300 hover:bg-sky-800 font-semibold px-2 border border-gray-400 rounded' : 'text-white'} block mt-2 hover:text-blue-200`}>Actualizar perfil</Link>
                    </li>
                    <li className={`${urlActual === '/directors' ? 'text-blue-300': ''}`}>
                        <Link to='/directors' className={`${urlActual === '/directors' ? 'text-blue-300 hover:bg-sky-800 font-semibold px-2 border border-gray-400 rounded' : 'text-white'} block mt-2 hover:text-blue-200`}>Listar directores</Link>
                    </li>
                    <li className={`${urlActual === '/directors/create' ? 'text-blue-300': ''}`}>
                        <Link to='/directors/create' className={`${urlActual === '/directors/create' ? 'text-blue-300 hover:bg-sky-800 font-semibold px-2 border border-gray-400 rounded' : 'text-white'} block mt-2 hover:text-blue-200`}>Crear un director</Link>
                    </li>
                    {/* Reports */}
                    <li className={`${urlActual === '/reports' ? 'text-blue-300': ''}`}>
                        <Link to='/reports' className={`${urlActual === '/reports' ? 'text-blue-300 hover:bg-sky-800 font-semibold px-2 border border-gray-400 rounded' : 'text-white'} block mt-2 hover:text-blue-200`}>Listar reportes</Link>
                    </li>
                    <li className={`${urlActual === '/reports/create' ? 'text-blue-300': ''}`}>
                        <Link to='/reports/create' className={`${urlActual === '/reports/create' ? 'text-blue-300 hover:bg-sky-800 font-semibold px-2 border border-gray-400 rounded' : 'text-white'} block mt-2 hover:text-blue-200`}>Crear un reporte</Link>
                    </li>
                    {/* Jails */}
                    <li className={`${urlActual === '/jails' ? 'text-blue-300': ''}`}>
                        <Link to='/jails' className={`${urlActual === '/jails' ? 'text-blue-300 hover:bg-sky-800 font-semibold px-2 border border-gray-400 rounded' : 'text-white'} block mt-2 hover:text-blue-200`}>Listar carceles</Link>
                    </li>
                    <li className={`${urlActual === '/jails/create' ? 'text-blue-300': ''}`}>
                        <Link to='/jails/create' className={`${urlActual === '/jails/create' ? 'text-blue-300 hover:bg-sky-800 font-semibold px-2 border border-gray-400 rounded' : 'text-white'} block mt-2 hover:text-blue-200`}>Crear una carcel</Link>
                    </li>
                    <li className={`${urlActual === '/wards' ? 'text-blue-300': ''}`}>
                        <Link to='/wards' className={`${urlActual === '/wards' ? 'text-blue-300 hover:bg-sky-800 font-semibold px-2 border border-gray-400 rounded' : 'text-white'} block mt-2 hover:text-blue-200`}>Listar pabellones</Link>
                    </li>
                    <li className={`${urlActual === '/wards/create' ? 'text-blue-300': ''}`}>
                        <Link to='/wards/create' className={`${urlActual === '/wards/create' ? 'text-blue-300 hover:bg-sky-800 font-semibold px-2 border border-gray-400 rounded' : 'text-white'} block mt-2 hover:text-blue-200`}>Crear un pabellón</Link>
                    </li>
                    <button type="button" onClick={onLogout} className="m-auto block mt-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-600 hover:text-black rounded">Salir</button>
                </ul>
            </div>


            <div className='md:w-3/4 p-10 md:h-screen overflow-y-scroll'>
                <Outlet />
            </div>

            
        </div>
    );
}


