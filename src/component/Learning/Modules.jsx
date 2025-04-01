import React from "react";
import { useNavigate } from "react-router-dom";
import { Chatbot } from "../ChatBot";
import { useTranslationContext } from '../../context/TranslationContext';
import TranslatorText from "../Text";

const MainContent = () => {
  const { t } = useTranslationContext();
  const navigate = useNavigate();

  function StartModule(module_number) {
    navigate("/login/learning/module/about");
  }

  const modules = [
    {
      title: t("Introduction to Stock Market"),
      description: t("Stock market fundamentals"),
      moduleNumber: 1
    },
    {
      title: t("Portfolio Management"),
      description: t("Build your investment portfolio"),
      moduleNumber: 2
    },
    {
      title: t("Risk Assessment"),
      description: t("Understand investment risks"),
      moduleNumber: 3
    },
    {
      title: t("Market Analysis"),
      description: t("Analyze market trends"),
      moduleNumber: 4
    },
    {
      title: t("Retirement Planning"),
      description: t("Long-term investment strategies"),
      moduleNumber: 5
    },
    {
      title: t("Tax Strategies"),
      description: t("Tax-efficient investing"),
      moduleNumber: 6
    },
    {
      title: t("Technical Analysis"),
      description: t("Chart reading techniques"),
      moduleNumber: 7
    },
    {
      title: t("Fundamental Analysis"),
      description: t("Evaluating company finances"),
      moduleNumber: 8
    },
    {
      title: t("Crypto Basics"),
      description: t("Understanding cryptocurrencies"),
      moduleNumber: 9
    }
  ];

  // Split modules into rows of 3 for display
  const rows = [];
  for (let i = 0; i < modules.length; i += 3) {
    rows.push(modules.slice(i, i + 3));
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-black">
        <TranslatorText>My Modules</TranslatorText>
      </h2>
      
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4 mb-4">
          {row.map((module, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm h-40 flex flex-col justify-between w-full max-w-xs">
              <div>
                <h3 className="text-lg font-bold mb-1 text-black">{module.title}</h3>
                <p className="text-sm text-black">{module.description}</p>
              </div>
              <button 
                className="bg-black hover:bg-gray-600 text-white px-3 py-1 rounded text-sm w-full transition-colors duration-200" 
                onClick={() => StartModule(module.moduleNumber)}
              >
                <TranslatorText>Start</TranslatorText>
              </button>
            </div>
          ))}
        </div>
      ))}
      
      <Chatbot/>
    </div>
  );
};

export default MainContent;