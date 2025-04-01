
import React, { useState } from 'react';
import { useTranslationContext } from '../context/TranslationContext';
import TranslatorText from './Text';

export function FAQPage() {
  const { t } = useTranslationContext();
  const [activeIndex, setActiveIndex] = useState(null);
  
  const faqs = [
    {
      question: t("What topics do your courses cover?"),
      answer: t("Our courses cover financial literacy, investing, budgeting, and personal finance management.")
    },
    {
      question: t("Is this platform suitable for beginners?"),
      answer: t("Yes, we offer beginner-friendly content with step-by-step guidance.")
    },
    {
      question: t("How can I start learning about financial literacy?"),
      answer: t("You can start by exploring our beginner courses on budgeting and smart financial habits.")
    },
    {
      question: t("How do I apply what I learn to real-world investing?"),
      answer: t("We provide real-world case studies, simulations, and investment strategies.")
    },
    {
      question: t("Can I track my progress on this platform?"),
      answer: t("Yes, our platform allows you to monitor course completion and quiz scores.")
    },
    {
      question: t("Is it important to have a portfolio?"),
      answer: t("Yes, a well-diversified portfolio helps manage risk and achieve financial goals.")
    }
  ];

  // Split FAQs into two columns
  const column1 = faqs.slice(0, 3);
  const column2 = faqs.slice(3);

  const toggleBox = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen font-[Aeonik TRIAL] bg-gray-50 p-6">
      <div className="mx-auto bg-white rounded-[28px] shadow-lg overflow-hidden max-w-[2000px]">
        <div className="px-16 py-16 font-[Aeonik TRIAL]">
          <h1 
            className="text-left pb-12"
            style={{
              color: '#0C0D0E',
              fontSize: '70px',
              fontFamily: 'Aeonik TRIAL, sans-serif',
              fontWeight: '400',
              lineHeight: '80px',
              wordWrap: 'break-word'
            }}
          >
            <span className="block pb-4"><TranslatorText>Frequently Asked</TranslatorText></span>
            <span className="block"><TranslatorText>Questions</TranslatorText></span>
          </h1>

          {/* Two column layout */}
          <div className="flex gap-8">
            {/* Column 1 */}
            <div className="flex-1 space-y-8">
              {column1.map((faq, index) => (
                <FAQItem 
                  key={index}
                  faq={faq}
                  index={index}
                  activeIndex={activeIndex}
                  toggleBox={toggleBox}
                />
              ))}
            </div>
            
            {/* Column 2 */}
            <div className="flex-1 space-y-8">
              {column2.map((faq, index) => (
                <FAQItem 
                  key={index + 3}
                  faq={faq}
                  index={index + 3}
                  activeIndex={activeIndex}
                  toggleBox={toggleBox}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ faq, index, activeIndex, toggleBox }) {
  return (
    <div 
      className="transition-all duration-200 hover:shadow-md"
      style={{
        width: '100%',
        background: 'white',
        boxShadow: '0px 5.705847263336182px 18.258710861206055px rgba(8.24, 15.25, 52.06, 0.06)',
        borderRadius: '18.26px',
        overflow: 'hidden',
        border: '1px solid #E8E8E8'
      }}
    >
      <button
        onClick={() => toggleBox(index)}
        className="w-full flex justify-between items-center p-8 hover:bg-gray-50 transition-colors"
      >
        <span 
          className="text-left font-medium text-gray-800 text-xl"
          style={{
            fontFamily: 'Aeonik TRIAL, sans-serif',
            flex: 1,
            marginRight: '16px'
          }}
        >
          <TranslatorText>{faq.question}</TranslatorText>
        </span>
        <span 
          className={`text-2xl transition-transform duration-300 ${
            activeIndex === index ? 'rotate-45' : ''
          }`}
          style={{
            fontFamily: 'Aeonik TRIAL, sans-serif',
            flexShrink: 0
          }}
        >
          +
        </span>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          activeIndex === index ? 'max-h-96' : 'max-h-0'
        }`}
        style={{
          opacity: activeIndex === index ? 1 : 0,
          fontFamily: 'Aeonik TRIAL, sans-serif'
        }}
      >
        <div className="px-8 pb-8 text-gray-600 text-lg leading-7">
          <TranslatorText>{faq.answer}</TranslatorText>
        </div>
      </div>
    </div>
  );
}