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
        "We are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information when you use our services.",
        "We collect information you provide directly, such as when you create an account, complete a form, or contact us. This may include your name, email address, and other contact details.",
        "We use this information to provide and improve our services, communicate with you, and for security and fraud prevention purposes."
      ]
    },
    {
      title: "Privacy Policy",
      content: [
        "By accessing or using our services, you agree to be bound by these terms. If you disagree with any part, you may not access the service.",
        "Our services are provided 'as is' without warranties of any kind. We are not liable for any damages resulting from your use of the service.",
        "We reserve the right to modify or terminate the service for any reason without notice at any time."
      ]
    },
    {
      title: "Privacy Policy",
      content: [
        "We use cookies and similar tracking technologies to track activity on our service and hold certain information.",
        "Cookies are files with small amounts of data which may include an anonymous unique identifier. They are sent to your browser from a website and stored on your device.",
        "You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service."
      ]
    },
    {
      title: "Privacy Policy",
      content: [
        "If you are not satisfied with our service, you may be eligible for a refund within 30 days of purchase.",
        "To request a refund, please contact our support team with your order details and reason for the request.",
        "Refunds will be processed within 7-10 business days and credited to your original payment method."
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