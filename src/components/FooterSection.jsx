import React from "react";
import {FaTwitter, FaLinkedinIn, FaWhatsapp, FaInstagram } from "react-icons/fa";
const FooterSection = () => {
  return (
    <div className="">
      <footer className="bg-gray-900 py-6  md:py-8 text-white ">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* About Section */}
            <div>
              <h2 className="text-base md:text-lg font-semibold mb-3">
                About Us
              </h2>
              <p className="text-sm text-gray-400">
                Get Reference is a community-powered job referral platform that
                helps job seekers connect with referrers for better career
                opportunities.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className=" text-base md:text-lg font-semibold mb-3">
                Quick Links
              </h2>
              <ul className="space-y-2 text-sm md:text-base ">
                <li>
                  <a
                    href="/faq"
                    target="blank"
                    className="text-gray-400 hover:text-white"
                  >
                    ❓ FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    target="blank"
                    className="text-gray-400 hover:text-white"
                  >
                    📜 Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    target="blank"
                    className="text-gray-400 hover:text-white"
                  >
                    🔒 Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/report-issue"
                    target="blank"
                    className="text-gray-400 hover:text-white"
                  >
                    📩 Report an Issue
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h2 className=" text-base md:text-lg font-semibold mb-3">
                Contact Us
              </h2>
              <p className="text-sm text-gray-400">
                📧 Email: support@getreference.site
              </p>
              <p className="text-sm text-gray-400">
  📞 WhatsApp:  
  <a
    href="https://wa.me/918331003877"
    target="_blank"
    rel="noopener noreferrer"
    className="text-green-500 hover:underline"
  >
    +91 8331003877
  </a>
</p>

            </div>

            {/* Social Media */}
            <div>
              <h2 className="text-base md:text-lg font-semibold mb-3">
                Follow Us
              </h2>
              <div className="flex space-x-4">
                
                <a href="#" className="text-gray-400 hover:text-white text-lg">
                  <FaTwitter />
                </a>
                <a href="https://www.linkedin.com/in/get-reference"   rel="noopener noreferrer" target="_blank" className="text-gray-400 hover:text-white text-lg">
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://wa.me/918331003877"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-lg"
                >
                  <FaWhatsapp />
                </a>

             
                <a
                  href="https://www.instagram.com/getreference.site?igsh=aXRyYmxxbXJiY2V0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-lg"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm">
            © 2025 getreference.site . All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterSection;
