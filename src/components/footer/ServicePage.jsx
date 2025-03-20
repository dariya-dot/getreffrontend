import React from "react";

const serviceAreas = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Tirupati", "Guntur", "Rajahmundry"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun"],
  Assam: ["Guwahati", "Dibrugarh", "Silchar"],
  Bihar: ["Patna", "Gaya", "Muzaffarpur"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Durg"],
  Goa: ["Panaji", "Margao"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  Haryana: ["Gurgaon", "Faridabad", "Panipat"],
  "Himachal Pradesh": ["Shimla", "Dharamshala"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
  Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore"],
  Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior", "Jabalpur"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Manipur: ["Imphal"],
  Meghalaya: ["Shillong"],
  Mizoram: ["Aizawl"],
  Nagaland: ["Kohima", "Dimapur"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  Sikkim: ["Gangtok"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  Telangana: ["Hyderabad", "Warangal", "Karimnagar"],
  Tripura: ["Agartala"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Varanasi", "Agra"],
  Uttarakhand: ["Dehradun", "Haridwar", "Nainital"],
  "West Bengal": ["Kolkata", "Durgapur", "Siliguri"],
};

const ServicePage = () => {
  return (
    <div className=" mb-4 max-w-4xl mx-auto pt-24 mt-12 md:mt-0 text-center">

      <h1 className="md:text-3xl pt-2  text-xl font-bold text-gray-900 mb-6">
      🌐 We Are Serving Across India! 🇮🇳
      </h1>
      <p className="pb-3 text-base font-semibold">We are proud to offer our services in all states across India, covering major cities in each state. Below are some of the key cities where we currently operate:</p>
      <div className="grid md:grid-cols-4 gap-6">
        {Object.entries(serviceAreas).map(([state, cities]) => (
          <div key={state} className="bg-gray-100 p-4 mx-2 rounded-lg shadow">
            <h2 className="text-base md:text:xl font-bold text-gray-700">📍{state}</h2>
            <ul className="text-gray-600">
              {cities.map((city) => (
                <li key={city} className="mt-1 text-sm  font-semibold md:text-base">{city}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
