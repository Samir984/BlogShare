import { Link } from "react-router-dom";
import logoFile from "./../assets/blogshare.png";

function Logo() {
  return (
    <Link className="flex items-center" to="/">
      <img src={logoFile} alt="logo" className="cursor-pointe w-10" />
      <span className="text-xl text-red-600">Blogshare</span>
    </Link>
  );
}

export default Logo;
