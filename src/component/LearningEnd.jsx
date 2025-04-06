

import React from 'react';
import Icon1 from '../assets/Vector.jpg';
import Icon2 from '../assets/Vector1.jpg'; 
import Icon3 from '../assets/Vector2.jpg';
import Icon4 from '../assets/Vector3.jpg';
import Icon5 from '../assets/Vector4.jpg';
import TranslatorText from './Text';
import { useTranslationContext } from '../context/TranslationContext';

export function FooterPage() {
  const { t, language, changeLanguage } = useTranslationContext();
  const circleIcons = [Icon1, Icon2, Icon3, Icon4, Icon5];

  const footerLinks = [
    t('Features'),
    t('About'), 
    t('Contact'),
    t('Policies')
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'ur', name: 'Urdu' }
  ];

  return (
    <div className="h-[] bg-[#000000] p-8 px-16 py-16 font-['Aeonik_TRIAL'] text-white relative">
      <div className="flex flex-row gap-12">
        {/* Left Column */}
        <div className="w-1/2 flex flex-col justify-between">
          <div>
            <div className="text-3xl font-bold mb-8">
              <TranslatorText>InvestIQ</TranslatorText>
            </div>
            <div className="mb-[400px]">
              <p className="text-[#8F9FA3] text-base leading-[22.4px] mb-4 w-[420px]">
                <TranslatorText>
                  Master finance with AI-powered insights, empowering you to make informed investment decisions and grow your wealth.
                </TranslatorText>
              </p>
              <a href="#" className="text-white text-xs underline leading-[18px]">
                <TranslatorText>More about us</TranslatorText>
              </a>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                {circleIcons.slice(0, 3).map((icon, index) => (
                  <div key={`img-${index}`} className="w-10 h-10 bg-white rounded-full flex justify-center items-center overflow-hidden">
                    <img 
                      src={icon} 
                      alt={`Icon ${index + 1}`} 
                      className="w-[70%] h-[70%] object-contain" 
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {circleIcons.slice(3, 5).map((icon, index) => (
                  <div key={`img-${index + 3}`} className="w-10 h-10 bg-white rounded-full flex justify-center items-center overflow-hidden">
                    <img 
                      src={icon} 
                      alt={`Icon ${index + 4}`} 
                      className="w-[70%] h-[70%] object-contain" 
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[#8F9FA3] text-xs leading-[16.8px]">
              <TranslatorText>© 2025 — Copyright</TranslatorText>
              <br/>
              <TranslatorText>All Rights reserved</TranslatorText>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/2 flex flex-col justify-between">
          <div className="flex gap-10 mb-12">
            {footerLinks.map((item) => (
              <a key={item} href="#" className="text-[#8F9FA3] text-base underline leading-[22.4px]">
                {item}
              </a>
            ))}
          </div>

          <div className="flex justify-between">
            <div>
              <div className="mb-12">
                <h3 className="text-xl leading-[22px] mb-4">
                  <TranslatorText>Contact</TranslatorText>
                </h3>
                <div className="text-[#8F9FA3] text-sm leading-[22.4px]">
                  <div>+91 9805300287</div>
                  <div>investiqxvnsxdevs@gmail.com</div>
                </div>
              </div>
              <div>
                <h3 className="text-xl leading-[22px] mb-4">
                  <TranslatorText>Location</TranslatorText>
                </h3>
                <p className="text-[#8F9FA3] text-sm leading-[22.4px]">
                  <TranslatorText>IIT BHU</TranslatorText>
                  <br/>
                  <TranslatorText>Varanasi , 221005</TranslatorText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language Selector */}
      <div className="absolute bottom-8 right-8 flex flex-col items-end">
        <span className="text-xs leading-[16.8px] mb-4">
          <TranslatorText>Languages</TranslatorText>
        </span>
        <div className="flex gap-5">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`text-sm leading-[22.4px] ${
                language === lang.code 
                  ? 'text-white' 
                  : 'text-[#8F9FA3] hover:text-white cursor-pointer'
              }`}
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};