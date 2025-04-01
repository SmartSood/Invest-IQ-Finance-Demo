import React, { useState } from "react";
import Navbar from "../navbarModule";
import DashboardLayout from "../DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Chatbot } from "../ChatBot";
import { useTranslationContext } from "../../context/TranslationContext";
import TranslatorText from "../Text";

function FinishModule() {
    const { t } = useTranslationContext();
    const [data, setData] = useState({
        level: 1,
        totalXPs: 200,
        dailyStreak: 20,
        progress: 12,
    });
    const navigate = useNavigate();

    return (
        <div className="w-full p-6 bg-gray-50 min-h-screen">
            {/* Title Section */}
            <div className="text-center py-5">
                <div className="text-sm text-gray-500 mb-2" style={{
                    fontFamily: 'Aeonik TRIAL',
                    fontWeight: 300,
                    letterSpacing: '2.7px'
                }}>
                    <TranslatorText>SPENDING WISELY</TranslatorText>
                </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: `${data.progress}%` }} 
                ></div>
            </div>
            
            {/* Main Content */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
                <h1 className="text-4xl font-bold text-center mb-10">
                    <TranslatorText>Congratulations!</TranslatorText>
                    <br/>
                    <TranslatorText>Module Completed</TranslatorText>
                </h1>
                
                <h3 className="text-black text-[24px] font-normal font-[Aeonik_TRIAL] break-words text-center mb-8">
                    <TranslatorText>Redeem your XP's here</TranslatorText>
                </h3>
                
                {/* Stats Boxes with correct spacing */}
                <div className="flex justify-center gap-x-20 mb-20">
                    <StatBox title={t("Total XPs Earned")} value={data.totalXPs} />
                    <StatBox title={t("Daily Streak")} value={data.dailyStreak} />
                </div>
                
                <div className="text-center">
                    <button 
                        className="px-12 py-4 bg-black text-white rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
                        style={{
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                        onClick={() => {
                            navigate("/login/learning");
                        }}
                    >
                        <TranslatorText>Back To Home</TranslatorText>
                    </button>
                </div>
            </div>
        </div>
    );
}

// Helper component for stat boxes
function StatBox({ title, value }) {
    return (
        <div className="bg-gray-100 rounded-lg shadow-sm w-64 h-64 text-center">
            <div className="bg-gray-300 text-gray-600 text-sm h-12 w-full rounded-t-lg flex items-center justify-center">
                {title}
            </div>
            <div className="text-5xl font-bold py-8">
                {value}
            </div>
        </div>
    );
}

export function LevelFinishApp2() {
    const { t } = useTranslationContext();
    const [activeSection, setActiveSection] = useState(t("Learning Hub"));

    return (
        <div>
            <Navbar />
            <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
                <FinishModule /> 
                <Chatbot />
            </DashboardLayout>
        </div>
    );
}