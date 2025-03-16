import React from 'react'
import { useState } from 'react';
import { backendAPI } from '../../API';
const Userdetailspost = () => {
    const [state, setState] = useState("");
    
    const token=localStorage.getItem("usertoken")
    const [photo,SetPhoto] = useState(null);
    const [resume,setResume] = useState(null);
    const [offerLetter,SetOfferLetter] = useState(null);
 
    const [formData,setFormData]=useState({
        profession:"",
        company:"",
        phone:"",
        education:"",
        skills:"",
        address:"",
        experience:"",
        git:"",
        linkedIn:"",
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
      SetPhoto(event.target.files[0]);
      };
    const handleResumeChange = (event) => {
      setResume(event.target.files[0]);
      };
    const handleOfferChange = (event) => {
      SetOfferLetter(event.target.files[0]);
      };
   
    const jobpostHandler = async (e)=>{
      e.preventDefault()
        
        try {


            const formDataToSend = new FormData();
      formDataToSend.append("profession", formData.profession);
      formDataToSend.append("company", formData.company);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("education", formData.education);
      formDataToSend.append("skills", formData.skills);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append("git", formData.git);
      formDataToSend.append("linkedIn", formData.linkedIn);
      formDataToSend.append("state", state);
     
      if (photo) formDataToSend.append("photo", photo);
      if (resume) formDataToSend.append("resume", resume);
      if (offerLetter) formDataToSend.append("offerLetter", offerLetter);


            const response= await fetch(`${backendAPI}/user/update`,{
                method:"PUT",
                headers:{
                 
                    token:token
                },
                body:
                    formDataToSend 
               
         })
         const data= await response.json()
         console.log(data)
            
        }
         catch (error) {
            console.error(error)
        }
    }
return (
      <div className="max-w-3xl pt-10 text-sm md:text-base mx-auto mt-24 p-6 bg-black-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Update your Profile</h2>
        <form onSubmit={jobpostHandler}>
          {/* Company Profession */}
          <label className="block mb-2 font-medium">Profession</label>
          <input  type="text" name="profession" value={formData.profession} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="Enter company Role" />
          {/* Company  */}
          <label className="block mb-2 font-medium">Previous Company </label>
          <input  name="company" value={formData.company} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="Enter company Name"/>
          {/* Job Number */}
          <label className="block mb-2 font-medium">Contact Number</label>
          < input   name="phone" value={formData.phone} type="number" onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="enter your conatact numebr" />
           {/* job Education details */}
           <label className="block mb-2 font-medium">Education</label>
          <textarea  name="education" value={formData.education} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder=" Enter education  "></textarea>
          {/* Job Skills */}
          <label className="block mb-2 font-medium">Skills</label>
          <textarea  name="skills" value={formData.skills} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="enter your skils separate with kama ',' "></textarea>
          {/* job Address details */}
          <label className="block mb-2 font-medium">Address</label>
          <textarea  name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder=" Enter yor address" ></textarea>
        {/* github linka */}
          <label className="block mb-2 font-medium">Git hub link</label>
          <input  name="git" value={formData.git} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder=" git link" />
          
        {/* Linkedin linka */}
          <label className="block mb-2 font-medium">linked in link</label>
          <input  name="linkedIn" value={formData.linkedIn} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder=" linkedIn Link" />
          
          {/* State Dropdown */}
          <label className="block mb-2 font-medium">State</label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={state}
             
            onChange={(e) => {
              setState(e.target.value);
              
            }}
          >
            <option value="">Select State</option>
            {Object.keys(statesAndCities).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          
         
          
          {/* Experience */}
          <label className="block mb-2 font-medium"> Experience</label>
          < input  name="experience" value={formData.experience} onChange={handleChange} type="number" className="w-full p-2 border rounded mb-4" placeholder="years of  Experience" />
          {/* Vacancy */}
         
         
           {/*  pic */}
          <label className="block mb-2 text-sm font-medium">Upload your Image</label>
          < input   type="file" className="w-full p-2 border rounded-md mb-4" onChange={handlePhotoChange} />

           {/* resume */}
          <label className="block mb-2 text-sm font-medium">Upload your resume</label>
          < input   type="file" className="w-full p-2 border rounded-md mb-4" onChange={handleResumeChange} />

           {/* experience */}
          <label className="block mb-2 text-sm font-medium">Upload your experience</label>
          < input   type="file" className="w-full p-2 border rounded-md mb-4" onChange={handleOfferChange} />

         
          {/* Submit Button */}
          <button type='submit' className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Update
          </button>
        </form>
      </div>
    );
}

export default Userdetailspost
