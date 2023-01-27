import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ className = "", onClick, children, disabled, ...props }) => {
  const navigate = useNavigate();
  return (
    <button
      className={`rounded-lg text-white bg-primary px-8 py-3 font-medium w-full ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
