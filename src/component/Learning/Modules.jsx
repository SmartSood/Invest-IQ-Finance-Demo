
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chatbot } from "../ChatBot";
import { useTranslationContext } from '../../context/TranslationContext';
import TranslatorText from "../Text";
import axios from 'axios';

const MainContent = () => {
  const { t } = useTranslationContext();
  
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
const [selectedModule, setSelectedModule] = useState(null);
const [isSignupFlow, setIsSignupFlow] = useState(false);
const [error, setError] = useState(null);
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/modules');
        console.log("API RESPOnSE" ,response)
        setModules(response.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const startModule = (moduleNumber) => {
    navigate(`/login/learning/module/about`);
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-black"><TranslatorText>About Modules</TranslatorText></h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div key={module.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Module Image */}
            <div className="h-48 bg-gray-100 overflow-hidden">
              {module.imageUrl ? (
                <img 
                  src={module.imageUrl} 
                  alt={module.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = '/default-module-image.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            
            {/* Module Content */}
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-gray-800">{<TranslatorText>{module.title}</TranslatorText>}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{<TranslatorText>{module.description}</TranslatorText>}</p>
              <button
                onClick={() => startModule(<TranslatorText>{module.moduleNumber}</TranslatorText>)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
              >
                Select Module
              </button>
            </div>
          </div>
        ))}
      </div>

      <Chatbot />
    </div>
  );
};



export default MainContent;