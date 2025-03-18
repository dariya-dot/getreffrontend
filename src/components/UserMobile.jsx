import React ,{useState}from 'react'

const UserMobile = () => {
     const [phone, setPhone] = useState("");
     const [mobile,setMobile]=useState(true)
      const[sentotp,setSentotp]=useState(false)
  return (
    <div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-100">
                Mobile Number
              </label>
              <input
                type="number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  setSentotp(true)
                }}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
              <button  className="text-white bg-indigo-500 my-3 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
             Request oTP
              </button>


            </div>
    </div>
  )
}

export default UserMobile
