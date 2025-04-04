import React, { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { useTranslationContext } from "../context/TranslationContext";
import TranslatorText from "./Text";

export function Card2({ Card2img }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      imageUrl: "/Card2.jpeg",
      title: "Financial Growth",
      description: "Track your financial progress"
    },
    {
      id: 2,
      imageUrl: "https://images.pexels.com/photos/6771882/pexels-photo-6771882.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Financial Planning",
      description: "Learn smart budgeting techniques"
    },
    {
      id: 3,
      imageUrl: "https://images.pexels.com/photos/3943727/pexels-photo-3943727.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Investment Strategies",
      description: "Grow your wealth effectively"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-3xl justify-self-end rounded-R-xl relative h-full">
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover rounded-r-xl"
            />
          </div>
        ))}
      </div>
      
      {/* Rectangular indicators at bottom left */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-6 h-2 rounded-sm transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function Card1() {
  const {t} = useTranslationContext();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleGetStarted = () => {
    if (user) {
      navigate("/login/learning");
    } else {
      navigate("/login");
    }
  };
  
  const handleGetStarted_Analysis = () => {
    if (user) {
      navigate("/login/analysis");
    } else {
      navigate("/login");
    }
  };
  
  return (
    <div className="flex bg-white rounded-l-xl">
      <div className="flex flex-col justify-center p-10">
        <div className="mb-10">
          <h1 className="text-[70px] leading-[80px] text-[#0C0D0E] font-[Aeonik TRIAL]">
            <span className="block"><TranslatorText>Learn</TranslatorText>.</span>
            <span className="block"><TranslatorText>Apply</TranslatorText>.</span>
            <span className="block"><TranslatorText>Grow</TranslatorText>.</span>
          </h1>
          <p className="mt-4 max-w-3xl text-[20px] leading-[30px] tracking-[0.12px] text-[#667085] font-[Aeonik TRIAL]">
            <TranslatorText>Empower yourself with financial knowledge that goes beyond theory.
              Learn practical strategies, analyze opportunities, and make informed
              decisions to maximize your growth.</TranslatorText>
          </p>
        </div>

        <div className="flex gap-4 mb-10">
          <button 
            className="hover:bg-gray-400 flex h-[56px] px-[24px] py-[12px] font-[Aeonik TRIAL] justify-center items-center gap-[8px] rounded-full bg-[#0C0D0E] text-white" 
            onClick={handleGetStarted}
          >
            <TranslatorText>Get Started Now</TranslatorText> 
          </button>
          <button 
            className="flex h-[56px] px-[24px] py-[12px] justify-center items-center gap-[8px] font-[Aeonik TRIAL] rounded-full border border-[#E8E8E8] bg-[#F4F4F4] text-[#0C0D0E] text-[16px] leading-[24px] hover:bg-gray-400" 
            onClick={handleGetStarted_Analysis}
          >
            <TranslatorText>Analysis Portfolio</TranslatorText>  
          </button>
        </div>

        <div className="flex gap-10">
          <div className="text-center">
            <h3 className="text-[48px] leading-[56px] font-[Aeonik TRIAL] text-black"><TranslatorText>20+</TranslatorText></h3>
            <p className="text-[16px] font-[Aeonik TRIAL] leading-[24px] text-[#667085]"><TranslatorText>Comprehensive Financial Courses</TranslatorText></p>
          </div>
          <div className="text-center">
            <h3 className="text-[48px] leading-[56px] font-[Aeonik TRIAL] text-black">4K+</h3>
            <p className="text-[16px] font-[Aeonik TRIAL] leading-[24px] text-[#667085]"><TranslatorText>Learners Growing Their Wealth</TranslatorText></p>
          </div>
        </div>
      </div>
    </div>
  );
}

const FinancialCard = () => {
  return (
    <div className="flex h-[500px] items-center">  
      <div className="p-25"></div>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-[400px] h-[400px] font-[Aeonik TRIAL]">
        <h3 className="text-gray-500 text-2xl"><TranslatorText>Your Balance</TranslatorText></h3>
        <p className="text-3xl font-bold text-black">$625,00</p>
        <div className="flex gap-2 mt-4">
          <button className="bg-[#E3F8F1] text-[#38A169] px-4 py-1 rounded-full text-2xl">
            <TranslatorText>Request</TranslatorText>  
          </button>
          <button className="bg-[#E3F8F1] text-[#38A169] px-4 py-1 rounded-full text-2xl">
            <TranslatorText>Transfer</TranslatorText> 
          </button>
        </div>
        <div className="mt-6">
          <h4 className="text-gray-500 text-2xl"><TranslatorText>Transactions</TranslatorText></h4>
          <div className="flex justify-between mt-2 text-2xl">
            <div>
              <p className="font-medium"><TranslatorText>Upwork</TranslatorText></p>
              <p className="text-gray-400"><TranslatorText>Work • 15 Feb</TranslatorText></p>
            </div>
            <p className="text-red-500">- $10.00</p>
          </div>
          <div className="flex justify-between mt-2 text-2xl">
            <div>
              <p className="font-medium"><TranslatorText>Parent</TranslatorText></p>
              <p className="text-gray-400"><TranslatorText>Receive • 16 Feb</TranslatorText></p>
            </div>
            <p className="text-green-500">+ $100.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FinancialInfo = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleGetStarted = () => {
    if (user) {
      navigate("/login/learning");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-150 rounded-2xl bg-white flex-wrap">
      <h2 className="text-customBlack font-aeonik text-[64px] not-italic font-normal leading-[80px]">
        <TranslatorText>Your Personalized Path to Financial Freedom</TranslatorText>   
      </h2>
      <p className="font-aeonik text-[20px] not-italic font-normal leading-[30px] tracking-tightest text-[#667085]">
        <TranslatorText>Make informed financial decisions with a structured learning approach
          that empowers you to grow your wealth.</TranslatorText> 
      </p>
      <br />
      <button 
        className="flex h-[56px] px-[24px] py-[12px] justify-center items-center gap-[8px] rounded-full border border-[#E8E8E8] bg-[#F4F4F4] text-[#0C0D0E] font-[Aeonik TRIAL] text-[16px] not-italic font-normal leading-[24px] hover:bg-gray-400" 
        onClick={handleGetStarted}
      >
        <TranslatorText>Start Learning</TranslatorText>
      </button>
    </div>
  );
};

const FinancialInfo2 = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleGetStarted_Analysis = () => {
    if (user) {
      navigate("/login/analysis");
    } else {
      navigate("/login");
    }
  };
  
  return (
    <div className="w-170 px-10 rounded-2xl bg-white flex-wrap">
      <h2 className="text-customBlack font-aeonik text-[64px] not-italic font-normal leading-[80px]">
        <TranslatorText>Get Analysis of Your Portfolio</TranslatorText>  
      </h2>
      <p className="font-aeonik text-[20px] not-italic font-normal leading-[30px] tracking-tightest text-[#667085]">
        <TranslatorText>Casbank provides reliable financial services for various business needs powered by the latest AI. We are pioneers in this service field, and the best among others.</TranslatorText>  
      </p>
      <br />
      <button 
        className="flex h-[56px] px-[24px] py-[12px] justify-center items-center gap-[8px] rounded-full border border-[#E8E8E8] bg-[#F4F4F4] text-[#0C0D0E] font-[Aeonik TRIAL] text-[16px] not-italic font-normal leading-[24px] hover:bg-gray-400" 
        onClick={handleGetStarted_Analysis}
      >
        <TranslatorText>Analyse Portfolio</TranslatorText>
      </button>
    </div>
  );
};

export function FinancialSection1() {
  return (
    <div className="flex rounded-2xl items-center gap-49 bg-white">
      <FinancialCard />
      <FinancialInfo />
    </div>
  );
};

export function FinancialSection2() {
  return (
    <div className="flex rounded-2xl items-center gap-5 bg-white">
      <FinancialInfo2 />
      <FinancialCard />
    </div>
  );
};