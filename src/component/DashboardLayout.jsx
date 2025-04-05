
import React from "react";
import { useNavigate } from "react-router-dom";
import Translatortext from './Text'
import home from '../assets/home.jpg'
import Learning from '../assets/Learning.jpg';
import Analysis from '../assets/Analysis.jpg';
export default function  DashboardLayout({ children, activeSection, setActiveSection }) {
  const navigate = useNavigate();

  // Text style for navigation items
  const navItemStyle = {
    color: "#000000",
    fontSize: 24,
    fontFamily: "Aeonik TRIAL",
    fontWeight: "400",
    letterSpacing: 0.48,
    wordWrap: "break-word",
  };

  // Active item style
  const activeItemStyle = {
    ...navItemStyle,
    color: "#000000",
    fontWeight: "500",
    backgroundColor: "#D3D3D3",
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="ml-64  p-5 w-[83%]">
        {/* Sidebar */}
        <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white p-5 shadow-md flex flex-col justify-between">
          <nav className="flex-1">
            <ul className="space-y-4">
              <li
                className="p-2 cursor-pointer rounded-xl hover:bg-gray-100"
                onClick={() => {
                  setActiveSection("Dashboard");
                  navigate("/login/Dashboard");
                }}
                style={activeSection === "Dashboard" ? activeItemStyle : navItemStyle}
              >
                
                <div className="flex items-center space-x-2">
    <img src={home} alt="Home Icon" className="w-6 h-6" />
    <span style={activeSection === "Dashboard" ? activeItemStyle : navItemStyle}>
      <Translatortext>Dashboard</Translatortext>
    </span>
  </div>
              </li>
              <li
                className="p-2 rounded-xl cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setActiveSection("Learning Hub");
                  navigate("/login/learning");
                }}
                style={activeSection === "Learning Hub" ? activeItemStyle : navItemStyle}
              >
          <div className="flex items-center space-x-2">
    <img src={Learning} alt="Learning Icon" className="w-6 h-6" />
    <span style={activeSection === "Learning Hub" ? activeItemStyle : navItemStyle}>
      <Translatortext>Learning Hub</Translatortext>
    </span>
  </div>    
              </li>
              <li
                className="p-2 rounded-xl cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setActiveSection("Analysis");
                  navigate("/login/analysis");
                }}
                style={activeSection === "Analysis" ? activeItemStyle : navItemStyle}
              >
               <div className="flex items-center space-x-2">
    <img src={Analysis} alt="Analysis Icon" className="w-6 h-6" />
    <span style={activeSection === "Analysis" ? activeItemStyle : navItemStyle}>
      <Translatortext>Analysis</Translatortext>
    </span>
  </div>    
              </li>
            </ul>
          </nav>

          {/* Profile Section at the Bottom */}
          <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            <p className="font-medium text-black"><Translatortext>Profile</Translatortext></p>
          </div>
        </aside>

        {/* Main Content Area */}
        {children}
      </div>
    </div>
  );
};


