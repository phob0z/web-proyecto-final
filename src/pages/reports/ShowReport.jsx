import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const ShowReport = () => {
    const { id } = useParams();
    const [report, setReport] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getReport = async () => {
            try {
                const response = await axios.get(
                    `https://web-final-backend.herokuapp.com/api/v1/report/${id}`,
                    //`https://127.0.0.1:8000/api/v1/report/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const report = { ...response.data.data.report, id }
                setReport(report);
            } catch (error) {
                console.log(error);
            }
        }
        getReport()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Report</h1>
            <hr className='mt-3' />
            <p className='mt-3'>Report details</p>
            {
                Object.keys(report).length > 0 ?
                    (
                        <div className='m-5 flex justify-between'>
                            <div>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Title: </span>
                                    {report.title}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Description: </span>
                                    {report.description}
                                </p>
                            </div>
                        </div>
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this report</p>
                    )
            }
        </div>
    )
}


