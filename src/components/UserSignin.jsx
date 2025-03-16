import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { backendAPI } from "../../API";
const UserSignin = () => {
  const navigate = useNavigate();
  const [signUp, SetSignUp] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpButton, setOtpButton] = useState(false);
  const signHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendAPI}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();

      if (data.message === "This email is not registered") {
        alert("This email is not registered");
      } else if (data.message === "Email and password are incorrect") {
        alert("Email and password are incorrect");
      } else {
        alert("userlogin is sucessfull");
        localStorage.setItem("usertoken", data.token);
        localStorage.setItem("userId",data.data._id)
        const userId=data.data._id
        setEmail("");
        setPassword("");
        navigate(`/userdashbord/${userId}`);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendAPI}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await response.json();

      console.log(data);
      if (data.message === "User already registered") {
        alert("User already registered");
      } else if (data.message === "Please Enter the valid email") {
        alert("Please Enter the valid email");
      } else {
        setOtpButton(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const otpsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendAPI}/user/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
        }),
      });
      const data = await response.json();
      if (data.message === "you entered wrong otp") {
        alert("you entered wrong otp");
      } else if (data.data.otp === "") {
        alert("registation done");

        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center text-sm mt-10 md:mt-0 md:pt-5 pt-24 items-center min-h-screen bg-gray-100">
      <div className="lg:w-2/6 md:w-1/2 bg-gray-700 mt-4 mx-1 my-3 rounded-lg p-8 flex flex-col w-full max-w-md">
        {!otpButton ? (
          <form onSubmit={signUp === "signup" ? signUpHandler : signHandler}>
            <h2 className="text-gray-100 text-xl font-medium title-font mb-5">
              <center>
                {" "}
                <p>Join Today – Find Referrers Faster!</p>
                <span className="mr-2">
                  {signUp === "signup" ? "Sign Up" : "Sign In"}
                </span>
              </center>
            </h2>

            {signUp === "signup" && (
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-100">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            )}

            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-100">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>

            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-100">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              {signUp === "signup" ? "Sign Up" : "Sign In"}
            </button>

            <p className="text-sm text-gray-100 mt-3 text-center">
              {signUp === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
              <span
                onClick={() =>
                  SetSignUp(signUp === "signup" ? "signin" : "signup")
                }
                className="text-blue-500 bg-white-600 cursor-pointer font-medium ml-3"
              >
                Click Here
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={otpsubmit}>
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              OTP Verification
            </h2>

            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Submit OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserSignin;
