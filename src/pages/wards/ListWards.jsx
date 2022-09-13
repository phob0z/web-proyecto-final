import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ListWards = () => {

  const navigate = useNavigate();
  const [wards, setWards] = useState([]);
  const token = localStorage.getItem('token');

  const getWards = async () => {
    try {
      const response = await axios.get(
        'https://web-final-backend.herokuapp.com/api/v1/ward',
        //'https://127.0.0.1:8000/api/v1/ward',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(response.data.data.wards)
      setWards(response.data.data.wards)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteWard = async (id) => {
    try {
      console.warn(id);
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("Are you sure?")
      if (confirmation) {
        await axios.get(
          `https://web-final-backend.herokuapp.com/api/v1/ward/${id}/destroy`,
          //`https://127.0.0.1:8000/api/v1/ward/${id}/destroy`,
          { headers: { 'accept': 'application/json', 'authorization': token } }
        );
        await getWards();
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWards();
  }, [])

  return (
    <div>
      <h1 className='font-black text-4xl text-sky-900'>Wards</h1>
      <hr className='mt-3' />
      <p className='mt-3'>List of created wards</p>

      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-sky-900 text-white'>
          <tr>
            <th className='p-2'>#</th>
            <th className='p-2'>Name</th>
            <th className='p-2'>description</th>
            <td className='p-2'></td>
          </tr>
        </thead>
        <tbody>
          {
            wards.map((ward, index) => (
              <tr key={ward.id} className="border-b hover:bg-gray-100">
                <td className='p-3'>{++index}</td>
                <td className='p-3'>{ward.name}</td>
                <td className='p-3'>{ward.description}</td>
                <td className='p-3'>
                  <button type='button' className='bg-sky-800 block w-full text-white p-2 uppercase font-bold text-xs rounded-xl'
                    onClick={() => navigate(`/wards/show/${ward.id}`)}>Show</button>
                  <button type='button' className='bg-cyan-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl'
                    onClick={() => navigate(`/wards/edit/${ward.id}`)}>Edit</button>
                  <button type='button' className='bg-orange-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl'
                    onClick={() => deleteWard(ward.id)}>Delete</button>
                  
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}


