import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    
    const { moduleId, levelId } = useParams(); // Get both IDs from URL params
    const navigate = useNavigate();

    // Memoize the fetch function
    const fetchLevelData = useCallback(async () => {
        try {
            if (!moduleId || !levelId) {
                throw new Error("Module ID or Level ID not provided");
            }
            
            const response = await fetch(`http://localhost:5001/api/module/${moduleId}/level/${levelId}`);
            if (!response.ok) {
                throw new Error(t(`HTTP error! status: ${response.status}`));
            }
            const result = await response.json();
            
            setLevelData(result.levels || []);
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [moduleId, levelId, t]);

    useEffect(() => {
        fetchLevelData();
    }, [fetchLevelData]);

    const getEmbedUrl = useCallback((youtubeUrl) => {
        if (!youtubeUrl) return '';
      
        // Remove any double quotes from the URL
        youtubeUrl = youtubeUrl.replace(/"/g, '');
      
        if (youtubeUrl.includes("youtu.be")) {
          return youtubeUrl.replace("youtu.be/", "www.youtube.com/embed/");
        }
      
        if (youtubeUrl.includes("watch?v=")) {
          return youtubeUrl.replace("watch?v=", "embed/");
        }
      
        return youtubeUrl;
      }, []);
  

    const Level = useMemo(() => {
        return function({ levelData }) {
            if (loading) return <div><TranslatorText>Loading...</TranslatorText></div>;
            if (error) return <div><TranslatorText>Error:</TranslatorText> {error}</div>;
            if (!levelData.length) return <div><TranslatorText>No data found</TranslatorText></div>;

            const level = levelData[0];
            const embedUrl = getEmbedUrl(level.Level_YoutubeLink);
            
            return (
                <div className="w-full text-black font-aeonik text-[20px] font-light leading-normal">
                    <div className="text-sm text-gray-500 mb-2">
                        <TranslatorText>{level.Level_topic}</TranslatorText>
                    </div>
                    <div className="w-full bg-white rounded-full h-2.5 mb-4">
                        <div className="bg-yellow-200 h-2.5 rounded-full" style={{ width: `${level.Level_no*10}%` }}></div>
                    </div>
                    <div className="text-xl font-bold mb-4">
                        {t(`Level ${level.Level_no} - Watch Video`, { level: level.Level_no })}
                    </div>
                    <div className='flex w-full h-4xl justify-center'>
                        <div className="mb-4 h-130">
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
                            onClick={() => navigate(`/login/learning/module/${moduleId}/level/${levelId}/practice`)}
                        >
                            <TranslatorText>Practice</TranslatorText>
                        </button>
                    </div>
                </div>
            );
        };
    }, [loading, error, getEmbedUrl, navigate, t, moduleId]);

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden overflow-y-auto">
            <Navbar />
            <div className="flex flex-1 overflow-y-auto">
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