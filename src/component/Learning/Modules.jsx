import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslationContext } from '../../context/TranslationContext';
import TranslatorText from '../Text';
import axios from 'axios';

const MainContent = () => {
  const { t } = useTranslationContext();
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`/api/users/${userId}`);
        if (response.data.firstModuleSelected) {
          navigate('/login/learning/my-modules');
        }
      } catch (error) {
        console.error("Error checking user status:", error);
      }
    };

    const fetchModules = async () => {
      try {
        const response = await axios.get('https://invest-iq-finance-demo-1.onrender.com/api/modules');
        setModules(response.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    checkFirstTimeUser();
    fetchModules();
  }, [navigate]);

  const handleModuleSelect = async (moduleNumber) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.post('https://invest-iq-finance-demo-1.onrender.com/api/users/add-first-module', {
        userId,
        moduleId: moduleNumber
      });
      console.log(userId," ",moduleNumber)
      navigate('/login/learning/my_modules');
    } catch (error) {
      console.error("Error selecting module:", error);
      setError(error.response?.data?.message || "Failed to select module");
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">{t("Choose Your First Module")}</h2>
      <p className="mb-6">You have 100 XP to start. Select your first module below:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div key={module.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-100 overflow-hidden">
              {module.imageUrl ? (
                <img 
                  src={module.imageUrl} 
                  alt={module.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-gray-800">{module.title}</h3>
              <button
                onClick={() => handleModuleSelect(module.moduleNumber)}
                className="w-full bg-black hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors"
              >
                Select Module (100 XP)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;