import React, { useEffect, useState } from "react";
import { backendAPI } from "../../API";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const RefpostedJobs = () => {
  const [refjobs, setRefJobs] = useState([]);
  const { referrerId } = useParams();
  const [sortOrder, setSortOrder] = useState("desc"); 
  const token=localStorage.getItem("reftoken")
  console.log(referrerId);
  console.log(refjobs);
  const refjobHandler = async () => {
    try {
      const response = await fetch(
        `${backendAPI}/jobref/referrer/${referrerId}`,
        {
          method: "GET",
          headers:{
            token:token
          }
        }
      );
      const data = await response.json();
      const sortedJobs = [...data.data].sort((a, b) => {
        const dateA = new Date(a.updatedDate);
        const dateB = new Date(b.updatedDate);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });

      setRefJobs(sortedJobs);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (referrerId) {
      refjobHandler();
    }
  }, [referrerId,sortOrder]);

  return (
    <div>
     
     
      <section class="text-gray-600 min-h-[60vh] mb-10 text-sm md:text-base mt-14 pt-24 md:mt-0 md:pt-10 body-font">
      <div class="container px-1 mt-8 mx-auto">
        <div className="flex justify-evenly items-center">
        <center className="  text-gray-800 text-xl font-medium mb-5 inline-block border-b-4 pb-2 border-green-600 " >Posted jobs  </center>
        <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border text-white bg-gray-800 mb-3  p-2 rounded text-sm"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
        </div>
        
         <div class="flex flex-wrap -m-4">
          
       {refjobs&& refjobs.map((item,index)=>{
        return(       
              <div key={index} class="px-2 my-2 mx-3 w-full md:mx-0 md:w-1/2">
                <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                  <div class="flex items-center mb-3">
                    <div class="w-14 h-14 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-200 text-white flex-shrink-0">
                    <img className=" rounded-full w-12 h-12 "  src={`${backendAPI}/uploads/${item.image}`} alt="" />
                      
                    </div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">
                      
                      {item.jobTitle}
                    </h2>
                    
                  </div>
                  <p className="font-medium"> Posted On: {new Date(item.updatedDate).toLocaleDateString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
                  <h2 class="text-gray-700 text-base w-full   md:text-lg title-font font-medium flex flex-col md:flex-row md:justify-between ">
                     
                  <span>🏢 {item.companyName} </span><span className="">📍 {""}{item.City}</span>
                    </h2>
                  <div class="flex-grow">
                    <p class="leading-relaxed text-base">
                    {item.jobDescription.substring(0, 200)}...

                    </p>
                    <Link to={`/jobapplication/${item._id}`} class="mt-3 w-full text-indigo-500 cursor-pointer inline-flex items-center">
                      Learn More
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                      <p  className=" ml-auto text-right"> Applications {item.application ? (item.application.length ):(null)} </p>
                    </Link>
                    
                  </div>
                </div>
              </div>
  
            
         
        
        )
       })}
          </div>
         </div>
      </section>
    </div>
  );
};

export default RefpostedJobs;
