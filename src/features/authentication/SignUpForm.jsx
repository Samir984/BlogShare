import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "./../../services/auth";
import { useDispatch } from "react-redux";
import { signIn } from "../authslice";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

function SignUpForm() {
  const [isSubmiting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState,reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async function (data) {
    const { email, password, username } = data;
    setIsSubmitting(true);
    try {
      const userData = await authService.createAccount(
        email,
        password,
        username
      );
      toast.success("Account Created Successfully");
      reset();
      if (userData) {
        const currentUserData = await authService.getCurrentUser();
        if (currentUserData) {
          dispatch(signIn({ payload: currentUserData }));
        }
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error();
    } finally {
      setIsSubmitting(false);
    }
  };
  const onError = function (errors) {
    console.log(errors);
  };

  return (
    <div className="flex flex-col gap-2 w-80 self-center">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <input
          type="text"
          className="w-full p-1"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
        />
        <p className="text-red-600">{errors.username?.message}</p>

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
            validate: (fieldValue) => {
              return fieldValue.length < 8
                ? "Password must be at least 8 character long"
                : true;
            },
          })}
        />
        <p className="text-red-600">{errors.password?.message}</p>

        <button
          type="submit"
          className="p-2 bg-blue-700 text-white font-semibold hover:bg-blue-800 mt-6 rounded w-full"
        >
          {isSubmiting ? <span className="loader"></span> : "Create Account"}
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
