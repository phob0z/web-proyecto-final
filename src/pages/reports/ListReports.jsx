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
        'http://web-final-backend.herokuapp.com/api/v1/report',
        //'http://127.0.0.1:8000/api/v1/report',
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
      const confirmation = confirm("Are you sure?")
      if (confirmation) {
        await axios.get(
          `http://web-final-backend.herokuapp.com/api/v1/report/${id}/destroy`,
          //`http://127.0.0.1:8000/api/v1/report/${id}/destroy`,
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
      <h1 className='font-black text-4xl text-sky-900'>Reports</h1>
      <hr className='mt-3' />
      <p className='mt-3'>List of created reports</p>

      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-sky-900 text-white'>
          <tr>
            <th className='p-2'>#</th>
            <th className='p-2'>Title</th>
            <th className='p-2'>Description</th>
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
                    onClick={() => navigate(`/reports/show/${report.id}`)}>Show</button>
                  <button type='button' className='bg-cyan-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl'
                    onClick={() => navigate(`/reports/edit/${report.id}`)}>Edit</button>
                  <button type='button' className='bg-orange-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl'
                    onClick={() => deleteReport(report.id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}


