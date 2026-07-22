import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaBuilding } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

const RegisterForm = ({ initialRole = "" }) => {
  const [role, setRole] = useState(initialRole || "jobseeker");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    industry: "",
    resume: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (initialRole) {
      setRole(initialRole);
    }
  }, [initialRole]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        name: formData.name || formData.companyName, // Use companyName as name if role is company and name is empty
        email: formData.email,
        password: formData.password,
        role: role,
        companyName: role === "company" ? formData.companyName : undefined,
        industry: role === "company" ? formData.industry : undefined,
      };

      if (role === "company" && !payload.name) {
        payload.name = formData.companyName;
      }

      const response = await api.post("/auth/register", payload);

      login({
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
        token: response.data.token,
      });

      if (response.data.role === "admin") navigate("/admin/dashboard");
      else if (response.data.role === "company") navigate("/company/dashboard");
      else navigate("/jobseeker/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Role Selector */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setRole("jobseeker")}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
            role === "jobseeker"
              ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
              : "border-gray-200 bg-white text-gray-500 hover:border-blue-200 hover:bg-gray-50"
          }`}
        >
          <FaUserTie className={`text-2xl mb-2 ${role === "jobseeker" ? "text-blue-600" : "text-gray-400"}`} />
          <span className="font-semibold text-sm">Job Seeker</span>
        </button>
        <button
          type="button"
          onClick={() => setRole("company")}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
            role === "company"
              ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
              : "border-gray-200 bg-white text-gray-500 hover:border-blue-200 hover:bg-gray-50"
          }`}
        >
          <FaBuilding className={`text-2xl mb-2 ${role === "company" ? "text-blue-600" : "text-gray-400"}`} />
          <span className="font-semibold text-sm">Company</span>
        </button>
      </div>

      <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
        {/* Common Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {role === "company" ? "Company Email Address" : "Email Address"}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* Role-Specific Fields */}
        {role === "jobseeker" && (
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resume (PDF)</label>
              <input
                type="file"
                name="resume"
                accept=".pdf"
                onChange={handleChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors cursor-pointer"
              />
            </div>
          </div>
        )}

        {role === "company" && (
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Acme Corp"
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="e.g. Technology, Healthcare"
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                required
              />
            </div>
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
