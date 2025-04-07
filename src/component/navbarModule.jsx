import React, { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SlideSensex } from './SlideSensex';
import TranslatorText from './Text';
import bar from '../assets/bar.jpg';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useXp } from "../context/XpContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { xp: fireCount, badges: badgeCount,setXp: setFireCount,setBadges: setBadgeCount } = useXp()
  const { user, logout } = useAuth();
  const location = useLocation();


  const showStats = location.pathname === '/login/learning/my_modules';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userid=localStorage.getItem("userId")
        if (user && userid) {
          const response = await axios.get(`https://invest-iq-finance-demo-1.onrender.com/api/users/${userid}`);
          const userData = response.data;
          // Set XP count (assuming 'xp' field exists in user data)
          setFireCount(userData.badges?.length|| 0);
          
          // Set badge count (assuming 'badges' array exists in user data)
          setBadgeCount( userData.xp ||0);
         
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback to 0 if there's an error
        setFireCount(0);
        setBadgeCount(0);
      }
    };

    fetchUserData();
    
    // Optional: Set up real-time updates with WebSocket or polling
    const interval = setInterval(fetchUserData, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [user]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="h-[px]">
      <br />
      <br />
      <br />
      {(location.pathname.startsWith('/login/learning')) ? <div/> : 
        <div className="bg-gray-100 max-h-screen">
          <SlideSensex></SlideSensex>
        </div>
      }
     
      <div className="fixed top-0 left-0 w-full bg-white z-50 flex items-center justify-between p-4 border-b border-gray-200 h-[px] shadow-md">
        <div className="flex items-center">
          <button onClick={toggleMenu}>
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
          </button>
          <img 
            src={bar} 
            alt="InvestIQ logo" 
            className="ml-2 h-6 w-auto" 
          />
          <span className="ml-2 text-2xl font-bold" onClick={() => { navigate("/") }}>InvestIQ</span>
        </div>
        {showStats && (
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <img
              src="/Group 1.png"
              alt="Fire icon"
              className="w-6 h-6"
            />
            <span className="ml-1 text-xl">{fireCount}</span>
          </div>
          <div className="flex items-center">
            <img
              src="/Design Wizard Badges.png"
              alt="Badge icon"
              className="w-6 h-6"
            />
            <span className="ml-1 text-xl">{0}</span>
          </div>
        </div>
      )}
        {user && (
          <button onClick={() => { logout(); navigate("/") }}>
            <TranslatorText>Logout</TranslatorText>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;