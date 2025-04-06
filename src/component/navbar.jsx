import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useTranslationContext } from '../context/TranslationContext';


const DropdownArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
    <path d="M11.1905 4.4375L7.46985 8.22461L3.73575 4.4375L2.5 5.69531L7.45641 11L12.4263 5.69531L11.1905 4.4375Z" fill="#2E2E27"/>
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const { t, language, changeLanguage } = useTranslationContext();
  const [translatedContent, setTranslatedContent] = useState({
    features: "Features",
    language: "Language",
    about: "About",
    contact: "Contact",
    policies: "Policies",
    analysis: "Analysis",
    education: "Education",
    goToDashboard: "Go to Dashboard",
    getStarted: "Get Started"
  });

  let featuresTimeout = null;
  let languageTimeout = null;

  // Update translations when language changes
  useEffect(() => {
    setTranslatedContent({
      features: t("Features"),
      language: t("Language"),
      about: t("About"),
      contact: t("Contact"),
      policies: t("Policies"),
      analysis: t("Analysis"),
      education: t("Education"),
      goToDashboard: t("Go to Dashboard"),
      getStarted: t("Get Started")
    });

    return () => {
      clearTimeout(featuresTimeout);
      clearTimeout(languageTimeout);
    };
  }, [language, t]);

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handlePoliciesClick = () => {
    navigate('/policies');
  };
  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleMouseEnter = (setOpen, closeOther) => {
    clearTimeout(featuresTimeout);
    clearTimeout(languageTimeout);
    setOpen(true);
    closeOther(false);
  };

  const handleMouseLeave = (setOpen) => {
    clearTimeout(featuresTimeout);
    clearTimeout(languageTimeout);
    setOpen(false);
  };

  const delayedClose = (setOpen) => {
    clearTimeout(featuresTimeout);
    clearTimeout(languageTimeout);
    const timeout = setTimeout(() => {
      setOpen(false);
    }, 200);
    setOpen === setFeaturesOpen ? featuresTimeout = timeout : languageTimeout = timeout;
  };

  const handleGetStarted = () => {
    navigate(user ? "/login/Dashboard" : "/login");
  };

  const handleGetStarted_Analysis = () => {
    navigate(user ? "/login/analysis" : "/login");
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setLanguageOpen(false);
  };

  // Helper function to check if current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center w-full max-w-[px] mx-auto">
      <div className="text-black text-xl font-bold">InvestIQ</div>
      <div className="hidden md:flex space-x-6">
        <div 
          className="relative"
          onMouseEnter={() => handleMouseEnter(setFeaturesOpen, setLanguageOpen)}
          onMouseLeave={() => delayedClose(setFeaturesOpen)}
        >
          <button className="flex items-center space-x-1 hover:text-gray-500">
            <span className={isActive('/login/analysis') || isActive('/login/Dashboard') ? "font-bold" : ""}>{translatedContent.features}</span> <DropdownArrow />
          </button>
          {featuresOpen && (
            <div 
              className="absolute left-0 bg-white shadow-lg mt-2 rounded w-40"
              onMouseEnter={() => handleMouseEnter(setFeaturesOpen, setLanguageOpen)}
              onMouseLeave={() => delayedClose(setFeaturesOpen)}
            >
              <ul className="py-2">
                <li className={`px-4 py-2 hover:bg-gray-100 ${isActive('/login/analysis') ? "font-bold" : ""}`} onClick={handleGetStarted_Analysis}>
                  {translatedContent.analysis}
                </li>
                <li className={`px-4 py-2 hover:bg-gray-100 ${isActive('/login/Dashboard') ? "font-bold" : ""}`} onClick={handleGetStarted}>
                  {translatedContent.education}
                </li>
              </ul>
            </div>
          )}
        </div>

        <div 
          className="relative"
          onMouseEnter={() => handleMouseEnter(setLanguageOpen, setFeaturesOpen)}
          onMouseLeave={() => delayedClose(setLanguageOpen)}
        >
          <button className="flex items-center space-x-1 hover:text-gray-500">
            <span>{translatedContent.language}</span> <DropdownArrow />
          </button>
          {languageOpen && (
            <div 
              className="absolute left-0 bg-white shadow-lg mt-2 rounded w-40 z-50"
              onMouseEnter={() => handleMouseEnter(setLanguageOpen, setFeaturesOpen)}
              onMouseLeave={() => delayedClose(setLanguageOpen)}
            >
              <ul className="py-2">
                <li 
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${language === 'en' ? "font-bold" : ""}`} 
                  onClick={() => handleLanguageChange('en')}
                >
                  English
                </li>
                <li 
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${language === 'es' ? "font-bold" : ""}`} 
                  onClick={() => handleLanguageChange('es')}
                >
                  Español
                </li>
                <li 
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${language === 'fr' ? "font-bold" : ""}`} 
                  onClick={() => handleLanguageChange('fr')}
                >
                  Français
                </li>
                <li 
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${language === 'zh' ? "font-bold" : ""}`} 
                  onClick={() => handleLanguageChange('zh')}
                >
                  中文 (Chinese)
                </li>
                <li 
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${language === 'ja' ? "font-bold" : ""}`} 
                  onClick={() => handleLanguageChange('ja')}
                >
                  日本語 (Japanese)
                </li>
                <li 
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${language === 'ko' ? "font-bold" : ""}`} 
                  onClick={() => handleLanguageChange('ko')}
                >
                  한국어 (Korean)
                </li>
                <li 
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${language === 'ru' ? "font-bold" : ""}`} 
                  onClick={() => handleLanguageChange('ru')}
                >
                  Русский (Russian)
                </li>
                <li 
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${language === 'hi' ? "font-bold" : ""}`} 
                  onClick={() => handleLanguageChange('hi')}
                >
                  हिंदी
                </li>
                <li 
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${language === 'mr' ? "font-bold" : ""}`} 
                  onClick={() => handleLanguageChange('mr')}
                >
                  मराठी
                </li>
                <li 
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${language === 'as' ? "font-bold" : ""}`} 
                  onClick={() => handleLanguageChange('as')}
                >
                  অসমীয়া
                </li>
                <li 
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${language === 'ta' ? "font-bold" : ""}`} 
                  onClick={() => handleLanguageChange('ta')}
                >
                  தமிழ்
                </li>
                <li 
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${language === 'te' ? "font-bold" : ""}`} 
                  onClick={() => handleLanguageChange('te')}
                >
                  తెలుగు
                </li>
                <li 
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${language === 'bn' ? "font-bold" : ""}`} 
                  onClick={() => handleLanguageChange('bn')}
                >
                  বাংলা
                </li>
                <li 
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${language === 'gu' ? "font-bold" : ""}`} 
                  onClick={() => handleLanguageChange('gu')}
                >
                  ગુજરાતી
                </li>
                <li 
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${language === 'pa' ? "font-bold" : ""}`} 
                  onClick={() => handleLanguageChange('pa')}
                >
                  ਪੰਜਾਬੀ
                </li>
              </ul>
            </div>
          )}
        </div>

        <button 
          onClick={handleAboutClick}
          className={`hover:text-gray-500 ${isActive('/about') ? "font-bold" : ""}`}
        >
          {translatedContent.about}
        </button>
        <button 
          onClick={handleContactClick}
          className={`hover:text-gray-500 ${isActive('/contact') ? "font-bold" : ""}`}
        >
          {translatedContent.contact}
        </button>
        <button 
          onClick={handlePoliciesClick}
          className={`hover:text-gray-500 ${isActive('/policies') ? "font-bold" : ""}`}
        >
          {translatedContent.policies}
        </button>
      </div>
      <button 
        className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-500" 
        onClick={handleGetStarted}
      >
        {user ? translatedContent.goToDashboard : translatedContent.getStarted}
      </button>
    </nav>
  );
};

export default Navbar;