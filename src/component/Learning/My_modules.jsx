
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from "../navbarModule";
import DashboardLayout from "../DashboardLayout";
import { useTranslationContext } from '../../context/TranslationContext';
import TranslatorText from "../Text";

const My_modules = () => {
  const { t } = useTranslationContext();
  const navigate = useNavigate();
  const [myModules, setMyModules] = useState([]);
  const [lockedModules, setLockedModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Get user ID from auth context or local storage
        const userId = localStorage.getItem('userId');
        
        // Fetch all modules and user's specific data in parallel
        const [allModulesRes, userDataRes] = await Promise.all([
          axios.get('http://localhost:5001/api/modules'),
          axios.get(`http://localhost:5001/api/users/${userId}`)
        ]);

        const allModules = allModulesRes.data;
        const userData = userDataRes.data;
        
        setXp(userData.xp || 0);
        
        // Separate unlocked and locked modules
        const unlocked = allModules.filter(module => 
          userData.unlockedModules?.includes(module.moduleNumber)
        );
        
        const locked = allModules.filter(module => 
          !userData.unlockedModules?.includes(module.moduleNumber)
        );

        setMyModules(unlocked.map(module => {
          const moduleProgress = userData.moduleProgress?.[module.moduleNumber.toString()] || {};
          return {
            ...module,
            Module_no: module.moduleNumber,
            Module_Name: module.title,
            Module_heading: module.description,
            Level_image: module.imageUrl,
            completedCount: moduleProgress.completedLevels?.length || 0,
            totalCount: 10 // Default to 10 if not specified
          };
        }));

        setLockedModules(locked.map(module => ({
          ...module,
          Module_no: module.moduleNumber,
          Module_Name: module.title,
          Module_heading: module.description,
          Level_image: module.imageUrl
        })));
        
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
      
      // Update local state
      const moduleToUnlock = lockedModules.find(m => m.Module_no === moduleId);
      if (moduleToUnlock) {
        setMyModules(prev => [
          ...prev,
          {
            ...moduleToUnlock,
            completedCount: 0,
            totalCount: 10
          }
        ]);
        setLockedModules(prev => prev.filter(m => m.Module_no !== moduleId));
        setXp(response.data.newXp);
        
        // Show success message
        toast.success(`Module unlocked successfully!`);
      }
    } catch (err) {
      console.error("Failed to unlock module:", err);
      toast.error(err.response?.data?.message || "Failed to unlock module");
    }
  };

  // Scroll functions for explore more section
  const scrollLeft = () => {
    const container = document.getElementById('explore-container');
    container.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.getElementById('explore-container');
    container.scrollBy({ left: 300, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex">
          <DashboardLayout />
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
          <DashboardLayout />
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
        <DashboardLayout />
        <div className="flex-1 p-4 md:p-8">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myModules.map((module) => (
                    <div 
                      key={`my-module-${module.Module_no}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="h-40 bg-gray-200 overflow-hidden flex items-center justify-center">
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
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          <TranslatorText translationKey={`moduleTitle_${module.Module_no}`}>
                            {module.Module_Name}
                          </TranslatorText>
                        </h3>
                        <div className="mb-4">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-yellow-600 h-2.5 rounded-full" 
                              style={{ width: `${(module.completedCount / module.totalCount) * 100}%` }}
                            />
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            {module.completedCount} <TranslatorText translationKey="outOf">out of</TranslatorText> {module.totalCount}{' '}
                            <TranslatorText translationKey="levelsCompleted">levels completed</TranslatorText>
                          </p>
                        </div>
                        <button 
                          className="w-full flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300"
                          onClick={() => navigate(`/login/learning/my_modules/about/${module.Module_no}`)}
                        >
                          <TranslatorText translationKey="continueButton">Continue</TranslatorText>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Locked Modules Section */}
            {lockedModules.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  <TranslatorText translationKey="availableModules">Available Modules</TranslatorText>
                </h2>
                <div className="relative">
                  <button 
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-colors duration-300 hidden md:block"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <div 
                    id="explore-container"
                    className="flex space-x-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                  >
                    {lockedModules.map((module) => (
                      <div 
                        key={`locked-module-${module.Module_no}`}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-64 relative"
                      >
                        <div className="h-32 bg-gray-200 overflow-hidden flex items-center justify-center">
                          {module.Level_image ? (
                            <img 
                              src={module.Level_image} 
                              alt={module.Module_Name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-gray-500 text-center p-4">
                              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              <p className="mt-1 text-sm">
                                <TranslatorText translationKey="lockedModule">Locked Module</TranslatorText>
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            <TranslatorText translationKey={`moduleTitle_${module.Module_no}`}>
                              {module.Module_Name}
                            </TranslatorText>
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            <TranslatorText translationKey={`moduleDesc_${module.Module_no}`}>
                              {module.Module_heading}
                            </TranslatorText>
                          </p>
                          <button 
                            className={`w-full px-3 py-2 rounded-md text-sm transition-colors duration-300 ${
                              xp >= 100 
                                ? "bg-black text-white hover:bg-gray-800"
                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                            }`}
                            onClick={() => unlockModule(module.Module_no)}
                            disabled={xp < 100}
                          >
                            {xp >= 100 ? (
                              <TranslatorText translationKey="unlockWithXP">Unlock (100 XP)</TranslatorText>
                            ) : (
                              <TranslatorText translationKey="needMoreXP">Need {100 - xp} more XP</TranslatorText>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-colors duration-300 hidden md:block"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default My_modules;