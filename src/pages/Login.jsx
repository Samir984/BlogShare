import { useLocation } from "react-router-dom";

import Logo from "../ui/Logo";
import SignInForm from "../features/authentication/SignInForm";
import SignUpForm from "../features/authentication/SignUpForm";

function Login() {
  const { pathname } = useLocation();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="shadow-2xl px-4 py-10 w-[460px] flex flex-col gap-  ">
        <div className="w-full flex justify-center ">
          <Logo />
        </div>
        <header className="mb-2">
          <h1 className="font-mono font-semibold text-2xl text-center ">
            {pathname === "/signin"
              ? "Welcome to BlogShare"
              : "Create a new Account"}
          </h1>
        </header>
        {pathname === "/signin" ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
}

export default Login;
