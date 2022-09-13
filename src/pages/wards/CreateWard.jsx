import React from 'react';
import { WardForm } from '../../components/organisms';

export const CreateWard = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Ward</h1>
            <hr className='mt-3' />
            <WardForm />
        </div>
    );
}

