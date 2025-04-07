import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useTranslationContext } from '../context/TranslationContext';
import TranslatorText from './Text';

export default function LoginPage() {
    const { login } = useAuth();
    const { t } = useTranslationContext();
    const navigate = useNavigate();
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("https://invest-iq-finance-demo-1.onrender.com/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, email, password }),
            });
            console.log(response);
            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                login(data.token, { email });
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);
                alert(t("Signup successful!"));
                navigate("/login/learning");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setLoading(false);
            console.log(error)
            setError(t("Something went wrong. Please try again."));
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-md rounded-lg flex w-full max-w-4xl">
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-2xl text-black text-[30px] font-bold mb-6">InvestIQ</h1>
                    <h2 className="text-3xl font-bold mb-4"><TranslatorText>Create an Account</TranslatorText></h2>
                    <p className="text-gray-500 mb-6"><TranslatorText>Kindly fill in your details to create an account</TranslatorText></p>
                    
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                            <TranslatorText>Your Fullname*</TranslatorText>
                        </label>
                        <input
                            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="fullname"
                            type="text"
                            placeholder={t("Enter your name")}
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>

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
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            <TranslatorText>Create Password*</TranslatorText>
                        </label>
                        <input
                            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="password"
                            type="password"
                            placeholder={t("Create a password")}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className="w-full bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleRegister}
                        disabled={loading}
                    >
                        {loading ? t("Signing up...") : t("Register Account")}
                    </button>

                    <p className="text-center text-sm mt-4">
                        <TranslatorText>Already have an account?</TranslatorText>{" "}
                        <span 
                            className="text-blue-600 cursor-pointer" 
                            onClick={() => navigate("/signIn")}
                        >
                            <TranslatorText>Sign In</TranslatorText>
                        </span>
                    </p>
                </div>
                <div className="hidden md:block md:w-1/2 bg-gray-100 rounded-r-lg"></div>
            </div>
        </div>
    );
}