import React, { useEffect, useState } from "react";
import { backendAPI } from "../../API";
import { Link } from "react-router-dom";

const Refjobs = () => {
  const [jobs, setJobs] = useState([]);
  console.log(jobs);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");
  const refJobHandler = async () => {
    try {
      const response = await fetch(`${backendAPI}/jobref/alljobs`);
      const data = await response.json();
      if (data && data.data) {
        setJobs(data.data);
      } else {
        console.error("Unexpected API response format:", data);
      }
    } catch (error) {
      console.log("Error fetching jobs:", error);
    }
  };
    // Extract unique cities and states for dropdowns
    const cities = [...new Set(jobs.map(job => job.City))];
    const states = [...new Set(jobs.map(job => job.State))];
    useEffect(() => {
      let filtered = jobs;
  
      if (selectedCity) {
        filtered = filtered.filter(job => job.City === selectedCity);
      }
  
      if (selectedState) {
        filtered = filtered.filter(job => job.State === selectedState);
      }
  
      if (searchQuery) {
        const lowerSearch = searchQuery.toLowerCase();
        filtered = filtered.filter(job => 
          job.jobTitle.toLowerCase().includes(lowerSearch) ||
          job.companyName.toLowerCase().includes(lowerSearch) ||
          job.jobDescription.toLowerCase().includes(lowerSearch) ||
          (
            job.skills &&
            (Array.isArray(job.skills)
              ? job.skills.some(skill => skill.toLowerCase().includes(lowerSearch))  // ✅ If skills is an array
              : job.skills.toLowerCase().includes(lowerSearch)) // ✅ If skills is a string
          )
        );
      }
      filtered.sort((a, b) => {
        const dateA = new Date(a.updatedDate);
        const dateB = new Date(b.updatedDate);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  
      setFilteredJobs(filtered);
    }, [selectedCity, selectedState, searchQuery, sortOrder, jobs]);

 

  useEffect(() => {
    refJobHandler();
  }, []);

  return (
    <section className="text-gray-600 text-sm py-24 md:py-0 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">

       {/* Search & Filters */}
      {/* <div className="flex flex-wrap gap-4 justify-center mb-8">
        
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title, skills, company..."
            className="border p-2 rounded w-full md:w-1/3"
          />
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div> */}
  <div className=" text-sm md:fixed md:top-12 md:left-0 md:right-0 md:z-50   flex flex-wrap justify-center gap-1 md:gap-6 mb-14 p-2 bg-gray-900 shadow-md rounded-lg">
  
  {/* Search Input */}
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="🔍 Search jobs..."
    className="border px-4 py-0 rounded-lg w-full md:w-1/3 h-8 focus:ring-2 focus:ring-indigo-400 outline-none"
  />

  {/* State Dropdown */}
  <select
    value={selectedState}
    onChange={(e) => setSelectedState(e.target.value)}
    className="border px-4 py-0 rounded-lg bg-white h-8 cursor-pointer hover:bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none"
  >
    <option value="">🌍 Select State</option>
    {states.map((state, index) => (
      <option key={index} value={state}>{state}</option>
    ))}
  </select>

  {/* City Dropdown */}
  <select
    value={selectedCity}
    onChange={(e) => setSelectedCity(e.target.value)}
    className="border px-4 py-0 rounded-lg bg-white h-8 cursor-pointer hover:bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none"
  >
    <option value="">🏙️ Select City</option>
    {cities.map((city, index) => (
      <option key={index} value={city}>{city}</option>
    ))}
  </select>

  {/* Sort Order Dropdown */}
  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className="border px-4 py-0 rounded-lg bg-white h-8 cursor-pointer hover:bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none"
  >
    <option value="desc">⬆️ Newest First</option>
    <option value="asc">⬇️ Oldest First</option>
  </select>

</div>


        <div className="-my-8 divide-y-2 divide-gray-100">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((item, index) => {
              return (
                <div key={index} className="md:pt-24 flex flex-wrap md:flex-nowrap">
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="font-semibold text-xl title-font font-medium text-gray-700">
                      {" "}
                      {item.jobTitle}
                    </span>
                    <span className="mt-1 text-gray-500 text-sm">
                      {new Date(item.updatedDate).toLocaleDateString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="mt-1 text-gray-500 text-sm">
                     Min-Experience: {item.minExp} {''} years
                    </span>
                  </div>
                  <div className="md:flex-grow">
                    <h2 className="text-base md:text-xl font-medium text-gray-900 title-font mb-2">
                      {" "}
                      {item.companyName}
                    </h2>
                    <p className="leading-relaxed md:text-lg font-medium text-black ">
                    📌 {item.City}
                      
                    </p>
                    <p className="leading-relaxed">{item.jobDescription.substring(0,200)}...</p>
                    <Link
                      to={`/get/${item._id}`}
                      className="text-indigo-500 inline-flex items-center mt-4"
                    >
                      Learn More
                      <svg
                        class="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No jobs available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Refjobs;
