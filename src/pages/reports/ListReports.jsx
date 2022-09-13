import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ListReports = () => {

  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const token = localStorage.getItem('token');

  const getReports = async () => {
    try {
      const response = await axios.get(
        'https://web-final-backend.herokuapp.com/api/v1/report',
        //'https://127.0.0.1:8000/api/v1/report',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(response.data.data.reports)
      setReports(response.data.data.reports)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteReport = async (id) => {
    try {
      console.warn(id);
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("¿Está seguro?")
      if (confirmation) {
        await axios.get(
          `https://web-final-backend.herokuapp.com/api/v1/report/${id}/destroy`,
          //`https://127.0.0.1:8000/api/v1/report/${id}/destroy`,
          { headers: { 'accept': 'application/json', 'authorization': token } }
        );
        await getReports();
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getReports();
  }, [])

  return (
    <div>
      <h1 className='font-black text-4xl text-sky-900'>Reportes</h1>
      <hr className='mt-3' />
      <p className='mt-3'>Lista de los reportes</p>

      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-sky-900 text-white'>
          <tr>
            <th className='p-2'>#</th>
            <th className='p-2'>Título</th>
            <th className='p-2'>Descripción</th>
            <td className='p-2'></td>
          </tr>
        </thead>
        <tbody>
          {
            reports.map((report, index) => (
              <tr key={report.id} className="border-b hover:bg-gray-100">
                <td className='p-3'>{++index}</td>
                <td className='p-3'>{report.title}</td>
                <td className='p-3'>{report.description}</td>
                <td className='p-3'>
                  <button type='button' className='bg-sky-800 block w-full text-white p-2 uppercase font-bold text-xs rounded-xl'
                    onClick={() => navigate(`/reports/show/${report.id}`)}>Mostrar</button>
                  <button type='button' className='bg-cyan-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl'
                    onClick={() => navigate(`/reports/edit/${report.id}`)}>Editar</button>
                  <button type='button' className='bg-orange-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl'
                    onClick={() => deleteReport(report.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}


