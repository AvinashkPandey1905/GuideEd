import React from "react";

const Button = ({ children, onClick, variant = "primary", className = "", ...props }) => {
  const baseClass = `btn btn-${variant} ${className}`;
  
  return (
    <button onClick={onClick} className={baseClass.trim()} {...props}>
      {children}
    </button>
  );
};

export default Button;
