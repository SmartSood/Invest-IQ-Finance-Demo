import React from 'react';
import { useTranslationContext } from '../../context/TranslationContext';
import TranslatorText from '../Text';
import { FooterPage } from '../LearningEnd';
import Navbar from '../navbar';

const About = () => {
  const { t } = useTranslationContext();

  return (
    <>
      <Navbar />
      
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        {/* Hero Section with Stat Card */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center mb-16">
          {/* Left Column - Text Content */}
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold text-[#0C0D0E] mb-6">
              {t('About Our Company')}
            </h1>
            <p className="text-[#667085] text-lg mb-8">
              {t('We are a leading provider of innovative solutions with a track record of success. Our team of experts delivers exceptional results for clients worldwide.')}
            </p>
            <button className="bg-[#0C0D0E] text-white py-3 px-8 rounded-3xl hover:bg-gray-800 transition-colors">
              {t('Learn More')}
            </button>
          </div>
          
          {/* Right Column - Stat Card */}
          <div className="md:w-1/2 flex justify-center">
            {/* Exact stat card from screenshot */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-[320px]">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">30,000+</h2>
              <p className="text-gray-600 text-sm mb-3">
                {t('Sales in July 2021 with 5 star ratings')}
              </p>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {t('and happy clients.')}
              </p>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-gray-900 font-medium text-sm">
                  {t('Best ratings')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-[#0C0D0E] mb-4">
              {t('Our Team')}
            </h3>
            <p className="text-[#667085] max-w-2xl mx-auto">
              {t('Meet our dedicated team of professionals committed to delivering excellence.')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                  <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-[#0C0D0E] mb-2">
                  {t(`Team Member ${item}`)}
                </h4>
                <p className="text-[#667085]">
                  {t('Professional Title')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Stats Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { value: '10+', label: t('Years Experience') },
            { value: '500+', label: t('Projects Completed') },
            { value: '100%', label: t('Client Satisfaction') }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h3 className="text-4xl font-bold text-[#0C0D0E] mb-2">{stat.value}</h3>
              <p className="text-[#667085]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      <FooterPage />
    </>
  );
};

export default About;