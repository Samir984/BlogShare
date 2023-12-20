import { Outlet } from "react-router-dom";
import Header from "../ui/Header";

function Home() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Home;
