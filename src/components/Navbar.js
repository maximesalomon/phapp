import React from "react";

const Navbar = ({ loggedIn, setLoggedIn }) => {

  const loggingOut = () => {
    localStorage.removeItem('userPHToken');
    setLoggedIn(false)
  }
  
  return (
    <nav className="flex items-center justify-between flex-wrap bg-orange-600 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          ProductHunt + Payfit
        </span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            href="https://api.producthunt.com/v2/docs"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:font-medium mr-4"
          >
            PH GraphQL API Docs
          </a>
          <a
            href="https://twitter.com/maximesalomon"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:font-medium mr-4"
          >
            Built by maximesalomon
          </a>
        </div>
        {
          loggedIn === false
          ? <div>
              <a
                href="https://api.producthunt.com/v2/oauth/authorize?client_id=e14e77d9332895fbb8136b11380eb397f4d7275a39c5e7b3b9b06c2a11eedccc&redirect_uri=https://phpayfit.netlify.com&response_type=code&scope=public+private"
                className="inline-block text-sm px-8 py-3 leading-none border rounded text-white border-white hover:border-transparent hover:text-orange-600 hover:bg-white mt-4 lg:mt-0"
              >
                Login
              </a>
            </div>
          : <div>
              <button
                className="inline-block text-sm px-8 py-3 leading-none border rounded text-white border-white hover:border-transparent hover:text-orange-600 hover:bg-white mt-4 lg:mt-0"
                onClick={() => loggingOut()}
              >
                Logout
              </button>
            </div>
        }
      </div>
    </nav>
  );
};

export default Navbar;