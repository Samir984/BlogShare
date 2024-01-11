import React from "react";
import { useNavigate } from "react-router-dom";

function NaviagateBack() {
  const navigate = useNavigate();
  return (
    <div className="mb-4 cursor-pointer hover:text-blue-800">
      <span className="text-2xl" onClick={() => navigate(-1)}>
        &larr;Go back
      </span>
    </div>
  );
}

export default NaviagateBack;
