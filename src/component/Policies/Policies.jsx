import React from "react";
import { useTranslationContext } from "../../context/TranslationContext";
import TranslatorText from "../Text";
import { FooterPage } from '../LearningEnd';
import Navbar from '../navbar';

export function Policies() {
  const { t } = useTranslationContext();

  const policySections = [
    {
      title: "Privacy Policy",
      content: [
        "InvestIQ is committed to protecting your personal and financial information in compliance with SEBI's data protection guidelines. This policy explains how we collect, use, and safeguard your data when you use our financial education platform and analytical tools.",
        "We collect information you provide when creating an account or using our analytical features (portfolio analyzer and trend analyzer). This may include your name, email, and limited investment data for educational analysis purposes only.",
        "In accordance with SEBI guidelines, all financial data processed by our tools is encrypted and anonymized where possible. We never store sensitive credentials or complete account information.",
        "We implement security measures that exceed basic SEBI requirements, including end-to-end encryption, regular vulnerability assessments, and strict access controls to protect your information."
      ]
    },
    {
      title: "Terms of Service",
      content: [
        "By accessing InvestIQ's platform, you acknowledge that our content is for educational purposes only and does not constitute investment advice as defined by SEBI (Securities and Exchange Board of India) regulations.",
        "Our portfolio analyzer and trend analyzer tools provide generic educational insights based on SEBI-approved methodologies. These tools offer suggestions and hypothetical scenarios, not guaranteed results or accurate predictions of market behavior.",
        "Important: The outputs from our chatbots should be treated as educational advice only. The portfolio analyzer provides allocation suggestions, not definitive portfolio recommendations. The trend analyzer offers perspective on market patterns, not precise forecasts.",
        "You must be at least 18 years old to use our services. You agree to comply with all applicable SEBI regulations when using our analytical tools and not to use them for any illegal or manipulative market activities."
      ]
    },
    {
      title: "Tool Limitations",
      content: [
        "InvestIQ's analytical tools (portfolio analyzer and trend analyzer) are designed for educational exploration only. They do not provide accurate or definitive investment outcomes.",
        "The portfolio analyzer's suggestions are based on general principles of asset allocation and do not account for all individual circumstances or market conditions. Actual portfolio performance may vary significantly.",
        "The trend analyzer identifies potential patterns for educational discussion, not for trading decisions. Market movements are complex and cannot be accurately predicted by our tool.",
        "Users should understand that these tools provide illustrative examples only. We explicitly disclaim any accuracy or reliability in the outputs, as required by SEBI guidelines for educational platforms."
      ]
    },
    {
      title: "Regulatory Compliance",
      content: [
        "InvestIQ operates as a financial education platform and not as a SEBI-registered investment advisor, portfolio manager, or research analyst. Our tools are designed for self-learning only.",
        "We strictly adhere to SEBI's prohibition on guaranteeing returns or making predictive claims. All chatbot outputs include disclaimers stating they are for educational purposes only.",
        "Our educational materials about market trends and portfolio analysis clearly state that they represent possible scenarios, not accurate predictions or results. Actual market behavior may differ substantially.",
        "Users should be aware that SEBI requires verification of all investment advice. Since our chatbots provide educational suggestions only, users should consult SEBI-registered professionals before making actual investment decisions."
      ]
    }
  ];

  return (
    <>
      <Navbar/>
      
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        {/* Main heading */}
        <div className="max-w-6xl mx-auto mb-10">
          <h1 className="text-[64px] font-normal font-['Aeonik_TRIAL'] text-black break-words leading-tight mb-4">
            <TranslatorText>Policies</TranslatorText>
          </h1>
          <p className="text-xl text-[#667085]">
            <TranslatorText>Review our policies to understand how we operate and protect your rights</TranslatorText>
          </p>
        </div>

        {/* Policies container - vertical stack */}
        <div className="max-w-6xl mx-auto space-y-6">
          {policySections.map((section, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 border border-[#E8E8E8]"
            >
              {/* Section heading */}
              <h2 className="text-[32px] font-normal font-['Aeonik_TRIAL'] text-black break-words mb-6">
                <TranslatorText>{section.title}</TranslatorText>
              </h2>
              
              {/* Policy content */}
              <div className="space-y-4 text-[#667085]">
                {section.content.map((para, idx) => (
                  <p key={idx} className="leading-relaxed">
                    <TranslatorText>{para}</TranslatorText>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <FooterPage />
    </>
  );
}

export default Policies;