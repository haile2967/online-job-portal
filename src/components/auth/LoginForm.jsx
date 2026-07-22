import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 
import api from "../../api/axios";

const LoginForm = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false); 

  const navigate = useNavigate(); 
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isResetPassword) {
      handleResetPassword(); 
    } else {
      if (!email || !password) {
        setError("Both fields are required!");
        return;
      }

      try {
        setLoading(true);
        setError("");
        
        const response = await api.post("/auth/login", { email, password });
        
        login({
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
          token: response.data.token,
        });

        // Navigate based on role
        if (response.data.role === 'admin') navigate("/admin/dashboard");
        else if (response.data.role === 'company') navigate("/company/dashboard");
        else navigate("/jobseeker/dashboard");
        
      } catch (err) {
        setError(err.response?.data?.message || "Invalid email or password");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResetPassword = () => {
    if (email) {
      setError("");
      alert(`Password reset instructions sent to ${email}`);
      setIsResetPassword(false); 
    } else {
      setError("Please enter your email to reset the password.");
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <div className="mt-1">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
            />
          </div>
        </div>

        {!isResetPassword && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              />
            </div>
          </div>
        )}
      </div>

      {!isResetPassword && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="showPassword" className="ml-2 block text-sm text-gray-900 cursor-pointer">
              Show Password
            </label>
          </div>

          <div className="text-sm">
            <button
              type="button"
              onClick={() => setIsResetPassword(true)}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </button>
          </div>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
        >
          {loading ? "Processing..." : isResetPassword ? "Send Reset Instructions" : "Sign In"}
        </button>
      </div>

      {isResetPassword && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsResetPassword(false)}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Back to Sign In
          </button>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
