import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const GoBackButton = ({ to ,className = "text-white", children }) => {
  return (
    <Link to={to} className={`flex items-center gap-2 ${className}`}>
      <FaArrowLeft />
      {children || "Kembali"}
    </Link>
  );
};

export default GoBackButton;
