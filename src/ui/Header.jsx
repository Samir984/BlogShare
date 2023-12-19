import UserStatus from "./UserStatus";
import Logo from "./Logo";

function Header() {
  return (
    <div className="flex items-start p-4 bg-slate-50 justify-between">
      <Logo />
      <UserStatus/>
    </div>
  );
}

export default Header;
