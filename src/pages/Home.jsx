import { Outlet } from "react-router-dom";
import Header from "../ui/Header";

function Home() {
  

  return (
    <>
      <Header />
      <main className="p-2 m-4 max-w-7xl mx-auto flex justify-center items-center">
        <Outlet />
      </main>
    </>
  );
}

export default Home;
