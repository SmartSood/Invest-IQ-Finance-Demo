// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslationContext } from '../../context/TranslationContext';
// import TranslatorText from '../Text';
// import Navbar from "../navbarModule";
// import DashboardLayout from "../DashboardLayout";
// import { Chatbot } from "../ChatBot";

// export function AboutModule() {
//   const { t } = useTranslationContext();
//   const [moduleData, setModuleData] = useState({ moduleInfo: null, levels: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const [activeSection, setActiveSection] = useState(t("Learning Hub"));

//   useEffect(() => {
//     const fetchModuleData = async () => {
//       try {
//         const response = await fetch("https://invest-iq-finance-demo-1.onrender.com/api/Module/1");
//         if (!response.ok) {
//           throw new Error(t(`HTTP error! status: ${response.status}`));
//         }
//         const data = await response.json();
//         setModuleData(data);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchModuleData();
//   }, [t]); // Added t to dependencies

//   const handleRowClick = (levelId) => {
//     navigate(`/login/learning/module/level?levelId=${levelId}`);
//   };

//   // Safer translation function with null checks
//   const getTranslatedContent = (data) => {
//     if (!data || !data.moduleInfo) return { moduleInfo: null, levels: [] };
    
//     return {
//       ...data,
//       moduleInfo: {
//         ...data.moduleInfo,
//         Module_name: data.moduleInfo.Module_name ? t(data.moduleInfo.Module_name) : t("Untitled Module"),
//         Module_description: data.moduleInfo.Module_description ? t(data.moduleInfo.Module_description) : t("No description available")
//       },
//       levels: data.levels.map(level => ({
//         ...level,
//         Level_topic: level.Level_topic ? t(level.Level_topic) : t("Untitled Level"),
//         Level_Description: level.Level_Description ? t(level.Level_Description) : t("No description available")
//       }))
//     };
//   };

//   const translatedData = getTranslatedContent(moduleData);

//   if (loading) return (
//     <div className="p-8">
//       <TranslatorText>Loading module data...</TranslatorText>
//     </div>
//   );
  
//   if (error) return (
//     <div className="p-8 text-red-500">
//       <TranslatorText>Error:</TranslatorText> {error}
//     </div>
//   );
  
//   if (!translatedData.moduleInfo) return (
//     <div className="p-8">
//       <TranslatorText>Module not found</TranslatorText>
//     </div>
//   );

//   return (
//     <div className="w-full">
//       <Navbar />
//       <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
//         <div className="bg-white p-10 relative min-h-screen w-full">
//           <div className="absolute inset-0 opacity-5 z-0 overflow-hidden pointer-events-none font-mono text-xs leading-3 text-black whitespace-pre">
//             {Array(100).fill("faliyfcvoy").join("")}
//           </div>

//           <div className="relative z-10 w-full">
//             {/* Module heading - translated */}
//             <div className="flex flex-col justify-center text-black text-lg font-aeonik font-light tracking-[2.7px] mb-8 w-full">
//               {translatedData.moduleInfo.Module_name}
//             </div>

//             {/* About the Module heading */}
//             <div className="flex flex-col justify-center text-black text-3xl font-aeonik font-bold mb-5 w-full">
//               <TranslatorText>About the Module</TranslatorText>
//             </div>

//             {/* Module description - translated */}
//             <div className="mb-10 text-base leading-relaxed w-full">
//               {translatedData.moduleInfo.Module_description}
//             </div>

//             {/* Levels table with translated content */}
//             <div className="w-full overflow-x-auto mb-10">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr>
//                     {[t("Level"), t("Topic"), t("Description"), t("Duration")].map((header) => (
//                       <th key={header} className="p-0">
//                         <div className="w-full h-full py-2.5 px-3 bg-[#EAEAEA] flex items-center gap-2.5 inline-flex">
//                           <div className="text-black text-[14px] font-poppins font-normal tracking-[0.14px]">
//                             {header}
//                           </div>
//                         </div>
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {translatedData.levels.map((level) => (
//                     <tr 
//                       key={level._id}
//                       className="border-b border-gray-200 cursor-pointer hover:bg-gray-100"
//                       onClick={() => handleRowClick(level.Level_no)}
//                     >
//                       <td className="p-3">{level.Level_no}</td>
//                       <td className="p-3">{level.Level_topic}</td>
//                       <td className="p-3">{level.Level_Description}</td>
//                       <td className="p-3">{level.Level_Duration}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <Chatbot />
//           </div>
//         </div>
//       </DashboardLayout>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslationContext } from '../../context/TranslationContext';
import TranslatorText from '../Text';
import Navbar from "../navbarModule";
import DashboardLayout from "../DashboardLayout";
import { Chatbot } from "../ChatBot";

export function AboutModule() {
  const { t } = useTranslationContext();
  const [moduleData, setModuleData] = useState({ moduleInfo: null, levels: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(t("Learning Hub"));
  const { moduleId } = useParams(); // Get moduleId from URL params

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        if (!moduleId) {
          throw new Error("Module ID not provided");
        }
        
        const response = await fetch(`https://invest-iq-finance-demo-1.onrender.com/api/Module/${moduleId}`);
        if (!response.ok) {
          throw new Error(t(`HTTP error! status: ${response.status}`));
        }
        const data = await response.json();
        setModuleData(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [t, moduleId]); // Added moduleId to dependencies

  const handleRowClick = (levelId) => {
    navigate(`/login/learning/module/${moduleId}/level/${levelId}`);
  };

  // Safer translation function with null checks
  const getTranslatedContent = (data) => {
    if (!data || !data.moduleInfo) return { moduleInfo: null, levels: [] };
    
    return {
      ...data,
      moduleInfo: {
        ...data.moduleInfo,
        Module_name: data.moduleInfo.Module_name ? t(data.moduleInfo.Module_name) : t("Untitled Module"),
        Module_description: data.moduleInfo.Module_description ? t(data.moduleInfo.Module_description) : t("No description available")
      },
      levels: data.levels.map(level => ({
        ...level,
        Level_topic: level.Level_topic ? t(level.Level_topic) : t("Untitled Level"),
        Level_Description: level.Level_Description ? t(level.Level_Description) : t("No description available")
      }))
    };
  };

  const translatedData = getTranslatedContent(moduleData);

  if (loading) return (
    <div className="p-8">
      <TranslatorText>Loading module data...</TranslatorText>
    </div>
  );
  
  if (error) return (
    <div className="p-8 text-red-500">
      <TranslatorText>Error:</TranslatorText> {error}
    </div>
  );
  
  if (!translatedData.moduleInfo) return (
    <div className="p-8">
      <TranslatorText>Module not found</TranslatorText>
    </div>
  );

  return (
    <div className="w-full">
      <Navbar />
      <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
        <div className="bg-white p-10 relative min-h-screen w-full">
          <div className="absolute inset-0 opacity-5 z-0 overflow-hidden pointer-events-none font-mono text-xs leading-3 text-black whitespace-pre">
            {Array(100).fill("faliyfcvoy").join("")}
          </div>

          <div className="relative z-10 w-full">
            {/* Module heading - translated */}
            <div className="flex flex-col justify-center text-black text-lg font-aeonik font-light tracking-[2.7px] mb-8 w-full">
              {translatedData.moduleInfo.Module_name}
            </div>

            {/* About the Module heading */}
            <div className="flex flex-col justify-center text-black text-3xl font-aeonik font-bold mb-5 w-full">
              <TranslatorText>My Module</TranslatorText>
            </div>

            {/* Module description - translated */}
            <div className="mb-10 text-base leading-relaxed w-full">
              {translatedData.moduleInfo.Module_description}
            </div>

            {/* Levels table with translated content */}
            <div className="w-full overflow-x-auto mb-10">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {[t("Level"), t("Topic"), t("Description"), t("Duration")].map((header) => (
                      <th key={header} className="p-0">
                        <div className="w-full h-full py-2.5 px-3 bg-[#EAEAEA] flex items-center gap-2.5 inline-flex">
                          <div className="text-black text-[14px] font-poppins font-normal tracking-[0.14px]">
                            {header}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {translatedData.levels.map((level) => (
                    <tr 
                      key={level._id}
                      className="border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleRowClick(level.Level_no)}
                    >
                      <td className="p-3">{level.Level_no}</td>
                      <td className="p-3">{level.Level_topic}</td>
                      <td className="p-3">{level.Level_Description}</td>
                      <td className="p-3">{level.Level_Duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Chatbot />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}