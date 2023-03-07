import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          <div className="w-full max-w-2xl">
            <h2 className="text-3xl font-bold mb-10 text-center text-teal-500">
              Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl">
                <div className="bg-teal-500 h-20 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white text-2xl" />
                  <h3 className="text-lg font-bold ml-4 text-white">Address</h3>
                </div>
                <div className="px-6 py-8">
                  <p className="text-gray-700 mb-2">1234 Main Street</p>
                  <p className="text-gray-700 mb-2">San Francisco, CA 94111</p>
                  <p className="text-gray-700 mb-2">Country</p>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl">
                <div className="bg-teal-500 h-20 flex items-center justify-center">
                  <FaPhone className="text-white text-2xl" />
                  <h3 className="text-lg font-bold ml-4 text-white">Phone</h3>
                </div>
                <div className="px-6 py-8">
                  <p className="text-gray-700 mb-2">+1 (555) 555-5555</p>
                  <p className="text-gray-700 mb-2">+1 (555) 987-6543</p>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl">
                <div className="bg-teal-500 h-20 flex items-center justify-center">
                  <FaEnvelope className="text-white text-2xl" />
                  <h3 className="text-lg font-bold ml-4 text-white">Email</h3>
                </div>
                <div className="px-6 py-8">
                  <p className="text-gray-700 mb-2">info@sizzleslice.com</p>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl">
                <div className="bg-teal-500 h-20 flex items-center justify-center">
                  <FaClock className="text-white text-2xl" />
                  <h3 className="text-lg font-bold ml-4 text-white">
                    Opening Hours
                  </h3>
                </div>
                <div className="px-4 py-14">
                  <p className="text-gray-700 mb-2">
                    Monday - Friday: 11:00am - 10:00pm
                  </p>

                  <p className="text-gray-700 mb-2">
                    Saturday - Sunday: 11:00am - 11:00pm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
