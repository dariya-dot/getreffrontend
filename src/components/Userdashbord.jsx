import React, { useState, useEffect } from "react";
import { backendAPI } from "../../API";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Userdashbord = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [application, setApplications] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refJobId,setRefJobId]=useState()
   const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
const navigate=useNavigate()
  const cancleRequest=async()=>{
    try {
      const response= await fetch(`${backendAPI}/user/job_delete`,
        {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({userId,refJobId})

        }
      )
      const data= await response.json()
      window.location.reload()
      console.log(data)

    } catch (error) {
      console.error(error)
    }
  }
 
  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendAPI}/user/get/${userId}`);
      const data = await response.json();
      if (data) {
        console.log(data);
        setUser(data.data);
        if (data.application) {
          setApplications(data.application);
          console.log("applications : ", data.application);
        }
      } else {
        console.log("data not found");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load data. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <>
    
      {user ? (
        <>
          <div className="pt-24 min-h-screen mt-14 md:mt-0 text-sm px-2 max-w-6xl mx-auto ">
          <center>
        {" "}
        {error && <p className="text-red-500">{error}</p>}
        {loading && <p className="text-gray-500">Loading...</p>}
      </center>
            <h1 className="text-3xl font-bold  text-center text-gray-800 mb-6">
              User Dashboard
            </h1>

            <div className="border rounded-lg md:text-base lg:text-xl xl:text-xl shadow-lg p-6 bg-white">
              {/* Profile Section */}
              <div className="flex items-center space-x-4 mb-6">
                {user.photo ? (
                  <img
                    src={`${backendAPI}/uploads/${user.photo}`}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border-2 border-gray-300"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <div>
                  <p className="text-lg md:text-base lg:text-lg font-semibold">{user.name}</p>
                  <p className="text-gray-600 md:text-base lg:text-lg">
                    {user.profession || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:text-base lg:text-lg sm:grid-cols-2 gap-2  sm:gap-4 md:gap-5 lg:gap-6">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone || "Not available"}
                </p>
                <p>
                  <strong>Company:</strong> {user.company || "Not specified"}
                </p>
                <p>
                  <strong>Education:</strong>{" "}
                  {user.education || "Not specified"}
                </p>
                <p>
                  <strong>Experience:</strong> {user.experience} years
                </p>
                <p>
                  <strong>Skills:</strong>{" "}
                  {user.skills.length > 0
                    ? user.skills.join(", ")
                    : "No skills added"}
                </p>
                <p>
                  <strong>Address:</strong> {user.address || "Not specified"}
                </p>
                <p>
                  <strong>City:</strong> {user.City || "Not specified"}
                </p>
                <p>
                  <strong>State:</strong> {user.State || "Not specified"}
                </p>
                <p>
                  <strong>Account Verified:</strong>
                  <span
                    className={`ml-2 px-2 py-1 text-sm font-medium rounded ${
                      user.isVerified
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {user.isVerified ? "Yes" : "No"}
                  </span>
                </p>
                <p>
                  <strong>Joined On:</strong>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Links (Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <p>
                  <strong>GitHub:</strong>{" "}
                  {user.git ? (
                    <a
                      href={user.git}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.git}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
                <p>
                  <strong>LinkedIn:</strong>{" "}
                  {user.linkedIn ? (
                    <a
                      href={user.linkedIn}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.linkedIn}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
                <p>
                  <strong>Resume:</strong>{" "}
                  {user.resume ? (
                    <a
                      href={`${backendAPI}/uploads/${user.resume}`}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  ) : (
                    "Not uploaded"
                  )}
                </p>
                <p>
                  <strong>Offer Letter/Experience Certificate:</strong>{" "}
                  {user.offerLetter_or_experienceCertificate ? (
                    <a
                      href={`${backendAPI}/uploads/${user.offerLetter_or_experienceCertificate}`}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Document
                    </a>
                  ) : (
                    "Not uploaded"
                  )}
                </p>
              </div>
            </div>

            <div>
              {user.appliedJobs.length > 0 ? (
                <section class="bg-white text-sm  py-8  antialiased dark:bg-gray-900 md:py-16">
                  <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div class="gap-4 sm:flex sm:items-center sm:justify-between">
                      <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                        Applied Jobs
                      </h2>
                    </div>
                    {application.map((job) => (
                      <div class="mx-auto max-w-6xl">
                        <div class="mt-6 flow-root sm:mt-8 ">
                          <div class="divide-y  divide-gray-200 dark:divide-gray-700">
                            <div class="flex flex-wrap items-center md:gap-y-4 gap-y-2 py-0">
                              <dl class="w-full sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt class=" font-medium md:text-base text-gray-500 dark:text-gray-400 sm:text-base">
                                  Role
                                </dt>
                                <dd class="mt-1.5 md:text-base  font-semibold text-gray-900 sm:text-base dark:text-white">
                                  <a href="#" class="hover:underline">
                                    {job.jobTitle}
                                  </a>
                                </dd>
                              </dl>

                              <dl class="w-full sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt class=" md:text-base font-medium text-gray-500 dark:text-gray-400">
                                  Company
                                </dt>
                                <dd class="mt-1.5 md:text-base font-semibold text-gray-900 dark:text-white">
                                  {job.companyName}
                                </dd>
                              </dl>

                              <dl class="w-full sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt class="md:text-base font-medium text-gray-500 dark:text-gray-400">
                                  State
                                </dt>
                                <dd class="mt-1.5 md:text-base font-semibold text-gray-900 dark:text-white">
                                  {job.State}
                                </dd>
                              </dl>

                              <dl class=" sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt class="md:text-base font-medium text-gray-500 dark:text-gray-400">
                                  Salary
                                </dt>
                                <dd class="mt-1.5 md:text-base font-semibold text-gray-900 dark:text-white">
                                  ₹ {job.salary}
                                </dd>
                              </dl>

                              <div class="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                <button
                                  onClick={() => {
                                    setIsModalOpen(true);
                                    setRefJobId(job._id);

                                  }}
                                  type="button"
                                  class="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                                >
                                  Cancel Request
                                </button>
                                <button
                                onClick={()=>{
                                  // setRefJobId(job._id)
                                  navigate(`/get/${job._id}`)
                                    }}
                                  
                                  class="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                                >
                                  View details
                                </button>
                              </div>
                            </div>    
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : (
                <p className="text-gray-500">No applied jobs found.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {isModalOpen && (
        <>
         

          
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete this job application?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={cancleRequest}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
     
        </>
      )}
    </>
  );
};

export default Userdashbord;
