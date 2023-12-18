import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "./../../services/auth";
import { useDispatch } from "react-redux";
import { signIn } from "../authslice";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(register);
  const createAccount = async function (e) {
    try {
      const data = await authService.createAccount(email, password, username);
      // console.log(data);
      // toast.success("Account Created Successfully");
      // const currentUserData = await authService.getCurrentUser();
      // dispatch(signIn({ payload: currentUserData }));
      // navigate("/");
    } catch (error) {
      console.log(error);
      toast.error();
    }
  };

  return (
    <div className="flex flex-col gap-2 w-80 self-center">
      <form onSubmit={handleSubmit(createAccount)}>
        <input type="text" className="w-full p-1" placeholder="Username" />
        <input type="text" className="w-full p-1 mt-3" placeholder="Email" />
        <input
          type="password"
          className="w-full p-1 mt-3"
          placeholder="Password"
        />
        <button
          type="submit"
          className="p-2 bg-blue-700 text-white font-semibold hover:bg-blue-800 mt-6 rounded w-full"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
