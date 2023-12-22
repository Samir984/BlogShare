import UserStatus from "./UserStatus";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { useTheme } from "../context/ThemeProvider";
function Header() {
  const { themeMode, setThemeMode } = useTheme();
  return (
    <div className="flex items-center px-2 py-4 bg-slate-50 dark:bg-slate-800 dark:text-white">
      <Logo />
      <nav className="ml-auto mr-2 sm:mr-4 flex items-center gap-1 sm:gap-5">
        <div
          className="p-1"
          onClick={() =>
            setThemeMode((prev) =>
              prev.themeMode === "light"
                ? { themeMode: "dark" }
                : { themeMode: "light" }
            )
          }
        >
          {themeMode === "light" && <MdOutlineWbSunny size={24} />}
          {themeMode === "dark" && <IoMoonOutline size={24} />}
        </div>
        <Link to="/create">
          <span className="whitespace-nowrap blog p-2   ,transition-all duration-300  ">
            Create Blog
          </span>
        </Link>
      </nav>
      <UserStatus />
    </div>
  );
}

export default Header;
