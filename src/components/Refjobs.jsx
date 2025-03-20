import React, { useEffect, useState } from "react";
import { backendAPI } from "../../API";
import { Link } from "react-router-dom";

const Refjobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const refJobHandler = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendAPI}/jobref/alljobs`);
      const data = await response.json();
      if (data && data.data) {
        setJobs(data.data);
      } else {
        console.error("Unexpected API response format:", data);
      }
    } catch (error) {
      console.log("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refJobHandler();
  }, []);

  // Filter and sort jobs
  useEffect(() => {
    let filtered = jobs;

    if (selectedCity) {
      filtered = filtered.filter((job) => job.City === selectedCity);
    }

    if (selectedState) {
      filtered = filtered.filter((job) => job.State === selectedState);
    }

    if (searchQuery) {
      const lowerSearch = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(lowerSearch) ||
          job.companyName.toLowerCase().includes(lowerSearch) ||
          job.jobDescription.toLowerCase().includes(lowerSearch) ||
          (job.skills &&
            (Array.isArray(job.skills)
              ? job.skills.some((skill) =>
                  skill.toLowerCase().includes(lowerSearch)
                )
              : job.skills.toLowerCase().includes(lowerSearch)))
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.updatedDate);
      const dateB = new Date(b.updatedDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCity, selectedState, searchQuery, sortOrder, jobs]);

  // Get jobs for current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Pagination handlers
  const nextPage = () => {
    if (indexOfLastJob < filteredJobs.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <section className="text-gray-600 text-sm pt-24 md:py-0 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        {/* Filters Section */}
        <div className=" text-sm md:fixed md:top-12 md:left-0 md:right-0 md:z-50   flex flex-wrap justify-center gap-1 md:gap-6 mb-14 p-2 bg-gray-900 shadow-md rounded-lg">
  
  {/* Search Input */}
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="🔍 Search jobs,skills...."
    className="border px-4 py-0 rounded-lg w-full md:w-1/3 h-8 focus:ring-2 focus:ring-indigo-400 outline-none"
  />

  {/* State Dropdown */}
  <select
    value={selectedState}
    onChange={(e) => setSelectedState(e.target.value)}
    className="border px-4 py-0 rounded-lg bg-white h-8 cursor-pointer hover:bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none"
  >
    <option value="">🌍 Select State</option>
    {[...new Set(jobs.map((job) => job.State))].map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
  </select>

  {/* City Dropdown */}
  <select
    value={selectedCity}
    onChange={(e) => setSelectedCity(e.target.value)}
    className="border px-4 py-0 rounded-lg bg-white h-8 cursor-pointer hover:bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none"
  >
    <option value="">🏙️ Select City</option>
    {[...new Set(jobs.map((job) => job.City))].map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
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


        {/* Job Listings */}
        <div className="-mt-18 divide-y-2 min-h-[60vh] divide-gray-100">
          {loading ? (
            <div className="flex justify-center min-h-screen items-center">
              <svg
                className="animate-spin h-8 w-8 text-blue-500"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0h-2a6 6 0 00-12 0H4z"
                ></path>
              </svg>
              <span className="ml-3 text-gray-500">Loading jobs...</span>
            </div>
          ) : currentJobs.length > 0 ? (
            currentJobs.map((item, index) => (
              <div key={index} className="md:py-5 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span className="font-semibold text-xl title-font font-medium text-gray-700 capitalize">
                    {item.jobTitle}
                  </span>
                  <span className="mt-1 text-gray-500 text-sm">
                    {new Date(item.updatedDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="mt-1 text-gray-500 text-sm">
                    Min-Experience: {item.minExp} years
                  </span>
                </div>
                <div className="md:flex-grow">
                <h2 className="text-base md:text-xl capitalize font-medium text-gray-900 title-font mb-2">
                    {item.companyName}
                  </h2>
                  <p className="leading-relaxed capitalize md:text-lg font-medium text-black ">
                    📌 {item.City}
                  </p>
                  <p className="leading-relaxed capitalize">
                    {item.jobDescription.substring(0, 200)}...
                  </p>
                  <Link to={`/get/${item._id}`} className="text-indigo-500 inline-flex items-center mt-4">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-14 text-gray-500">No jobs available</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <button onClick={prevPage} disabled={currentPage === 1} className="">
          <img className="h-10 w-14" src="../../arrow-left-circle-fill.svg" alt="" />
          </button>
          <span className="px-4 py-2">Page {currentPage}</span>
          <button onClick={nextPage} disabled={indexOfLastJob >= filteredJobs.length} className="">
          <img className="h-10 w-14" src="../../arrow-right-circle-fill.svg" alt="" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Refjobs;
