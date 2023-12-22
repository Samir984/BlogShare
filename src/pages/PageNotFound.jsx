import { PiSmileySad } from "react-icons/pi";

function PageNotFound() {
  return (
    <div className="flex justify-center h-screen">
      <div className="text-center px-2 py-6">
        <div className="w-full h-60">
          <PiSmileySad className="w-full h-full text-gray-600" />
        </div>
        <h1 className="text-7xl">404</h1>
        <h1 className="text-gray-500 text-3xl mb-4">Page Not Found</h1>
        <p className="texxt-gray-800 text-2xl">
          Oops! The page you are looking for could not be found.
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
