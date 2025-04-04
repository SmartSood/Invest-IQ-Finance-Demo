import React, { useState } from "react";
import Navbar from "../navbarModule";
import DashboardLayout from "../DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useTranslationContext } from '../../context/TranslationContext';
import TranslatorText from "../Text";

function SelectionPage() {
    const { t } = useTranslationContext();
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    const options = [
        {
            title: t("Portfolio Analyzer"),
            description: "",
            image: "https://placehold.co/400x293",
            link: "/login/analysis/portfolioAnalyzer"
        },
        {
            title: t("Trend Analyzer"),
            description: "",
            image: "https://placehold.co/400x293",
            link: "/login/analysis/trendAnalyzer"
        }
    ];

    const handleSelect = (index) => {
        setSelectedOption(index);
        navigate(options[index].link);
    };

    const handleNext = () => {
        if (selectedOption !== null) {
            console.log("Selected option:", options[selectedOption].title);
            // Proceed to next step
        }
    };

    return (
        <div className="w-full h-screen relative bg-gray-100 overflow-y-auto">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[996px] min-h-[606px] bg-white shadow-md rounded-[34px] border border-gray-100 p-10 flex flex-col">
                {/* Title Section */}
                <div className="mb-12">
                    <div className="text-black text-[30px] font-bold font-['Aeonik_TRIAL'] mb-2 break-words">
                        <TranslatorText>What would you like to choose?</TranslatorText>
                    </div>
                    
                </div>

                {/* Options with increased bottom padding */}
                <div className="w-full flex justify-center items-center gap-[114px] mb-16 flex-grow">
                    {options.map((option, index) => (
                        <div 
                            key={index}
                            className={`w-[400px] h-[400px] bg-white rounded-[14px] flex flex-col items-start gap-[11px] cursor-pointer transition-all duration-300
                                ${selectedOption === index ? 'ring-2 ring-black ring-offset-2' : ''}`}
                            onClick={() => handleSelect(index)}
                        >
                            <div className="w-full flex flex-col items-center gap-[31px]">
                                <img 
                                    src={option.image} 
                                    alt={option.title}
                                    className="w-full h-[293px] rounded-t-[14px] object-cover"
                                />
                                <div className="w-full text-center flex flex-col justify-center text-black text-[34px] font-['Aeonik_TRIAL'] font-normal leading-[40px] break-words">
                                    {option.title}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Smaller buttons with proper spacing */}
                <div className="flex justify-end mt-8">
                    <div 
                        className={`max-w-[180px] py-3 px-6 shadow-md rounded-[56px] flex justify-end items-center gap-2 bg-black hover:bg-gray-600 cursor-pointer transition-all duration-300`}
                        onClick={selectedOption !== null ? handleNext : undefined}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="text-center text-white text-base font-normal font-['Aeonik_TRIAL'] leading-5">
                            <TranslatorText>Next step</TranslatorText>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SelectionApp() {
    const { t } = useTranslationContext();
    const [activeSection, setActiveSection] = useState(t("Analysis"));

    return (
        <div>
            <Navbar />
            <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
                <SelectionPage />
            </DashboardLayout>
        </div>
    );
}

export default SelectionApp;