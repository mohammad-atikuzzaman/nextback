import Link from 'next/link';
import React from 'react';

const layout = ({children}) => {
    return (
        <div className='flex flex-col items-center justify-center w-full min-h-screen'>
            <div className=' bg-gray-300 space-x-4 p-2  '>
                <Link href="/auth">Login</Link>
                <Link href="auth/register">Register</Link>
            </div>
            {children}
        </div>
    );
};

export default layout;