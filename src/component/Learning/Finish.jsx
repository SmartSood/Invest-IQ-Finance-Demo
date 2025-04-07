import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslationContext } from '../../context/TranslationContext';
import Navbar from "../navbarModule";
import DashboardLayout from "../DashboardLayout";
import TranslatorText from '../Text';
import { Chatbot } from "../ChatBot";
import axios from "axios";

function Finish() {
    const { t } = useTranslationContext();
    const { moduleId, levelId } = useParams();
    const navigate = useNavigate();
    
    const [data, setData] = useState({
        level: parseInt(levelId),
        totalXPs: 0,
        dailyStreak: 0,
        progress: 0,
        moduleName: `Module ${moduleId}`,
        isLastLevel: false,
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchUserProgress = async () => {
            try {
                // Get user ID from localStorage
                const userId = localStorage.getItem('userId');
                console.log(userId)
                if (!userId) {
                    throw new Error('User ID not found in localStorage');
                }

                // Fetch user data from API
                const response = await axios.get(`http://localhost:5001/api/users/${userId}`);
                const { xp, moduleProgress, unlockedModules} = response.data;
                console.log(xp)
                console.log(moduleProgress)
                console.log(unlockedModules)
                // Get current module progress
                const currentModule = moduleProgress?.[moduleId] || {
                    completedLevels: []
                };
                const dailyStreak=null;
                // Check if this is the last level (assuming 10 levels per module)
                const isLastLevel = currentModule.completedLevels?.length >= 9;
                
                // Calculate progress percentage
                const progress = currentModule.completedLevels?.length 
                    ? (currentModule.completedLevels.length / 10) * 100 
                    : 0;
                
                // Update local state
                setData({
                    level: parseInt(levelId),
                    totalXPs: xp || 0,
                    dailyStreak: dailyStreak || 0,
                    progress,
                    moduleName: `Module ${moduleId}`,
                    isLastLevel,
                    loading: false,
                    error: null
                });

            } catch (error) {
                console.error("Error fetching user data:", error);
                setData(prev => ({
                    ...prev,
                    loading: false,
                    error: error.message || 'Failed to load user data'
                }));
            }
        };
        
        fetchUserProgress();
    }, [moduleId, levelId, t]);

    if (data.loading) {
        return <div>Loading...</div>;
    }

    if (data.error) {
        return <div>Error: {data.error}</div>;
    }

    return (
        <div className="w-full text-black text-[18px] font-light font-[Aeonik_TRIAL] leading-normal tracking-wide p-6 bg-gray-50 rounded-lg shadow-md">
            {/* Title */}
            <div className="text-sm text-gray-500 mb-2 py-5">
                <TranslatorText>{data.moduleName}</TranslatorText>
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
                            if (data.isLastLevel) {
                                navigate(`/login/learning/module/finish`);
                            } else {
                                navigate(`/login/learning/module/${moduleId}/level/${parseInt(levelId) + 1}`);
                            }
                        }}
                    >
                        <TranslatorText>
                            {data.isLastLevel ? "Finish Module" : "Next Level"}
                        </TranslatorText>
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