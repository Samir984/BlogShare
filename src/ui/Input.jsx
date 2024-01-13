import React from "react";

const Input = React.forwardRef(
  ({ label, type = "text", className = "", error, ...props }, ref) => {
  
    return (
      <div className="">
        {label && <label className="inline-block">{label}</label>}
        <input type={type} className={className} ref={ref} {...props} />
        {error && <p className="text-red-600">{error}</p>}
      </div>
    );
  }
);

export default Input;
