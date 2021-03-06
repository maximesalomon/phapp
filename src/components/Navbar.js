import React from "react";

const Navbar = ({ loggedIn, setLoggedIn, name }) => {
  const loggingOut = () => {
    localStorage.removeItem("userPHToken");
    setLoggedIn(false);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-phorange pl-6 pr-6 p-3">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">MaxPH</span>
      </div>
      <div>
        {loggedIn === false ? (
          <div>
            <a
              href="https://api.producthunt.com/v2/oauth/authorize?client_id=e14e77d9332895fbb8136b11380eb397f4d7275a39c5e7b3b9b06c2a11eedccc&redirect_uri=https://phapp.netlify.com&response_type=code&scope=public+private"
              className="inline-block text-sm px-8 py-3 leading-none border rounded text-white border-white hover:border-transparent hover:text-orange-600 hover:bg-white mt-4 lg:mt-0"
            >
              Login
            </a>
          </div>
        ) : (
          <div className="flex">
            <p className="text-white py-2 px-4">
              You are signed in as <span className="font-medium">{name}</span>
            </p>
            <button
              className="inline-block text-sm px-8 py-3 leading-none border rounded text-white border-white hover:border-transparent hover:text-orange-600 hover:bg-white mt-4 lg:mt-0"
              onClick={() => loggingOut()}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;