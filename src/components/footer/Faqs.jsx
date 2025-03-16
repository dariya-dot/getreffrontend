import { useState } from "react";

const faqs = [
  {
    question: "What is getreference.site ?",
    answer: "getreference.site is a community-powered job referral platform that connects job seekers with employees willing to refer them for jobs.",
  },
  {
    question: "How do I sign up?",
    answer: "You can sign up by clicking on the 'Register' button and entering your details. An OTP verification will be required to activate your account.",
  },
  {
    question: "Is this service free?",
    answer: "Yes, currently we are offering our services completely free of charge.",
  },
  {
    question: "How does the referral system work?",
    answer: "Job seekers apply for a referral, and employees (referrers) can choose to refer them to their companies. If hired, referrers may receive incentives.",
  },
  {
    question: "How can I report an issue?",
    answer: "If you encounter any issues, please visit the 'Report an Issue' page and submit your concern. Our support team will assist you.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto mt-14 md:mt-1 py-24 px-5"><br />
      <h1 className="md:text-3xl text-xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
            <button
              className="w-full flex justify-between md:text-lg text-sm items-center text-lg font-semibold text-gray-700 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-gray-500">{openIndex === index ? "▲" : "▼"}</span>
            </button>

            {openIndex === index && (
              <p className="mt-3 text-gray-600  md:text-base text-sm ">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
