import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dummy = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("reftoken") || localStorage.getItem("usertoken");
  const referrerId = localStorage.getItem("referrerId");
  const userId = localStorage.getItem("userId");

  const [isReferrerDropdownOpen, setIsReferrerDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("reftoken");
    localStorage.removeItem("usertoken");
    localStorage.removeItem("referrerId");
    localStorage.removeItem("userId");
    navigate('/');
    window.location.reload();
  };

  const toggleReferrerDropdown = () => {
    setIsReferrerDropdownOpen(!isReferrerDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <header className=" sticky top-0 z-50  text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <img src="/profile.png" alt="Profile" className="w-10 h-10 cursor-pointer bg-indigo-500 rounded-full" />
          <span onClick={() => navigate('/')} className="ml-3 text-xl cursor-pointer">GetReferred</span>
        </div>

        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {referrerId && token && (
            <div className="relative">
              <button onClick={toggleReferrerDropdown} className="mr-5 hover:text-white">Referrer</button>
              {isReferrerDropdownOpen && (
                <div className="absolute bg-gray-800 text-white rounded-md shadow-md w-40">
                  <Link to={`/refdashbord/${referrerId}`} className="block px-4 py-2 hover:bg-gray-700">Dashboard</Link>
                  <Link to='/refdetails' className="block px-4 py-2 hover:bg-gray-700">Update Profile</Link>
                  <Link to='/refjobform' className="block px-4 py-2 hover:bg-gray-700">Post a Job</Link>
                  <Link to={`/refjobdetails/${referrerId}`} className="block px-4 py-2 hover:bg-gray-700">Posted Jobs</Link>
                </div>
              )}
            </div>
          )}

          {userId && token && (
            <div className="relative">
              <button onClick={toggleUserDropdown} className="mr-5 hover:text-white">User</button>
              {isUserDropdownOpen && (
                <div className="absolute bg-gray-800 text-white rounded-md shadow-md w-40">
                  <Link to={`/userdashbord/${userId}`} className="block px-4 py-2 hover:bg-gray-700">Dashboard</Link>
                  <Link to='/updateuser' className="block px-4 py-2 hover:bg-gray-700">Update Profile</Link>
                </div>
              )}
            </div>
          )}
        </nav>

        {token ? (
          <button onClick={logoutHandler} className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Log Out</button>
        ) : (
          <>
            <button onClick={() => navigate('/referlsignin')} className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">ReferNow</button>
            <button onClick={() => navigate('/usersignin')} className="inline-flex items-center bg-gray-800 border-0 py-1 ml-2 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Find Your Referral</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Dummy;
