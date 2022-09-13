import React from 'react';
import { JailForm } from '../../components/organisms/JailForm';

export const CreateJail = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Jail</h1>
            <hr className='mt-3' />
            <JailForm />
        </div>
    );
}

