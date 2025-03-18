import React from 'react'
import { useState } from 'react';
import { backendAPI } from '../../API';
const RefDetailsUpload = () => {
   
    const [file,setFile] = useState(null);
   const token= localStorage.getItem("reftoken")
    const [formData,setFormData]= useState({
        company:"",
        jobTitle:"",
        jobLocation:"",
        phone:"",
       
    })

 
    const handleChange = (e) => {
      const { name, value } = e.target;
      
      setFormData((prev) => ({
        ...prev,
        [name]: value.trim(),  
      }));
    };

    const handlePhotoChange = (event) => {
      setFile(event.target.files[0]);
      };
   
    const jobpostHandler = async (e)=>{
      e.preventDefault()
  
        try {
          console.log("data",formData)
          const formDataToSend = new FormData();
          formDataToSend.append("company", formData.company);
          formDataToSend.append("jobLocation", formData.jobLocation);
          formDataToSend.append("jobTitle", formData.jobTitle);
          formDataToSend.append("phone", formData.phone);
          if (file) formDataToSend.append("photo", file);
         
          console.log("form data",formDataToSend)

            const response= await fetch(`${backendAPI}/referer/update`,{
                method:"PUT",
                headers:{
                 
                    token:token,
                },
                body:formDataToSend
         })
         const data= await response.json()
         console.log(data)
         if(data.message=== "refer not found"){
          alert("referer not found please log in again")
         }else if(!response.ok){
          alert("profile not  updated")
         console.log(data)
         }   
         else{
          alert("profile updated")
         }
        }
         catch (error) {
            console.error(error)
        }
    }
return (
      <div className="max-w-3xl mx-2 md:mx-auto mt-14 pt-20 mb-10 px-2  md:p-6 bg-black-800 rounded-lg shadow-md">
        <h2 className="text-2xl mt-5 pt-5 font-bold mb-6">Update your details</h2>
        <form onSubmit={jobpostHandler}>
          {/* Company Name */}
          <label className="block mb-2 font-medium">Company Name</label>
          <input  type="text" name="company" value={formData.company} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="Enter company name" />
          {/* Company details */}
          <label className="block mb-2 font-medium">jobLocation</label>
          <input  name="jobLocation" value={formData.jobLocation} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="Enter your job location"></input>
          {/* Job Title */}
          <label className="block mb-2 font-medium">Job Title</label>
          < input   name="jobTitle" value={formData.jobTitle} type="text" onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="Enter job title" />
           {/* job skill details */}
           <label className="block mb-2 font-medium">Contact Number</label>
          <input  name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder=" Phone Number "></input>
          {/* company log */}
          <label className="block mb-2 text-sm font-medium">Upload your Image</label>
          < input   type="file" className="w-full p-2 border rounded-md mb-4" onChange={handlePhotoChange} />
          <button type='submit' className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
           Update your Details
          </button>
        </form>
      </div>
    );
}

export default RefDetailsUpload
