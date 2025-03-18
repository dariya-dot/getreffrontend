import React from 'react'
import { useState } from 'react';
import { backendAPI } from '../../API';
const RefjobpostForm = () => {
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [jobType, setJobType] = useState("");
    const [file,setFile] = useState(null);
   const token= localStorage.getItem("reftoken")
    const [formData,setFormData]=useState({
        companyName:"",
        companydetails:"",
        jobTitle:"",
        skills:"",
        resposibilites:"",
        qualification:"",
        jobDescription:"",
        minExp:"",
        Vacancy:"",
        lastDate:"",
    })
    const statesAndCities = {
        Andhra_Pradesh: ["Visakhapatnam", "Vijayawada", "Tirupati", "Guntur", "Rajahmundry"],
        Arunachal_Pradesh: ["Itanagar", "Naharlagun"],
        Assam: ["Guwahati", "Dibrugarh", "Silchar"],
        Bihar: ["Patna", "Gaya", "Muzaffarpur"],
        Chhattisgarh: ["Raipur", "Bhilai", "Durg"],
        Goa: ["Panaji", "Margao"],
        Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
        Haryana: ["Gurgaon", "Faridabad", "Panipat"],
        Himachal_Pradesh: ["Shimla", "Dharamshala"],
        Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
        Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore"],
        Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode"],
        Madhya_Pradesh: ["Indore", "Bhopal", "Gwalior", "Jabalpur"],
        Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
        Manipur: ["Imphal"],
        Meghalaya: ["Shillong"],
        Mizoram: ["Aizawl"],
        Nagaland: ["Kohima", "Dimapur"],
        Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
        Punjab: ["Ludhiana", "Amritsar", "Jalandhar"],
        Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
        Sikkim: ["Gangtok"],
        Tamil_Nadu: ["Chennai", "Coimbatore", "Madurai", "Salem"],
        Telangana: ["Hyderabad", "Warangal", "Karimnagar"],
        Tripura: ["Agartala"],
        Uttar_Pradesh: ["Lucknow", "Kanpur", "Noida", "Varanasi", "Agra"],
        Uttarakhand: ["Dehradun", "Haridwar", "Nainital"],
        West_Bengal: ["Kolkata", "Durgapur", "Siliguri"]
    };





 
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

    const handlePhotoChange = (event) => {
      setFile(event.target.files[0]);
      };
   
    const jobpostHandler = async (e)=>{
      e.preventDefault()
      console.log("filename",file.name)
        try {

          const formDataToSend = new FormData();
          formDataToSend.append("companyName", formData.companyName);
          formDataToSend.append("companydetails", formData.companydetails);
          formDataToSend.append("jobTitle", formData.jobTitle);
          formDataToSend.append("resposibilites", formData.resposibilites);
          formDataToSend.append("skills", formData.skills);
          formDataToSend.append("qualification", formData.qualification);
          formDataToSend.append("jobDescription", formData.jobDescription);
          formDataToSend.append("minExp", formData.minExp);
          formDataToSend.append("Vacancy", formData.Vacancy);
          formDataToSend.append("lastDate", formData.lastDate);
          formDataToSend.append("salary", formData.salary);
          formDataToSend.append("State", state);
          formDataToSend.append("City", city);
          formDataToSend.append("jobType", jobType);
         
          if (file) formDataToSend.append("photo", file);
          
          console.log(formDataToSend)

            const response= await fetch(`${backendAPI}/jobref/jobpost`,{
                method:"POST",
                headers:{
                 
                    token:token
                },
                body:formDataToSend
         })
         const data= await response.json()
         if(data.message=== "refer job details posted successfully")
        {
          alert("Your job details posted successfully ") 
          window.location.reload()
        }
            
        }
         catch (error) {
            console.error(error)
        }
    }
return (
      <>
      <br />
      <div className="max-w-3xl text-sm  mx-auto px-2 mt-14 pt-24  md:p-6 bg-black-800 rounded-lg shadow-md">
        <h2 className="text-2xl mt-5 font-bold mb-6">Post a Job</h2>
        <form onSubmit={jobpostHandler}>
          {/* Company Name */}
          <label className="block mb-1 font-medium">Company Name</label>
          <input required type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="Enter company name" />
          {/* Company details */}
          <label className="block mb-1 font-medium">Company details/description</label>
          <textarea required name="companydetails" value={formData.companydetails} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="Enter company description min 200 letters"></textarea>
          {/* Job Title */}
          <label className="block mb-1 font-medium">Job Title</label>
          < input required  name="jobTitle" value={formData.jobTitle} type="text" onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="Enter job title" />
           {/* job skill details */}
           <label className="block mb-1 font-medium">Requried skills</label>
          <textarea required name="skills" value={formData.skills} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder=" Enter requried Skils "></textarea>
          {/* Job resposibilites */}
          <label className="block mb-1 font-medium">Job Responsibility</label>
          <textarea required name="resposibilites" value={formData.resposibilites} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="Job Responsibility"></textarea>
          {/* job qualification details */}
          <label className="block mb-1 font-medium">Qualifications</label>
          <textarea required name="qualification" value={formData.qualification} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder=" Enter prfered Qualifications details"></textarea>
         
           {/* Job Description */}
           <label className="block mb-1 font-medium">Job Description</label>
          <textarea required name="jobDescription" value={formData.jobDescription} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="Enter job description"></textarea>
          {/* State Dropdown */}
          <label className="block mb-1 font-medium">State</label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={state}
            required 
            onChange={(e) => {
              setState(e.target.value);
              setCity("");
            }}
          >
            <option value="">Select State</option>
            {Object.keys(statesAndCities).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          
          {/* City Dropdown */}
          <label className="block mb-1 font-medium">City</label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!state}
            required 
          >
            <option value="">Select City</option>
            {state && statesAndCities[state].map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          
          {/* Job Type Dropdown */}
          <label className="block mb-1 font-medium">Job Type</label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={jobType}
            required 
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          
          {/* Experience */}
          <label className="block mb-1 font-medium">Min Experience</label>
          < input required name="minExp" value={formData.minExp} onChange={handleChange} type="number" className="w-full p-2 border rounded mb-4" placeholder="Min Experience" />
          {/* Vacancy */}
          <label className="block mb-1 font-medium">Vacancy</label>
          < input required name="Vacancy" value={formData.Vacancy} onChange={handleChange} type="number" className="w-full p-2 border rounded mb-4" placeholder="Enter number of vacancies" />
          
          {/* Salary */}
          <label className="block mb-1 font-medium">Salary in INR</label>
          < input required name="salary" value={formData.salary} onChange={handleChange} type="number" className="w-full p-2 border rounded mb-4" placeholder="Ex. 578000" />
          
         
           {/* company log */}
          <label className="block mb-1 text-sm font-medium">Upload comapny logo</label>
          < input required  type="file" className="w-full p-2 border rounded-md mb-4" onChange={handlePhotoChange} />

          {/* last date for the application */}
         <label className="block mb-1 text-sm font-medium">Last Date for Job Application</label>
          < input required name="lastDate" value={formData.lastDate} onChange={handleChange} type="date" className="w-full p-2 border rounded-md mb-4" />
          {/* Submit Button */}
          <button type='submit' className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Post Job
          </button>
        </form>
      </div></>
    );
}

export default RefjobpostForm
