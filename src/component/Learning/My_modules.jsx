// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar from "../navbarModule";
// import DashboardLayout from "../DashboardLayout";

// const My_modules = () => {
//   const [myModules, setMyModules] = useState([]);
//   const [exploreMoreModules, setExploreMoreModules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Mock data fetch - replace with actual API calls
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         // Simulate API calls
//         // const myModulesResponse = await axios.get('/api/my-modules');
//         // const exploreResponse = await axios.get('/api/explore-modules');
        
//         // Mock data - in real app this would come from API
//         const mockMyModules = [
//           { 
//             id: 1,
//             title: "JavaScript Basics", 
//             completedCount: 3, 
//             totalCount: 10,
//             image: null // Will come from database
//           },
//           { 
//             id: 2,
//             title: "React Fundamentals", 
//             completedCount: 5, 
//             totalCount: 8,
//             image: null
//           },
//           { 
//             id: 3,
//             title: "Node.js Introduction", 
//             completedCount: 1, 
//             totalCount: 6,
//             image: null
//           },
//         ];
        
//         const mockExploreModules = [
//           { 
//             id: 101,
//             title: "Advanced CSS", 
//             description: "Master modern CSS techniques",
//             image: null
//           },
//           { 
//             id: 102,
//             title: "TypeScript", 
//             description: "Add types to your JavaScript",
//             image: null
//           },
//           { 
//             id: 103,
//             title: "GraphQL", 
//             description: "Modern API query language",
//             image: null
//           },
//           { 
//             id: 104,
//             title: "Docker for Developers", 
//             description: "Containerize your applications",
//             image: null
//           },
//           { 
//             id: 105,
//             title: "AWS Basics", 
//             description: "Introduction to cloud computing",
//             image: null
//           },
//           { 
//             id: 106,
//             title: "Python for Data Science", 
//             description: "Data analysis with Python",
//             image: null
//           },
//         ];
        
//         setMyModules(mockMyModules);
//         setExploreMoreModules(mockExploreModules);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
    
//     fetchData();
//   }, []);

//   // Scroll functions for explore more section
//   const scrollLeft = () => {
//     const container = document.getElementById('explore-container');
//     container.scrollBy({ left: -300, behavior: 'smooth' });
//   };

//   const scrollRight = () => {
//     const container = document.getElementById('explore-container');
//     container.scrollBy({ left: 300, behavior: 'smooth' });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <Navbar />
//         <div className="flex">
//           <DashboardLayout />
//           <div className="flex-1 p-8">
//             <div className="max-w-7xl mx-auto">
//               <div className="animate-pulse space-y-6">
//                 <div className="h-8 bg-gray-300 rounded w-1/4"></div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {[1, 2, 3].map((i) => (
//                     <div key={i} className="bg-white rounded-lg shadow-md p-6 h-64">
//                       <div className="h-32 bg-gray-300 rounded mb-4"></div>
//                       <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
//                       <div className="h-2 bg-gray-300 rounded w-full mb-4"></div>
//                       <div className="h-10 bg-gray-300 rounded"></div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <Navbar />
//         <div className="flex">
//           <DashboardLayout />
//           <div className="flex-1 p-8">
//             <div className="max-w-7xl mx-auto bg-red-100 border-l-4 border-red-500 p-4">
//               <p className="text-red-700">Error: {error}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="flex">
//         <DashboardLayout />
        
//         <div className="flex-1 p-4 md:p-8">
//           <div className="max-w-7xl mx-auto">
//             {/* My Modules Section */}
//             <div className="mb-12">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">My Modules</h2>
//               {myModules.length === 0 ? (
//                 <div className="bg-white rounded-lg shadow-md p-8 text-center">
//                   <p className="text-gray-600">You haven't started any modules yet.</p>
//                   <button className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300">
//                     Browse Modules
//                   </button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {myModules.map((module) => (
//                     <div 
//                       key={`my-module-${module.id}`}
//                       className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//                     >
//                       <div className="h-40 bg-gray-200 overflow-hidden flex items-center justify-center">
//                         {module.image ? (
//                           <img 
//                             src={module.image} 
//                             alt={module.title}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22384%22%20height%3D%22216%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20384%20216%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18a9b9b7b67%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A19pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18a9b9b7b67%22%3E%3Crect%20width%3D%22384%22%20height%3D%22216%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22141.5%22%20y%3D%22117.9%22%3E384x216%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
//                             }}
//                           />
//                         ) : (
//                           <div className="text-gray-500 text-center p-4">
//                             <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                             </svg>
//                             <p className="mt-2">Module Image</p>
//                           </div>
//                         )}
//                       </div>
//                       <div className="p-6">
//                         <h3 className="text-xl font-semibold text-gray-800 mb-2">{module.title}</h3>
//                         <div className="mb-4">
//                           <div className="w-full bg-gray-200 rounded-full h-2.5">
//                             <div 
//                               className="bg-yellow-600 h-2.5 rounded-full" 
//                               style={{ width: `${(module.completedCount / module.totalCount) * 100}%` }}
//                               aria-label={`${Math.round((module.completedCount / module.totalCount) * 100)}% complete`}
//                             ></div>
//                           </div>
//                           <p className="text-sm text-gray-600 mt-2">
//                             {module.completedCount} out of {module.totalCount} levels completed
//                           </p>
//                         </div>
//                         <button 
//                           className="w-full flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300"
//                           aria-label={`Continue ${module.title} module`}
//                         >
//                           Continue
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Explore More Section */}
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore More Modules</h2>
//               <div className="relative">
//                 {exploreMoreModules.length > 0 && (
//                   <>
//                     <button 
//                       onClick={scrollLeft}
//                       className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-colors duration-300 hidden md:block"
//                       aria-label="Scroll left"
//                     >
//                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                       </svg>
//                     </button>
                    
//                     <div 
//                       id="explore-container"
//                       className="flex space-x-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
//                     >
//                       {exploreMoreModules.map((module) => (
//                         <div 
//                           key={`explore-module-${module.id}`}
//                           className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-64"
//                         >
//                           <div className="h-32 bg-gray-200 overflow-hidden flex items-center justify-center">
//                             {module.image ? (
//                               <img 
//                                 src={module.image} 
//                                 alt={module.title}
//                                 className="w-full h-full object-cover"
//                                 onError={(e) => {
//                                   e.target.onerror = null;
//                                   e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22256%22%20height%3D%22128%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20256%20128%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18a9b9b7b6a%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18a9b9b7b6a%22%3E%3Crect%20width%3D%22256%22%20height%3D%22128%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2294.5%22%20y%3D%2267.9%22%3E256x128%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
//                                 }}
//                               />
//                             ) : (
//                               <div className="text-gray-500 text-center p-4">
//                                 <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                 </svg>
//                                 <p className="mt-1 text-sm">Module Image</p>
//                               </div>
//                             )}
//                           </div>
//                           <div className="p-4">
//                             <h3 className="text-lg font-semibold text-gray-800 mb-2">{module.title}</h3>
//                             <p className="text-gray-600 text-sm mb-4 line-clamp-2">{module.description}</p>
//                             <button 
//                               className="w-full px-3 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300 text-sm"
//                               aria-label={`Start ${module.title} module`}
//                             >
//                               Start Module
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
                    
//                     <button 
//                       onClick={scrollRight}
//                       className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-colors duration-300 hidden md:block"
//                       aria-label="Scroll right"
//                     >
//                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                       </svg>
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default My_modules;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../navbarModule";
import DashboardLayout from "../DashboardLayout";
import { useTranslationContext } from '../../context/TranslationContext';
import TranslatorText from "../Text";

const My_modules = () => {
  const { t } = useTranslationContext();
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
          axios.get('/api/modules'),
          axios.get(`/api/users/${userId}`)
        ]);

        const allModules = allModulesRes.data;
        const userData = userDataRes.data;
        
        setXp(userData.xp || 0);
        
        // Separate unlocked and locked modules
        const unlocked = allModules.filter(module => 
          userData.unlockedModules?.includes(module.Module_no)
        );
        
        const locked = allModules.filter(module => 
          !userData.unlockedModules?.includes(module.Module_no)
        );

        setMyModules(unlocked.map(module => ({
          ...module,
          completedCount: userData.moduleProgress?.[module.Module_no]?.completedLevels || 0,
          totalCount: module.levelsCount || 10 // Default to 10 if not specified
        })));

        setLockedModules(locked);
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
      const response = await axios.post('/api/users/unlock-module', {
        userId,
        moduleId,
        xpCost: 100 // Or get this from module data
      });
      
      // Update local state
      setMyModules(prev => [
        ...prev,
        {
          ...lockedModules.find(m => m.Module_no === moduleId),
          completedCount: 0,
          totalCount: 10
        }
      ]);
      setLockedModules(prev => prev.filter(m => m.Module_no !== moduleId));
      setXp(response.data.newXp);
    } catch (err) {
      console.error("Failed to unlock module:", err);
      alert(err.response?.data?.message || "Failed to unlock module");
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
            {/* XP Display */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-md flex items-center">
              <span className="font-bold text-gray-800 mr-2">
                <TranslatorText translationKey="availableXP">Available XP:</TranslatorText>
              </span>
              <span className="text-yellow-600 font-bold">{xp}</span>
            </div>

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
                      key={`my-module-${module._id}`}
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
                          onClick={() => navigate(`/module/${module.Module_no}`)}
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
                        key={`locked-module-${module._id}`}
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