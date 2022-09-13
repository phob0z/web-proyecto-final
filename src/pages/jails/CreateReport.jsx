import React from 'react';
import { ReportForm } from '../../components/organisms';

export const CreateReport = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Report</h1>
            <hr className='mt-3' />
            <ReportForm />
        </div>
    );
}

