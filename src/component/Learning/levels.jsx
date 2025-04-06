import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslationContext } from '../../context/TranslationContext';
import TranslatorText from '../Text';
import Navbar from "../navbarModule";
import DashboardLayout from "../DashboardLayout";
import { Chatbot } from '../ChatBot';

export function LevelApp() {
    const { t } = useTranslationContext();
    const [activeSection, setActiveSection] = useState(t("Learning Hub"));
    const [levelData, setLevelData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const location = useLocation();
    const navigate = useNavigate();

    // Memoize the levelId to prevent unnecessary fetches
    const levelId = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return params.get("levelId");
    }, [location.search]);

    // Memoize the fetch function
    const fetchLevelData = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/levels/1/${levelId}`);
            if (!response.ok) {
                throw new Error(t(`HTTP error! status: ${response.status}`));
            }
            const result = await response.json();
            
            // Store raw data and we'll translate when rendering
            setLevelData(result.levels || []);
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [levelId, t]);

    useEffect(() => {
        if (levelId) {
            fetchLevelData();
        }
    }, [levelId, fetchLevelData]);

    // Memoize the embed URL to prevent re-rendering the iframe unnecessarily
    const getEmbedUrl = useCallback((youtubeUrl) => {
        if (!youtubeUrl) return '';
        if (youtubeUrl.includes("youtu.be")) {
            return youtubeUrl.replace("youtu.be/", "www.youtube.com/embed/");
        }
        if (youtubeUrl.includes("watch?v=")) {
            return youtubeUrl.replace("watch?v=", "embed/");
        }
        return youtubeUrl;
    }, []);

    // Memoized Level component to prevent unnecessary re-renders
    const Level = useMemo(() => {
        return function({ levelData }) {
            if (loading) return <div><TranslatorText>Loading...</TranslatorText></div>;
            if (error) return <div><TranslatorText>Error:</TranslatorText> {error}</div>;
            if (!levelData.length) return <div><TranslatorText>No data found</TranslatorText></div>;

            const level = levelData[0];
            const embedUrl = getEmbedUrl(level.Level_YoutubeLink);
            console.log(level)
            return (
                <div className="w-full text-black font-aeonik text-[20px] font-light leading-normal">
                    <div className="text-sm text-gray-500 mb-2">
                        <TranslatorText>{level.Level_topic}</TranslatorText>
                    </div>
                    <div className="w-full bg-white rounded-full h-2.5 mb-4">
                        <div className="bg-yellow-200 h-2.5 rounded-full" style={{ width: `12%` }}></div>
                    </div>
                    <div className="text-xl font-bold mb-4">
                        {t(`Level ${level.Level_no} - Watch Video`, { level: level.Level_no })}
                    </div>
                    <div className='flex w-full h-4xl justify-center'>
                        <div className="mb-4 h-130">
                            {/* Key prop ensures iframe only re-renders when URL actually changes */}
                            <iframe 
                                key={embedUrl}
                                className="w-275 h-130 rounded-lg" 
                                src={embedUrl} 
                                frameBorder="0" 
                                allowFullScreen
                                title={t("Educational Video")}
                            />
                        </div>
                    </div>
                    <div className="text-xl font-bold mb-2">
                        <TranslatorText>Read Documentation</TranslatorText>
                    </div>
                    <div className="text-sm text-gray-700 mb-4">
                        {t(level.Level_Content)}
                    </div>
                    <div className="flex justify-center items-center">
                        <button 
                            className="w-full max-w-[426px] h-[64px] px-6 py-3 bg-black text-white rounded-full" 
                            onClick={() => navigate('/login/learning/module/practice')}
                        >
                            <TranslatorText>Practice</TranslatorText>
                        </button>
                    </div>
                </div>
            );
        };
    }, [loading, error, getEmbedUrl, navigate, t]);

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden overflow-y-auto">
            <Navbar />
            <div className="flex flex-1  overflow-y-auto">
                <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
                    <div className="text-justify mx-auto p-5 overflow-hidden">
                        <Level levelData={levelData} />
                        <Chatbot />
                    </div>
                </DashboardLayout>
            </div>
        </div>
    );
}