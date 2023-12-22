import { Link } from "react-router-dom";
import logoFile from "./../assets/blogshare.png";

function Logo() {
  return (
    <Link className="flex items-center mb-2" to="/">
      <img src={logoFile} alt="logo" className="cursor-pointe w-10 mr-[1px]" />
      <span className="text-2xl text-red-600">Blogshare</span>
    </Link>
  );
}

export default Logo;
