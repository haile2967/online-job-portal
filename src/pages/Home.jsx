import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBriefcase, FaUserTie, FaBuilding, FaChartLine, FaUsers, 
  FaUserCheck, FaFileAlt, FaBell, FaClipboardCheck, FaUserFriends } from "react-icons/fa";
import { initScrollAnimation } from "../utils/scrollAnimation";
import heroBg from "../assets/job-search.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobseekers');

  useEffect(() => {
    initScrollAnimation();
  }, []);

  const handlePostJobClick = () => {
    navigate('/register', { state: { role: 'company' } });
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat text-white overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Dark overlay to remove blue and make text pop */}
        <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Find Your <span className="text-blue-400">Dream Job</span> Today
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto lg:mx-0">
              Connecting top talent with the best opportunities. Whether you're looking for your next career move or the perfect candidate, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/jobs" className="px-8 py-4 text-lg font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg shadow-blue-600/30 transition-all duration-300">
                Find Jobs
              </Link>
              <button onClick={handlePostJobClick} className="px-8 py-4 text-lg font-semibold rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 hover:shadow-lg transition-all duration-300">
                Post a Job
              </button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Team Collaboration" 
              className="rounded-2xl shadow-2xl border-4 border-white/20 transform hover:-translate-y-2 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose MyJob Portal?</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-16 rounded"></div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-100 transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FaSearch className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Job Search</h3>
              <p className="text-gray-600">Find the perfect job match with our advanced search algorithms and personalized recommendations.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-100 transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FaBriefcase className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Companies</h3>
              <p className="text-gray-600">Connect with trusted employers and apply to 100% verified job listings with confidence.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-100 transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FaUserTie className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Career Growth</h3>
              <p className="text-gray-600">Access exclusive resources, salary insights, and tools to advance your professional career.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded"></div>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-white p-1 rounded-xl shadow-sm inline-flex border border-gray-200">
              <button 
                className={`px-8 py-3 rounded-lg font-medium transition-all ${activeTab === 'jobseekers' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('jobseekers')}
              >
                For Job Seekers
              </button>
              <button 
                className={`px-8 py-3 rounded-lg font-medium transition-all ${activeTab === 'companies' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('companies')}
              >
                For Companies
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 transition-all duration-500 hover:shadow-2xl">
            {activeTab === 'jobseekers' ? (
              <div className="space-y-12 animate-fade-in-up">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center"><span className="w-8 h-1 bg-blue-600 mr-4 rounded"></span>Job Search & Application</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <ServiceCard icon={<FaSearch />} title="Smart Search" desc="Advanced search filters and personalized job recommendations." />
                    <ServiceCard icon={<FaFileAlt />} title="Easy Applications" desc="One-click apply and complete resume management system." />
                    <ServiceCard icon={<FaBell />} title="Job Alerts" desc="Get instantly notified about new opportunities matching your profile." />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center"><span className="w-8 h-1 bg-blue-600 mr-4 rounded"></span>Career Development</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <ServiceCard icon={<FaUserTie />} title="Profile Enhancement" desc="Professional profile optimization and increased visibility." />
                    <ServiceCard icon={<FaChartLine />} title="Career Insights" desc="Market trends and salary insights for better decisions." />
                    <ServiceCard icon={<FaUserCheck />} title="Skill Assessment" desc="Evaluate and showcase your professional skills to employers." />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-12 animate-fade-in-up">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center"><span className="w-8 h-1 bg-blue-600 mr-4 rounded"></span>Recruitment Solutions</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <ServiceCard icon={<FaBriefcase />} title="Job Posting" desc="Post and manage job listings with advanced tracking features." />
                    <ServiceCard icon={<FaUsers />} title="Candidate Search" desc="Direct access to a large pool of highly qualified candidates." />
                    <ServiceCard icon={<FaClipboardCheck />} title="Application Management" desc="Streamlined process for reviewing and managing applications." />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center"><span className="w-8 h-1 bg-blue-600 mr-4 rounded"></span>Business Tools</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <ServiceCard icon={<FaBuilding />} title="Company Profile" desc="Build and maintain your company's professional brand presence." />
                    <ServiceCard icon={<FaUsers />} title="Team Collaboration" desc="Robust tools for team-based recruitment processes and hiring." />
                    <ServiceCard icon={<FaChartLine />} title="Analytics" desc="Detailed insights on job performance and applicant quality." />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 scroll-reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem icon={<FaUsers />} value="10K+" label="Active Users" />
            <StatItem icon={<FaBuilding />} value="500+" label="Companies" />
            <StatItem icon={<FaBriefcase />} value="1K+" label="Job Listings" />
            <StatItem icon={<FaChartLine />} value="95%" label="Success Rate" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white scroll-reveal">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-10">Join thousands of professionals and companies already using MyJob Portal to achieve their goals.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="px-8 py-4 text-lg font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
              Sign Up Now
            </Link>
            <Link to="/jobs" className="px-8 py-4 text-lg font-bold rounded-xl bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300">
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper Components
const ServiceCard = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md cursor-pointer group border border-transparent hover:border-blue-100">
    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
      <div className="text-xl text-blue-600 group-hover:text-white transition-colors">{icon}</div>
    </div>
    <div>
      <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{title}</h4>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">{desc}</p>
    </div>
  </div>
);

const StatItem = ({ icon, value, label }) => (
  <div className="flex flex-col items-center p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 cursor-default backdrop-blur-sm border border-transparent hover:border-white/20">
    <div className="text-4xl text-blue-300 mb-4 animate-pulse">{icon}</div>
    <div className="text-4xl font-extrabold mb-2 text-white">{value}</div>
    <div className="text-blue-200 font-medium tracking-wide uppercase text-sm">{label}</div>
  </div>
);

export default Home;
