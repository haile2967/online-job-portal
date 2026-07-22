import React from "react";
import { useLocation } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  const location = useLocation();
  const initialRole = location.state?.role || "";

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us to start your journey
          </p>
        </div>
        <RegisterForm initialRole={initialRole} />
      </div>
    </div>
  );
};

export default Register;
