import React from "react";
import { Link, useNavigate } from "react-router-dom";
const NavSection = () => {
  const navigate = useNavigate();
  const token =
    localStorage.getItem("reftoken") || localStorage.getItem("usertoken");
  const referrerId = localStorage.getItem("referrerId");
  const userId = localStorage.getItem("userId");
  const logoutHandler = () => {
    localStorage.removeItem("reftoken");
    localStorage.removeItem("usertoken");
    localStorage.removeItem("referrerId");
    localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
  };
  const userhandler = () => {
    navigate("/usersignin");
  };
  const refhandler = () => {
    navigate("/referlsignin");
  };
  return (
    <div className=" fixed top-0 left-0 right-0 z-50  ">
      <header className="   text-gray-400 bg-gray-900    body-font">
        <div className="container mx-auto flex flex-wrap p-2  flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <img
              src="/profile.png"
              alt="Profile"
              className="w-10 h-10 text-white p-2 cursor-pointer bg-indigo-500 rounded-full"
            />
            <span
              onClick={() => {
                navigate("/");
              }}
              className="ml-2 text-xl cursor-pointer"
            >
              GetReferred
            </span>
          </a>
          <nav className="md:ml-auto text-sm flex flex-wrap items-center text-base justify-center gap-2">
            {referrerId && token && (
              <Link
                to={`/refdashbord/${referrerId}`}
                className="mr-5 my-0 hover:text-white"
              >
                Ref Dashbord
              </Link>
            )}
            {userId && token && (
              <Link
                to={`/userdashbord/${userId}`}
                className="mr-5  my-0 hover:text-white"
              >
                User Dashbord
              </Link>
            )}
            {referrerId && token && (
              <Link to="/refdetails" className="mr-5  my-0 hover:text-white">
                update Profile
              </Link>
            )}
            {userId && token && (
              <Link to="/updateuser" className="mr-5  my-0 hover:text-white">
                update Profile
              </Link>
            )}

            {referrerId && token && (
              <Link to={`/refjobform`} className="mr-5 my-0 hover:text-white">
                {" "}
                Post a Job{" "}
              </Link>
            )}
            {referrerId && token && (
              <Link
                to={`/refjobdetails/${referrerId}`}
                className="mr-5 my-0 hover:text-white"
              >
                Posted Jobs
              </Link>
            )}
          </nav>

          {token ? (
            <button
              onClick={logoutHandler}
              className="inline-flex text-sm items-center bg-gray-800 border-0 py-1 ml-2 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
            >
              {" "}
              Log Out
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          ) : (
            <>
              <button
                onClick={refhandler}
                className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700  active:bg-gray-200 rounded text-base my-1 md:mt-0"
              >
                ReferNow
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
              <button
                onClick={userhandler}
                className="inline-flex items-center bg-gray-800 border-0 py-1 ml-2 px-3 focus:outline-none hover:bg-gray-700  active:bg-gray-200 rounded text-base  md:mt-0"
              >
                {" "}
                Find Your Referral
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default NavSection;
