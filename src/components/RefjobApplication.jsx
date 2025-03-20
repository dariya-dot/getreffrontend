import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { backendAPI } from "../../API";
import { useNavigate } from "react-router-dom";
const RefjobApplication = () => {
  const navigation =useNavigate()
  const [refjobs, setRefJobs] = useState({});
  const [applicants, setApplicants] = useState([]);
  const { refJobId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const referrerId=localStorage.getItem("referrerId")
    const token=localStorage.getItem("reftoken")

  console.log("Ref Job ID from front end:", refJobId);


const deleteJob=async()=>{
    try {
      const response= await fetch(`${backendAPI}/jobref/delete`,
        {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
            token:token
          },
          body:JSON.stringify({refJobId,referrerId})

        }
      )
      const data= await response.json()
      alert("job deleted ")
      navigation(`/refjobdetails/${referrerId}`)
      console.log(data)

    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`${backendAPI}/jobref/job/${refJobId}`,{
          method:"GET",
          headers:{
            token:token
          }
        });
        const data = await response.json();
        console.log("Job Data:", data);
        setRefJobs(data.data || {});
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    const fetchApplicants = async () => {
      try {
        const response = await fetch(
          `${backendAPI}/jobref/job/application/${refJobId}`,{
            method:"GET",
            headers:{
              token:token
            }
          }
        );
        const data = await response.json();
        console.log("Applicants Data:", data);
        setApplicants(data.data || []);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    if (refJobId) {
      fetchJobDetails();
      fetchApplicants();
    }
  }, [refJobId,token]);

  return (
    <>
    <br />
      <section className=" pt-24 mb-4 mt-14 px-6 md:p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {refjobs.jobTitle || "Job Title"}
          </h2>

          <p className="text-gray-600">
            {refjobs.companyName || "Company Name"}
          </p>
          <p className="text-sm text-gray-500">
            💼 {refjobs.jobType || "Full-time"} |      {''} 📍
            {refjobs.State || "Location"} {","} {refjobs.City || "Location"}
          </p>
          <p className="text-lg font-semibold text-green-600 mt-2">
            💵 ₹ {refjobs.salary || "Salary Not Disclosed."}
          </p>

          <div className="mt-4">
            <h3 className="font-bold text-lg">Job Description</h3>
            <p className="text-gray-700">
              {refjobs.jobDescription || "No description available."}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-lg">Responsibilities</h3>
            <ul className="list-disc list-inside text-gray-700">
              {refjobs.resposibilites
                ? refjobs.resposibilites
                    .split(",")
                    .map((res, index) => <li key={index}>{res.trim()}</li>)
                : "No responsibilities listed."}
            </ul>
          </div>

          <div className="mt-4 w-full">
            <h3 className="font-bold text-lg">Skills Required</h3>
            <div className="w-full max-w-4xl p-4 bg-blue-100 text-blue-800 text-sm font-semibold rounded-lg flex flex-wrap gap-2">
              {refjobs.skills
                ? refjobs.skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white px-3 py-1 rounded-md shadow"
                    >
                      {skill.trim()}
                    </span>
                  ))
                : "No skills mentioned."}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-lg">Job Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mt-2">
              <p>
                📅 Published:
                {new Date(refjobs.updatedDate).toLocaleDateString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <p>📝 Min-Experience: {refjobs.minExp || "N/A"} years</p>
              <p>📌 Vacancy: {refjobs.Vacancy || "N/A"}</p>
              <p>
                📅 Last Date:{" "}
                {new Date(refjobs.lastDate).toLocaleDateString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="my-4 ">
            <h3 className="font-bold text-lg">Company Details</h3>
            <p className="text-gray-700">
              {refjobs.companydetails || "No company details available."}
            </p>
          </div>

          <center>
            <button
              onClick={() => setIsModalOpen(true)}
              type="button"
              class="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2"
            >
              
              Delete This Jobs
            </button>
          </center>
        </div>
      </section>



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
                onClick={deleteJob}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
     
        </>
      )}

     
      <section class="bg-gray-900 dark:bg-gray-900 flex items-center justify-center">
        <div class="py-4 px-1 mx-auto w-[98%] max-w-screen-lg text-center lg:py-5 lg:px-0">
          <div class="mx-auto mb-4 max-w-screen-sm lg:mb-4">
            <h2 class="mb-1 text-xl tracking-tight font-extrabold text-gray-100 dark:text-white">
              Applications for Reference
            </h2>
          </div>
          <div
            class="grid w-[98%] mx-auto gap-5 md:gap-8 lg:gap-10 bg-gray-100 pt-5 pb-6 rounded-lg 
        sm:grid-cols-2 md:grid-cols-3 shadow-md lg:grid-cols-4"
          >
            {applicants.length > 0 ? (
              applicants.map((item) => (
                <div
                  class="text-center text-gray-500 dark:text-gray-400 px-4 pb-5 
          w-full sm:w-[95%] md:w-[90%] lg:w-auto mx-auto  rounded-lg"
                >
                  <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">{item.name}</a>
                  </h3>
                  <p>{item.profession || "Unknown Profession"}</p>
                  <p>{item.email}</p>
                  <p>{item.phone}</p>
                  <p>{item.company || "No company mentioned"}</p>
                  <p>
                    {item.experience
                      ? `${item.experience} years experience`
                      : "Experience not provided"}
                  </p>
                  <ul class="flex justify-center mt-4 space-x-4">
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`mailto:${item.email}`}
                      >
                        <img
                          class="w-5 h-5"
                          src="../../envelope.svg"
                          alt="Email"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://wa.me/${item.phone}`}
                      >
                        <img
                          class="w-5 h-5"
                          src="../../whatsapp.svg"
                          alt="WhatsApp"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href={item.git}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          class="w-5 h-5"
                          src="../../github.svg"
                          alt="GitHub"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item.linkedIn}
                      >
                        <img
                          class="w-5 h-5"
                          src="../../linkedin.svg"
                          alt="LinkedIn"
                        />
                      </a>
                    </li>
                  </ul>
                  <div className="mt-5">
                    {item.resume ? (
                      <a
                        href={
                          item?.resume
                            ? `${backendAPI}/uploads/${item.resume}`
                            : "#"
                        }
                        download={`${item?.name}.pdf`}
                        target="_blank"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900"
                      >
                        Download resume
                      </a>
                    ) : (
                      <p className="text-red-500">No resume available</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>

          {applicants.length == 0 && (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-200">
                No one requested for the reference
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default RefjobApplication;
