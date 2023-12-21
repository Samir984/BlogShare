import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth";
import toast from "react-hot-toast";
import { signIn } from "../authslice";

function SignInForm() {
  const [isSubmiting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async function (data) {
    const { email, password } = data;
    try {
      setIsSubmitting(true);
      const session = await authService.signIn(email, password);
      toast.success("Login was successful");
      reset();
      if (session) {
        const userData = await authService.getCurrentUser();
        dispatch(signIn(userData));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const signInWithGoogle = function () {
    // const session = authService.signInWithGoogle();
    // console.log(session);
  };
  const onError = function (errors) {
    //error
  };

  return (
    <div className="flex flex-col gap-2 w-80 self-center">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <input
          type="text"
          className="w-full p-1 mt-3"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please provide a valid email address",
            },
          })}
        />
        <p className="text-red-600">{errors.email?.message}</p>

        <input
          type="password"
          className="w-full p-1 mt-3"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        <p className="text-red-600">{errors.password?.message}</p>

        <button className="p-2 bg-blue-700 text-white font-semibold hover:bg-blue-800 mt-4 rounded w-full">
          {isSubmiting ? <span className="loader"></span> : "Log in"}
        </button>
      </form>
      <div className="flex justify-center items-center gap-2 my-2">
        <hr className="border-b border-gray-300  w-full mx-auto " />
        or
        <hr className="border-b border-gray-300  w-full mx-auto" />
      </div>
      <button
        className="flex items-center gap-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center w-full"
        onClick={signInWithGoogle}
      >
        <FaGoogle className="mr-2" />
        <div className="font-medium text-lg">Continue with Google</div>
      </button>

      <Link to="/signup" className="hover:underline active:underline" onClick>
        <div className="mt-4 text-center font-semibold text-gray-700">
          Not on blogShare yet? Sign up
        </div>
      </Link>
    </div>
  );
}

export default SignInForm;
