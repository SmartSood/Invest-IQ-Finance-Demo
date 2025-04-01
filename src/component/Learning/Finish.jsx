
import React, { useEffect, useState } from "react";
import Navbar from "../navbarModule";
import DashboardLayout from "../DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Chatbot } from "../ChatBot";
import { useTranslationContext } from '../../context/TranslationContext';
import TranslatorText from '../Text';

function Finish() {
    const { t } = useTranslationContext();
    const [data, setData] = useState({
        level: 1,
        totalXPs: 200,
        dailyStreak: 20,
        progress: 12,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        documentation: t("This is a sample documentation text. Replace this with actual documentation content from JSON.")
    });

    useEffect(() => {
        // Fetch actual data from an API if needed
    }, [t]); // Add t to dependencies to retranslate if language changes
    
    const navigate = useNavigate();

    return (
        <div className="w-full text-black text-[18px] font-light font-[Aeonik_TRIAL] leading-normal tracking-wide p-6 bg-gray-50 rounded-lg shadow-md">
            {/* Title */}
            <div className="text-sm text-gray-500 mb-2 py-5">
                <TranslatorText>SPENDING WISELY</TranslatorText>
            </div>
            
            {/* Progress Bar */}
            <div className="pb-5">
                <div className="w-full bg-gray-200 rounded-full h-5 mb-6">
                    <div 
                        className="bg-yellow-400 h-5 rounded-full transition-all" 
                        style={{ width: `${data.progress}%` }}>
                    </div>
                </div>
            </div>
            
            <div className="bg-white h-[650px] pt-5">
                {/* Level Completed */}
                <br />
                <div className="text-xl font-bold text-center mb-6 text-[40px]">
                    <TranslatorText>Level {data.level} Completed!</TranslatorText>
                </div>
                <br />
                
                <div className="flex justify-center gap-x-40 mb-20">
                    <div className="flex justify-center space-x-40">
                        {/* XP Box */}
                        <div className="bg-gray-100 rounded-lg shadow-sm w-[280px] h-[280px] text-center">
                            <div className="bg-gray-300 text-gray-600 text-sm h-[50px] w-[280px] rounded-t-lg flex items-center justify-center">
                                <TranslatorText>Total XPs Earned</TranslatorText>
                            </div>
                            <div className="text-4xl font-bold py-4">
                                {data.totalXPs}
                            </div>
                        </div>

                        {/* Streak Box */}
                        <div className="bg-gray-100 rounded-lg shadow-sm w-[280px] h-[280px] text-center">
                            <div className="bg-gray-300 text-gray-600 text-sm h-[50px] w-[280px] rounded-t-lg flex items-center justify-center">
                                <TranslatorText>Daily Streak</TranslatorText>
                            </div>
                            <div className="text-4xl font-bold py-4">
                                {data.dailyStreak}
                            </div>
                        </div>
                    </div>
                </div>
                
                <br />
                
                <div className="text-center">
                    <button 
                        className="px-12 py-4 bg-black text-white rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
                        style={{
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                        onClick={() => {
                            navigate("/login/learning/module/finish");
                        }}
                    >
                        <TranslatorText>Next Level</TranslatorText>
                    </button>
                </div>
            </div>
        </div>
    );
}

export function LevelFinishApp() {
    const { t } = useTranslationContext();
    const [activeSection, setActiveSection] = useState(t("Learning Hub"));

    return (
        <div>
            <Navbar />
            <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
                <Finish />
                <Chatbot />
            </DashboardLayout>
        </div>
    );
}
