import { useState } from "react";
import { backendAPI } from "../../../API";

const Report = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const response = await fetch(`${backendAPI}/user/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      const result = await response.json();
      console.log(result)
      if(result.message==="User not registered"){
        alert("you are not a GetRefer memeber")
        setSuccess("you are not a GetRefer Memeber please register");
      }
     else if (response.ok) {
        setSuccess("Issue reported successfully!");
        setEmail("");
        setMessage("");
      } else {
        setSuccess("Failed to report issue. Try again.");
      }
    } catch (error) {
        console.error(error)
      setSuccess("Something went wrong. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto pb-5 md:pt-10 pt-6 mt-40 mx-4 mb-4 md:mx-auto md:my-16 px-6 bg-gray-700 shadow-lg rounded-lg self-start">
      <h2 className="text-2xl text-white font-semibold mb-4">Report an Issue</h2>
      <form onSubmit={handleSubmit}  className="space-y-4">
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Describe the issue"
          className="w-full p-2 border rounded h-32"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {success && <p className="text-center text-white text-sm mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default Report;
