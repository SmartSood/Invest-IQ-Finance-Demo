import React, { useState } from "react";
import Navbar from "../navbarModule";
import DashboardLayout from "../DashboardLayout";
import { useNavigate } from "react-router-dom";
import TranslatorText from "../Text";
import { useTranslationContext } from '../../context/TranslationContext';

function Questionnaire() {
    const { t } = useTranslationContext();
    const Navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [hasPortfolio, setHasPortfolio] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    const questions = [
        {
            theme: t("Portfolio Status"),
            description: t("Do you already have a portfolio?"),
            options: [
                t("Yes, I already have a portfolio"),
                t("No, I do not have a portfolio")
            ]
        }
    ];

    const handleAnswer = (answer) => {
        setHasPortfolio(answer === 0 ? true : false);
        setAnswers({...answers, [currentQuestion]: answer});
    };

    return (
        <div className="w-full h-[630px] relative bg-gray-100 ">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[996px] h-[606px] bg-white shadow-md rounded-[34px] border border-gray-100 p-10">
                {/* Title Section */}
                <div className="mb-8">
                    <div className="text-black text-3xl font-bold font-['Aeonik_TRIAL'] mb-2">
                        <TranslatorText>Questionnaire</TranslatorText>    
                    </div>
                    <div className="text-black text-2xl font-normal font-['Aeonik_TRIAL']">
                        <TranslatorText>Answer the following to get personalised recommendations.</TranslatorText>
                    </div>
                </div>

                {/* Question Content */}
                <div className="mb-8">
                    <h2 className="text-[#170F49] text-2xl font-bold font-['Aeonik_TRIAL'] leading-[35px] mb-2">
                        {questions[currentQuestion].theme}
                    </h2>
                    <p className="text-[#170F49] text-lg font-normal font-['Aeonik_TRIAL'] leading-5">
                        {questions[currentQuestion].description}
                    </p>
                </div>

                {/* Options */}
                <div className="mb-8">
                    {questions[currentQuestion].options.map((option, index) => (
                        <div 
                            key={index}
                            className={`min-w-[40px] py-[22px] px-5 bg-white shadow-sm rounded-[46px] mb-5 cursor-pointer flex justify-left items-left 
                                ${hasPortfolio === (index === 0) ? 'border border-black' : 'border border-gray-100'}`}
                            onClick={() => handleAnswer(index)}
                        >
                            <div className="text-[#6F6C90] text-lg font-normal font-['Aeonik_TRIAL'] leading-5 text-left">
                                {option}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between absolute bottom-10 left-10 right-10">
                    <button 
                        className="py-5 px-10 bg-white shadow-md rounded-[56px] border border-black text-black text-lg font-normal font-['Aeonik_TRIAL'] leading-5 cursor-pointer transition-all duration-300 hover:bg-gray-100"
                        onClick={() => Navigate("/login/analysis/selection")}
                    >
                        <TranslatorText>Skip Questionnaire</TranslatorText>
                    </button>
                    <div 
                        className={`w-full max-w-[200px] py-5 px-10 shadow-md rounded-[56px] flex justify-center items-center gap-2 bg-black hover:bg-gray-500`}
                        onClick={() => {
                            if (hasPortfolio !== null) {
                                if (hasPortfolio) {
                                    Navigate('/login/analysis/selection');
                                } else {
                                    Navigate('/login/analysis/portfolioAnalyzer');
                                }
                            } else {
                                alert(t("Select an option"));
                            }
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <button className="text-center text-white text-lg font-normal font-['Aeonik_TRIAL'] leading-5">
                            <TranslatorText>Next step</TranslatorText>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function QuestionnaireApp() {
    const { t } = useTranslationContext();
    const [activeSection, setActiveSection] = useState(t("Analysis"));

    return (
        <div>
            <Navbar />
            <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
                <Questionnaire />
            </DashboardLayout>
        </div>
    );
}

export default QuestionnaireApp;