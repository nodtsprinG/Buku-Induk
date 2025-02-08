import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const GoBackButton = () => {
    return (
        <Link to={'/'} className='text-white'>
            <FaArrowLeft />
        </Link>
    );
};

export default GoBackButton