import { forwardRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth";
import toast from "react-hot-toast";
import { signIn } from "../authslice";
import Input from "../../ui/Input";

function SignInForm() {
  const [isSubmiting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

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

  const onError = function (errors) {
    //error
  };

  return (
    <div className="flex flex-col gap-2 w-80 self-center">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Input
          type="text"
          className="w-full p-1 mt-3"
          placeholder="Email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please provide a valid email address",
            },
          })}
        />

        <Input
          type="password"
          className="w-full p-1 mt-6"
          placeholder="Password"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            validate: (fieldValue) => {
              return fieldValue.length < 8
                ? "Password must be at least 8 character long"
                : true;
            },
          })}
        />

        <button className="p-2 bg-blue-700 text-white font-semibold hover:bg-blue-800 mt-7 rounded w-full">
          {isSubmiting ? <span className="loader"></span> : "Log in"}
        </button>
      </form>
      <div className="mt-4 text-center font-semibold text-gray-900">
        Not on blogShare yet?&nbsp;
        <Link to="/signup" className="hover:underline active:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default SignInForm;
