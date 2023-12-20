import UserStatus from "./UserStatus";
import Logo from "./Logo";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex items-center px-2 py-4 bg-slate-50 ">
      <Logo />
      <nav className="ml-auto mr-4 ">
        <Link to="/create">
          <span className="whitespace-nowrap blog p-2  text-gray-800   ,transition-all duration-300  ">
            Create Blog
          </span>
        </Link>
      </nav>
      <UserStatus />
    </div>
  );
}

export default Header;
