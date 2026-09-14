import React from 'react';
import { Spinner } from '@heroui/react';


const LoadingSpinner = () => {
    return (
        <div className='w-full flex justify-center items-center'>
            <div className="flex flex-col items-center gap-2">
                <Spinner color="success" size="xl" />
                <span className="text-xs text-muted">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingSpinner;