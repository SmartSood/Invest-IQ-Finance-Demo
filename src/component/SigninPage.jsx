import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useTranslationContext } from '../context/TranslationContext';
import TranslatorText from './Text';


export function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslationContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setLoading(true);
    setError("");

    // Basic validation
    if (!email || !password) {
      setError(t("Please fill in all fields"));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://invest-iq-finance-demo-1.onrender.com/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t("Login failed"));
      }

      // Update auth context and store token
      login(data.token, { email: data.email || email });
      navigate("/login/Dashboard");

    } catch (error) {
      setError(error.message || t("Something went wrong. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg flex w-full max-w-4xl">
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl text-black text-[30px] font-bold mb-6">InvestIQ</h1>
          <h2 className="text-3xl font-bold mb-4"><TranslatorText>Sign In</TranslatorText></h2>
          <p className="text-gray-500 mb-6"><TranslatorText>Kindly fill in your details to sign in</TranslatorText></p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              <TranslatorText>Email Address*</TranslatorText>
            </label>
            <input
              className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder={t("Enter email address")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              <TranslatorText>Password*</TranslatorText>
            </label>
            <input
              className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              placeholder={t("Enter password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <button
            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <TranslatorText>Signing in...</TranslatorText>
              </span>
            ) : (
              <TranslatorText>Sign In</TranslatorText>
            )}
          </button>

          <div className="flex items-center justify-center my-6">
            <hr className="w-full border-gray-300" />
            <span className="px-3 text-gray-500 text-sm"><TranslatorText>OR</TranslatorText></span>
            <hr className="w-full border-gray-300" />
          </div>

          <button
            className="w-full flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
            type="button"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" 
              className="mr-2" 
              width="20" 
              height="20" 
              alt={t("Google Logo")} 
            />
            <TranslatorText>Sign In with Google</TranslatorText>
          </button>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              <TranslatorText>Don't have an account?</TranslatorText>{" "}
              <button 
                className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
                onClick={() => navigate("/login")}
              >
                <TranslatorText>Register</TranslatorText>
              </button>
            </p>
            <p className="mt-2">
              <button 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none"
                onClick={() => navigate("/forgot-password")}
              >
                <TranslatorText>Forgot password?</TranslatorText>
              </button>
            </p>
          </div>
        </div>
        
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-r-lg flex items-center justify-center">
          <div className="text-white p-8 text-center">
            <h3 className="text-2xl font-bold mb-4"><TranslatorText>Welcome Back!</TranslatorText></h3>
            <p className="mb-6"><TranslatorText>Sign in to access your personalized dashboard and continue your financial journey.</TranslatorText></p>
            <div className="flex justify-center">
              <div className="w-16 h-1 bg-white opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}