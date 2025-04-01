import React, { useState } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {SlideSensex} from './SlideSensex'
import TranslatorText from './Text'
const Navbar = () => {
  const  navigate=useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [fireCount, setFireCount] = useState(0);
  const [badgeCount, setBadgeCount] = useState(0);
  const { user, logout } = useAuth();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
  

<div>
  <br />
  <br />
  <br />
   <div>  <SlideSensex></SlideSensex></div>
 
      { <div className="fixed top-0 left-0 w-full bg-white z-50 flex items-center justify-between p-4 border-b border-gray-200 shadow-md">
    <div className="flex items-center">
      <button onClick={toggleMenu}>
        <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
      </button>
      <span className="ml-2 text-2xl font-bold" onClick={()=>{navigate("/")}}>InvestIQ</span>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <img
          src="/Group 1.png
          "
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
        <span className="ml-1 text-xl">{badgeCount}</span>
      </div>
    </div>
    {user && (
      <button onClick={()=>{logout();
 navigate("/") }}><TranslatorText>Logout</TranslatorText></button>
    )}
  </div> }
  
  </div>
 

    
  );
};

export default Navbar;