import React, { useEffect, useState } from "react";

import { Mail, Phone } from "lucide-react";
import { backendAPI } from "../../API";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RefLandingPage = () => {
  const navigate=useNavigate()
  const { referrerId } = useParams();
  const [referrerData, setReferrerData] = useState({});
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRefHandler = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendAPI}/referer/get/${referrerId}`);
      const data = await response.json();
      if (data) {
        setReferrerData(data.data);
        setJobs(data.jobs)
        console.log(data.jobs);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRefHandler();
  }, []);
  return (
    <div className="bg-gray-200" >
            <br />
      <center>
        {" "}
        {error && <p className="text-red-500">{error}</p>}
        {loading && <p className="text-gray-500">Loading...</p>}
      </center>
      {referrerData ? (
        <div className="min-h-screen min-h-[70vh] capitalize bg-gray-200 p-6 pt-24 md:pt-5 mt-14 flex flex-col items-center">
          {/* Profile Card */}
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
            {/* Profile Section */}
            <div className="flex items-center gap-6 border-b pb-4">
              <img
                src={`${backendAPI}/uploads/${referrerData.photo}`}
                alt={referrerData.name}
                className="w-20 h-20 rounded-full border-4 border-blue-500"
              />
              <div>
                <h2 className="text-2xl font-bold capitalize">{referrerData.name}</h2>
                <p className="text-gray-500 capitalize">
                  {" "}
                  <span className="text-gray-900 ">Working At : </span>
                  {referrerData.company}
                </p>
              </div>
            </div>

            {/* Contact Info - Column on Mobile, Row on Larger Screens */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4 text-gray-700">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5  " />
                <span className="lowercase ">{referrerData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>{referrerData.phone}</span>
              </div>
            </div>

            {/* Job Details */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Current Job</h3>
              <p className="text-gray-600 capitalize">
                {referrerData.jobTitle} at {referrerData.company}
              </p>
              <p className="text-gray-500">
                Location: {referrerData.jobLocation}
              </p>
            </div>

          


            <div className="mt-6">
      <h3 className="text-lg font-semibold">
        Referred Jobs ({referrerData?.referedJobs?.length ?? 0})
      </h3>
      <div className="mt-2 space-y-4 capitalize">
        {referrerData?.referedJobs?.length > 0 ? (
          jobs.map((job, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              {/* Job Details */}
              <div onClick={() => navigate(`/jobapplication/${job._id}`)} className="cursor-pointer w-full sm:w-auto">
                <h4 className="text-lg font-semibold text-gray-800">{job.companyName}</h4>
                <ul className="mt-2 text-gray-600 text-sm space-y-1">
                  <li>
                    <strong>Job Title:</strong> {job.jobTitle || "Not specified"}
                  </li>
                  <li>
                    <strong>Salary:</strong> {job.salary ? `₹ ${job.salary}` : "Not specified"}
                  </li>
                  <li>
                    <strong>Location:</strong> {job.City}, {job.State}
                  </li>
                  <li>
                    <strong>Posted on:</strong> {new Date(job.postedDate).toLocaleDateString()}
                  </li>
                  <li>
                  <strong>Job Application :</strong> {referrerData?.referedJobs?.length}
                  </li>
                </ul>
              </div>

              {/* Delete Button */}
              <button
                // onClick={() => onDelete(job._id)}
                className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No jobs referred yet.</p>
        )}
      </div>
    </div>

      
 





          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RefLandingPage;
