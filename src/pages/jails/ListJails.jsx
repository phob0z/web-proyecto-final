import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ListJails = () => {

  const navigate = useNavigate();
  const [jails, setJails] = useState([]);
  const token = localStorage.getItem('token');

  const getJails = async () => {
    try {
      const response = await axios.get(
        'hhttps://web-final-backend.herokuapp.com/api/v1/jail',
        //'https://127.0.0.1:8000/api/v1/jail',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(response.data.data.jails)
      setJails(response.data.data.jails)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteJail = async (id) => {
    try {
      console.warn(id);
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("¿Está seguro?")
      if (confirmation) {
        await axios.get(
          `https://web-final-backend.herokuapp.com/api/v1/jail/${id}/destroy`,
          //`https://127.0.0.1:8000/api/v1/jail/${id}/destroy`,
          { headers: { 'accept': 'application/json', 'authorization': token } }
        );
        await getJails();
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getJails();
  }, [])

  return (
    <div>
      <h1 className='font-black text-4xl text-sky-900'>Carceles</h1>
      <hr className='mt-3' />
      <p className='mt-3'>Lista de las carceles</p>

      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-sky-900 text-white'>
          <tr>
            <th className='p-2'>#</th>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Descripción</th>
            <td className='p-2'></td>
          </tr>
        </thead>
        <tbody>
          {
            jails.map((jail, index) => (
              <tr key={jail.id} className="border-b hover:bg-gray-100">
                <td className='p-3'>{++index}</td>
                <td className='p-3'>{jail.name}</td>
                <td className='p-3'>{jail.description}</td>
                <td className='p-3'>
                  <button type='button' className='bg-sky-800 block w-full text-white p-2 uppercase font-bold text-xs rounded-xl'
                    onClick={() => navigate(`/jails/show/${jail.id}`)}>Mostrar</button>
                  <button type='button' className='bg-cyan-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl'
                    onClick={() => navigate(`/jails/edit/${jail.id}`)}>Editar</button>
                  <button type='button' className='bg-orange-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl'
                    onClick={() => deleteJail(jail.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}


