import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendAPI } from "../../API";
import { CiCircleRemove } from "react-icons/ci";

const RefForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
 
  
  const forgetpasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendAPI}/referer/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        if (data.message === "user not fount with this email") {
          alert("user not fount with this email");
          setEmail("");
        }
      } else {
        alert("reset link sent to your email");
        navigate("/");
 
      }
    } catch (error) {
      console.error(error);
    }
    
  };

  

  return (
    <div>
     
        <>
          <form onSubmit={forgetpasswordHandler}>
            <div className="flex justify-center  text-sm mt-10 md:mt-0 md:pt-5 pt-24 items-center min-h-screen bg-gray-100 relative ">

              <div className="lg:w-2/6 md:w-1/2 bg-gray-700 mt-4 mx-1 my-3 rounded-lg p-8 flex flex-col w-full max-w-md relative">
              <div className="absolute top-5 right-4  text-3xl hover:text-gray-450 cursor-pointer text-gray-100">
                      <CiCircleRemove onClick={()=>navigate('/')} />
                    </div>
                <h2 className="text-gray-100 flex justify-center items-center">
                  FORGET PASSWORD
                </h2>

                <div className="relative mb-4">
                  <label className="leading-7 text-sm text-gray-100">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                    placeholder="Enter Your Reisterd Email"
                  />
                </div>

                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
                  Send reset link
                </button>
              </div>
            </div>
          </form>
        </>
     
    </div>
  );
};

export default RefForgetPassword;
