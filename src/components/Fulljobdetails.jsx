import React, { useState, useEffect } from "react";
import { backendAPI } from "../../API";
import { useParams } from "react-router-dom";
import "./fulljondetails.css";
import { useNavigate } from "react-router-dom";

const Fulljobdetails = () => {
  const navigation = useNavigate();
  const [hasRequested, setHasRequested] = useState(true);
  const { refJobId } = useParams();
  const [singleJob, setSingleJobs] = useState({});
  const token=localStorage.getItem("reftoken")

  const userId = localStorage.getItem("userId");
  console.log("ref id", refJobId);
  const loginpage = () => {
    if (!userId) {
      navigation("/usersignin");
    }
  };
  const fullJobHandler = async () => {
    try {
      const response = await fetch(`${backendAPI}/jobref/job/${refJobId}`,
        {
          method:"GET",
          headers:{
            token:token
          }
        });
      const data = await response.json();
      console.log(" API response format:", data.data);
      setSingleJobs(data.data || {});
    } catch (error) {
      console.log("Error fetching jobs:", error);
    }
  };
  const checkRequestStatus = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`${backendAPI}/user/get/${userId}`);
      const data = await response.json();

      if (data.data.appliedJobs.includes(refJobId)) {
        setHasRequested(false);
      }
    } catch (error) {
      console.log("Error checking applied jobs:", error);
    }
  };

  const handleRequestReference = async () => {
    if (!userId) {
      loginpage();
      return;
    }

    try {
      const response = await fetch(`${backendAPI}/user/apply-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, refJobId }),
      });

      const data = await response.json();
      if (data.message === "Job application submitted successfully") {
        setHasRequested(false);
        alert("your request set please wait for referer message");

        console.log(data);
      }
    } catch (error) {
      console.log("Error applying for job:", error);
    }
  };

  useEffect(() => {
    fullJobHandler();
    checkRequestStatus();
  }, []);
  return (
    <>
      <section className="text-gray-600 text-sm pt-10 md:pt-0 body-font">
        <div className="container px-5  mb-2 md:mb-10 mt-10 pt-24 mx-auto flex flex-wrap ">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium mt-1 text-xl md:text-3xl text-gray-900">
              {singleJob.jobTitle}
            </h1>
            <img src={`${backendAPI}/uploads/1741421141266`} alt="" />
            <h1 className="title-font font-medium mt-1 text-lg text-gray-500">
              {singleJob.companyName}
            </h1>
            <div className=" w-full text-black pt-8">
              <p>
                📍 {singleJob.State} , {singleJob.City}
              </p>
              <p>💼 {singleJob.jobType}</p>
              <p> 💵 ₹ {singleJob.salary}</p>
              <p>📝 Min-Exp: {singleJob.minExp}</p>
            </div>
            <h1 className="title-font font-medium text-lg md:text-2xl mt-5 text-gray-900">
              Job description
            </h1>
            <p className="leading-relaxed ">{singleJob.jobDescription}</p>

            <h1 className="title-font font-medium text-lg md:text-2xl  mt-5 text-gray-900">
              Responsibility
            </h1>
            <p className="leading-relaxed ">{singleJob.resposibilites}</p>

            <h1 className="title-font font-medium text-lg md:text-2xl  mt-5 text-gray-900">
              Skills
            </h1>
            <p className="leading-relaxed ">{singleJob.skills}</p>

            <h1 className="title-font font-medium text-lg md:text-2xl  mt-5 text-gray-900">
              Qualifications
            </h1>
            <p className="leading-relaxed">{singleJob.qualification}</p>
          </div>

          <div className="z-10  lg:w-2/6 md:w-1/2  bg-gray-100 rounded-lg pb-0  p-8 mb-0 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-2xl font-large title-font mb-5">
              <strong> Job Summery</strong>
            </h2>
            <div className="relative mb-4">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  {" "}
                  <strong>Published</strong> :{" "}
                  {new Date(singleJob.updatedDate).toLocaleDateString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </li>
                <li>
                  {" "}
                  <strong>Vacancy</strong> : {singleJob.Vacancy}
                </li>
                <li>
                  {" "}
                  <strong>Job Nature</strong> : {singleJob.jobType}{" "}
                </li>
                <li>
                  {" "}
                  <strong>Salary</strong>: ₹ {singleJob.salary}{" "}
                </li>
                <li>
                  {" "}
                  <strong>Location</strong>:{singleJob.City}{" "}
                </li>
                <li>
                  {" "}
                  <strong>Min-Experience</strong>: {singleJob.minExp} years
                </li>
                <li>
                  {" "}
                  <strong>Last date</strong> :{" "}
                  {new Date(singleJob.lastDate).toLocaleDateString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                </li>
              </ul>
              <h2 className="text-gray-900 text-2xl font-large title-font mb-5 mt-4">
                <strong> Company Detail</strong>
              </h2>
              <div className="relative">{singleJob.companydetails}</div>
            </div>
          </div>
        </div>

        
      </section>

      <center>
          <button
            onClick={handleRequestReference}
            disabled={!hasRequested}
            className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group 
              ${
                !hasRequested
                  ? "bg-gray-500 cursor-not-allowed text-black"
                  : "bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white"
              }`}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent">
              {!hasRequested
                ? "Already Applied"
                : userId
                ? "Apply for Job"
                : "Login to Apply"}
            </span>
          </button>
        </center>
        
    
    </>
  );
};

export default Fulljobdetails;
