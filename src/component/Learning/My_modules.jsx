import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from "../navbarModule";
import DashboardLayout from "../DashboardLayout";
import { useTranslationContext } from '../../context/TranslationContext';
import TranslatorText from "../Text";
import { useXp } from '../../context/XpContext';
import { Chatbot } from '../ChatBot';
const My_modules = () => {
  const { t } = useTranslationContext();
  const navigate = useNavigate();
  const [myModules, setMyModules] = useState([]);
  const [lockedModules, setLockedModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { xp, setXp, badges, setBadges } = useXp();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(t("Learning Hub"));
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('userId');
        const [allModulesRes, userDataRes] = await Promise.all([
          axios.get('http://localhost:5001/api/modules'),
          axios.get(`http://localhost:5001/api/users/${userId}`)
        ]);
        const allModules = allModulesRes.data;
        const userData = userDataRes.data;
        setXp(userData.xp || 0);

        const unlocked = allModules.filter(module =>
          userData.unlockedModules?.includes(module.moduleNumber)
        ).sort((a, b) => a.moduleNumber - b.moduleNumber);

        const locked = allModules.filter(module =>
          !userData.unlockedModules?.includes(module.moduleNumber)
        ).sort((a, b) => a.moduleNumber - b.moduleNumber);

        setMyModules(unlocked.map(module => {
          const moduleProgress = userData.moduleProgress?.[module.moduleNumber.toString()] || {};
          return {
            ...module,
            Module_no: module.moduleNumber,
            Module_Name: module.title,
            Module_heading: module.description,
            Level_image: module.imageUrl,
            completedCount: moduleProgress.completedLevels?.length || 0,
            totalCount: module.totalLevels || 10
          };
        }));

        setLockedModules(locked.map(module => ({
          ...module,
          Module_no: module.moduleNumber,
          Module_Name: module.title,
          Module_heading: module.description,
          Level_image: module.imageUrl,
          totalLevels: module.totalLevels || 10
        })));
        localStorage.setItem("xp",userData.xp||0);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const unlockModule = async (moduleId) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post('http://localhost:5001/api/users/unlock-module', {
        userId,
        moduleId,
        xpCost: 100
      });

      const moduleToUnlock = lockedModules.find(m => m.Module_no === moduleId);
      if (moduleToUnlock) {
        setMyModules(prev => [
          ...prev,
          {
            ...moduleToUnlock,
            completedCount: 0,
            totalCount: moduleToUnlock.totalLevels || 10
          }
        ].sort((a, b) => a.Module_no - b.Module_no));

        setLockedModules(prev => prev.filter(m => m.Module_no !== moduleId));
        setXp(response.data.newXp);
setBadges(response.data.badges?.length || 0);
        toast.success(`Module unlocked successfully!`);
      }
    } catch (err) {
      console.error("Failed to unlock module:", err);
      toast.error(err.response?.data?.message || "Failed to unlock module");
    }
  };









  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex">
        <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}/>
          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="animate-pulse space-y-6">
                <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md p-6 h-64">
                      <div className="h-32 bg-gray-300 rounded mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-300 rounded w-full mb-4"></div>
                      <div className="h-10 bg-gray-300 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex">
        <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}/>
          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto bg-red-100 border-l-4 border-red-500 p-4">
              <p className="text-red-700">
                <TranslatorText translationKey="errorMessage">Error:</TranslatorText> {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
      <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}/>
        <div className="flex-1 p-4 md:p-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* My Modules Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                <TranslatorText translationKey="myModules">My Modules</TranslatorText>
              </h2>
              {myModules.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-600">
                    <TranslatorText translationKey="noModulesStarted">
                      You haven't started any modules yet.
                    </TranslatorText>
                  </p>
                </div>
              ) : (
                <div        className="flex overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarGutter: 'stable',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  gap: '1rem'
                }}>
                  {myModules.map((module) => (
                    <div 
                      key={`my-module-${module.Module_no}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-[411px] h-[430px]"
                    >
                      {/* <div className="h-40 bg-gray-200 h- overflow-hidden flex items-center justify-center">
                        {module.Level_image ? (
                          <img 
                            src={module.Level_image} 
                            alt={module.Module_Name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-500 text-center p-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="mt-2">
                              <TranslatorText translationKey="moduleImage">Module Image</TranslatorText>
                            </p>
                          </div>
                        )}
                      </div> */}
                                              <div className="relative h-[242px] bg-gray-200 overflow-hidden">
  {module.Level_image ? (
    <>
      <img 
        src={module.Level_image} 
        alt={module.Module_Name}
        className="w-full h-full object-cover"
      />
      {/* Overlayed text without background */}
      <div className="absolute bottom-2 left-2 z-10">
        <h3 className="text-lg font-semibold text-white drop-shadow-md">
          <TranslatorText translationKey={`moduleTitle_${module.Module_no}`}>
            {module.Module_Name}
          </TranslatorText>
        </h3>
      </div>
    </>
  ) : (
    <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
      <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <p className="mt-1 text-sm text-center">
        <TranslatorText translationKey="lockedModule">Locked Module</TranslatorText>
      </p>
    </div>
  )}
</div>
                      <div className="p-6">
                  
                        <div className="mb-4">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-yellow-600 h-2.5 rounded-full" 
                              style={{ width: `${(module.completedCount / module.totalCount) * 100}%` }}
                            />
                          </div>
                          <div className='h-[12px]'></div>
                          <p className="text-sm text-gray-600 mt-2">
                            {module.completedCount} <TranslatorText translationKey="outOf">out of</TranslatorText> {module.totalCount}{' '}
                            <TranslatorText translationKey="levelsCompleted">levels completed</TranslatorText>
                          </p>
                        </div>
                        <div className='h-[33px]'></div>
                        <div className='flex justify-center'>
                        <button 
                         className={`w-[214px] h-[44px] px-3 py-2 rounded-[43.202px] border bg-white text-black  transition-colors justify-end duration-300 
                        
                             hover:bg-gray-200
               
                        }`}
                          onClick={() => navigate(`/login/learning/my_modules/about/${module.Module_no}`)}
                        >
                          <TranslatorText translationKey="continueButton">Continue</TranslatorText>
                        </button>
                        </div>
               
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Locked Modules Section */}
            {lockedModules.length > 0 && (
              <div className="mb-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  <TranslatorText translationKey="availableModules">Available Modules</TranslatorText>
                </h2>
                <div className="relative">
             
                  
                  <div 
                    ref={containerRef}
                    className="flex overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarGutter: 'stable',
                      paddingLeft: '1rem',
                      paddingRight: '1rem',
                      gap: '1rem'
                    }}
                  >
                    {lockedModules.map((module) => (
                      <div 
                        key={`locked-module-${module.Module_no}`}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-[411px] h-[430px]"
                      >
               
                        <div className="relative h-[242px] bg-gray-200 overflow-hidden">
  {module.Level_image ? (
    <>
      <img 
        src={module.Level_image} 
        alt={module.Module_Name}
        className="w-full h-full object-cover"
      />
      {/* Overlayed text without background */}
      <div className="absolute bottom-2 left-2 z-10">
        <h3 className="text-lg font-semibold text-white drop-shadow-md">
          <TranslatorText translationKey={`moduleTitle_${module.Module_no}`}>
            {module.Module_Name}
          </TranslatorText>
        </h3>
      </div>
    </>
  ) : (
    <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
      <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <p className="mt-1 text-sm text-center">
        <TranslatorText translationKey="lockedModule">Locked Module</TranslatorText>
      </p>
    </div>
  )}
</div>

                        <div className=" ">
                       <div className='h-[22px]'></div>
                          <p className="text-gray-600 text-sm mb-4 px-[26px]  line-clamp-2">
                            <TranslatorText translationKey={`moduleDesc_${module.Module_no}`}>
                              {module.Module_heading}
                            </TranslatorText>
                          </p>
                          <div className='h-[45px]'></div>
                          <div className='flex justify-center'>   
                           <button 
                            className={`w-[214px] h-[44px] px-3 py-2 rounded-[43.202px] border bg-white text-black  transition-colors justify-end duration-300 ${
                              xp >= 100 
                                ? "bg-white text-black hover:bg-gray-200"
                                : "bg-white text-black cursor-not-allowed"
                            }`}
                            onClick={() => unlockModule(module.Module_no)}
                            disabled={xp < 100}
                          >
                            {xp >= 100 ? (
                              <TranslatorText translationKey="unlockWithXP">Unlock (100 XP)</TranslatorText>
                            ) : (
                              <TranslatorText translationKey="needMoreXP">Need {100 - xp} more XP</TranslatorText>
                            )}
                          </button></div>
                      
                        </div>
                      </div>
                    ))}
                  </div>
                  
 
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Chatbot/>
    </div>
  );
};

export default My_modules;