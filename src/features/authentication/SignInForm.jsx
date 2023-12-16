import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
function SignInForm() {
  
  return (
    <div className="flex flex-col gap-2 w-80 self-center">
      <form action="">
        <input type="text" className="w-full p-1" placeholder="email" />
        <input
          type="password"
          className="w-full p-1 mt-2"
          placeholder="password"
        />
        <button className="p-2 bg-blue-700 text-white font-semibold hover:bg-blue-800 mt-4 rounded w-full">
          Log in
        </button>
      </form>
      <div className="flex justify-center items-center gap-2 my-2">
        <hr className="border-b border-gray-300  w-full mx-auto " />
        or
        <hr className="border-b border-gray-300  w-full mx-auto" />
      </div>
      <button className="flex items-center gap-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center w-full">
        <FaGoogle className="mr-2" />{" "}
        <div className="font-medium text-lg">Continue with Google</div>
      </button>

      <div className="mt-4 text-center font-semibold text-gray-700">
        Not on blogShare yet? <Link to='/signup'  className="hover:underline active:underline">Sign up</Link>
      </div>
    </div>
  );
}

export default SignInForm;
