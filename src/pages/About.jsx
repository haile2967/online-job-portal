import React from "react";
import { FaBullseye, FaStar, FaHandshake } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-20 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            About Our Job Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Welcome to <span className="font-bold text-blue-600">MyJob Portal</span> — your bridge between top talent and growing companies. We are committed to connecting skilled job seekers with the right employers using AI-powered recommendations and intuitive design.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <FaBullseye className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To simplify and enhance the hiring process by providing an intelligent, user-friendly platform that supports both applicants and employers.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <FaStar className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span> Smart job matching using AI</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span> Real-time messaging</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span> Profile management</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span> Company dashboards</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span> Advanced search features</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <FaHandshake className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 leading-relaxed">
              Whether you're looking for your first job or a company aiming to hire the best talent, our platform adapts to your needs with a seamless experience.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
