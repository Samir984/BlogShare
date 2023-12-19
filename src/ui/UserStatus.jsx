import { useDispatch, useSelector } from "react-redux";
import { getUserStatus, signOut } from "../features/authslice";
import { Link } from "react-router-dom";
import authService from "../services/auth";
import { useState } from "react";

function UserStatus() {
  const { status } = useSelector(getUserStatus);
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const handleLogout = async function () {
    try {
      setIsProcessing(true);
      const session = await authService.signOut();
      dispatch(signOut());
      setIsProcessing(false);
    } catch (error) {}
  };

  return (
    <Link
      to={`${!status ? "/signin" : ""}`}
      onClick={() => !status || handleLogout()}
    >
      <div className="px-3 py-1  text-xl text-white bg-red-500 hover:bg-red-600 rounded-lg">
        {status ? (
          isProcessing ? (
            <span className="loader">
              <span />
            </span>
          ) : (
            "Logout"
          )
        ) : (
          "Login"
        )}
      </div>
    </Link>
  );
}

export default UserStatus;
