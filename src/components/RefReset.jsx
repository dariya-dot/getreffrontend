import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendAPI } from "../../API";
import { CiCircleRemove } from "react-icons/ci";
const RefReset = () => {
  const resetToken = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const resetpasswordHandler = async () => {
 
    try {
      const response = await fetch(
        `${backendAPI}/referer/new-password/${resetToken}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, resetToken }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        alert("no response");
      } else {
        if (data.message ==="password updated") {
          alert("password updated");
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    resetpasswordHandler();
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center py-24 items-center min-h-screen bg-gray-100"
      >
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <div className="absolute top-5 right-4  text-3xl hover:text-gray-450 cursor-pointer text-gray-100">
                                  <CiCircleRemove onClick={()=>navigate('/')} />
                                </div>
          {/* Title Section */}
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-2xl font-semibold text-gray-200">
              NEW PASSWORD
            </h2>
           
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <input
              required
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Submit Password
          </button>

          {/* Condition Text */}
          
        </div>
      </form> 
      <div className="mt-4 text-center text-gray-300 text-sm">
            <a
            
                onClick={()=>navigate('/refforgetpassword')}
              className=" hover:text-blue-300 text-blue-600 underline cursor-pointer  font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
              Send reset link again
            </a>
          </div>
    </div>
  );
};

export default RefReset;
