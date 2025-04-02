
// import React, { useState, useRef, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faMicrophone, 
//   faMicrophoneSlash,
//   faLanguage,
//   faSpinner
// } from '@fortawesome/free-solid-svg-icons';
// import Navbar from "../navbarModule";
// import DashboardLayout from "../DashboardLayout";

// // Language options
// const LANGUAGES = [
//   { code: 'en', name: 'English' },
//   { code: 'hi', name: 'हिंदी' },
//   { code: 'es', name: 'Español' },
//   { code: 'fr', name: 'Français' },
//   { code: 'de', name: 'Deutsch' },
//   { code: 'ja', name: '日本語' },
//   { code: 'zh', name: '中文' },
// ];

// const GOOGLE_API_KEY = "AIzaSyAAvV790SgykzvhGIvBoqYYRh3rwoip_2Q";
// const SPEECH_API_URL = "https://speech.googleapis.com/v1/speech:recognize";

// const FinancialAdvisor = () => {
//   // Chat state
//   const [messages, setMessages] = useState([{
//     text: "Welcome to Comprehensive Financial Advisor! I can help with:\n\n• Stock comparisons (e.g., 'Compare TCS.NS vs INFY.NS')\n• Portfolio analysis (e.g., 'I have 10 ITC and 5 HDFCBANK')\n• Investment plans (e.g., 'Plan to invest ₹50K monthly')\n• Life goals (e.g., 'Need ₹3Cr house plan in 5 years')\n• Indian stock analysis (e.g., 'Analyze RELIANCE.NS')",
//     sender: 'bot'
//   }]);
//   const [inputValue, setInputValue] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUserTyping, setIsUserTyping] = useState(false);
//   const [riskAssessment, setRiskAssessment] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [language, setLanguage] = useState('en');
//   const messagesEndRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const streamRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//     setIsUserTyping(e.target.value.length > 0);
//   };

//   // Get speech recognition language code
//   const getSpeechRecognitionLanguageCode = (lang) => {
//     const languageMap = {
//       'en': 'en-US',
//       'hi': 'hi-IN',
//       'es': 'es-ES',
//       'fr': 'fr-FR',
//       'de': 'de-DE',
//       'ja': 'ja-JP',
//       'zh': 'zh-CN',
//     };
//     return languageMap[lang] || 'en-US';
//   };

//   // Voice recording functions
//   const startListening = async () => {
//     try {
//       setIsListening(true);
//       setInputValue(prev => `${prev} 🎤 `);
      
//       const audioStream = await navigator.mediaDevices.getUserMedia({ 
//         audio: {
//           sampleRate: 16000,
//           channelCount: 1,
//           echoCancellation: true,
//           noiseSuppression: true
//         }
//       });
      
//       streamRef.current = audioStream;
//       audioChunksRef.current = [];
//       const recorder = new MediaRecorder(audioStream, { mimeType: 'audio/webm' });
//       mediaRecorderRef.current = recorder;

//       recorder.ondataavailable = (e) => {
//         if (e.data.size > 0) audioChunksRef.current.push(e.data);
//       };

//       recorder.onstop = async () => {
//         try {
//           const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//           await processAudio(audioBlob);
//         } catch (error) {
//           console.error("Audio processing error:", error);
//           setMessages(prev => [...prev, { 
//             text: "Error processing voice input", 
//             sender: "system" 
//           }]);
//         } finally {
//           cleanupRecording();
//         }
//       };

//       recorder.start(100);
//       setTimeout(() => recorder.state === 'recording' && stopListening(), 15000);

//     } catch (error) {
//       console.error("Microphone error:", error);
//       cleanupRecording();
//       setMessages(prev => [...prev, { 
//         text: "Please enable microphone permissions", 
//         sender: "system" 
//       }]);
//     }
//   };

//   const stopListening = () => {
//     mediaRecorderRef.current?.stop();
//   };

//   const cleanupRecording = () => {
//     mediaRecorderRef.current?.stop();
//     streamRef.current?.getTracks().forEach(track => track.stop());
//     mediaRecorderRef.current = null;
//     streamRef.current = null;
//     setIsListening(false);
//     setInputValue(prev => prev.replace(" 🎤 ", "").trim());
//   };

//   const processAudio = async (audioBlob) => {
//     if (!audioBlob?.size) return;
    
//     try {
//       setIsLoading(true);
//       const audioBase64 = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result.split(',')[1]);
//         reader.readAsDataURL(audioBlob);
//       });

//       const recognitionLang = getSpeechRecognitionLanguageCode(language);
      
//       const response = await fetch(`${SPEECH_API_URL}?key=${GOOGLE_API_KEY}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           config: {
//             encoding: 'WEBM_OPUS',
//             sampleRateHertz: 48000,
//             languageCode: recognitionLang,
//             enableAutomaticPunctuation: true
//           },
//           audio: { content: audioBase64 }
//         })
//       });

//       const data = await response.json();
//       const transcript = data.results?.[0]?.alternatives?.[0]?.transcript;
//       if (transcript) {
//         setInputValue(prev => `${prev.replace(" 🎤 ", "")} ${transcript}`.trim());
//       }
//     } catch (error) {
//       console.error("Speech API error:", error);
//       setMessages(prev => [...prev, { 
//         text: "Voice recognition failed", 
//         sender: "system" 
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Translate text using Google Translate API
//   const translateText = async (text, targetLang) => {
//     if (!text || targetLang === 'en') return text;
    
//     try {
//       const response = await fetch(
//         `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             q: text,
//             target: targetLang,
//             format: 'text'
//           })
//         }
//       );
      
//       const data = await response.json();
//       return data.data.translations[0].translatedText;
//     } catch (error) {
//       console.error("Translation error:", error);
//       return text;
//     }
//   };

//   const generateFinancialAdvice = async (prompt) => {
//     const GROQ_API_KEY = "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"; // Replace with your key
    
//     try {
//       const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${GROQ_API_KEY}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           messages: [{ role: "user", content: prompt }],
//           model: "llama3-70b-8192",
//           temperature: 0.3,
//           max_tokens: 2000
//         })
//       });

//       const data = await response.json();
//       return data.choices?.[0]?.message?.content || "Could not generate analysis.";
//     } catch (error) {
//       console.error("API Error:", error);
//       return "⚠️ Failed to connect to analysis service. Please try again later.";
//     }
//   };

//   const extractAmount = (text) => {
//     const match = text.match(/(\d+\.?\d*)\s*(crore|cr|lakh|lk|₹|rs|rupees?|lacs?)?/i);
//     if (!match) return null;
    
//     let amount = parseFloat(match[1]);
//     const unit = match[2] ? match[2].toLowerCase() : '';
    
//     if (unit.includes('crore') || unit.includes('cr')) {
//       amount *= 10000000;
//     } else if (unit.includes('lakh') || unit.includes('lk') || unit.includes('lac')) {
//       amount *= 100000;
//     }
    
//     return amount;
//   };

//   const extractTimeframe = (text) => {
//     const match = text.match(/(\d+)\s*(years?|yrs?|months?|mos?)/i);
//     return match ? parseInt(match[1]) : 3;
//   };

//   const detectQueryType = (text) => {
//     const lowerText = text.toLowerCase();
    
//     if (lowerText.includes('compare') && lowerText.includes('vs')) {
//       return 'compare';
//     }
    
//     if (/(\d+)\s*(shares\s*of\s*)?([A-Za-z]+\.?[A-Za-z]*)/i.test(text) || 
//         lowerText.includes('my portfolio') || 
//         (lowerText.includes('i have') && 
//          (lowerText.includes('shares') || lowerText.includes('stocks')))) {
//       return 'portfolio';
//     }
    
//     if (lowerText.includes('invest') && 
//         (lowerText.includes('monthly') || 
//          lowerText.includes('lump sum') || 
//          /\d+.*(rupees|rs|₹)/i.test(text))) {
//       return 'investment';
//     }
    
//     if (lowerText.includes('retirement')) {
//       return 'retirement';
//     }
    
//     if (lowerText.includes('house') || lowerText.includes('home')) {
//       return 'house';
//     }
    
//     if (lowerText.includes('car')) {
//       return 'car';
//     }
    
//     if (lowerText.includes('marriage') || lowerText.includes('wedding')) {
//       return 'marriage';
//     }
    
//     if (lowerText.includes('analyze') || 
//         /[A-Za-z]+\.NS/i.test(text) || 
//         lowerText.includes('stock') || 
//         lowerText.includes('nse') || 
//         lowerText.includes('bse')) {
//       return 'stock_analysis';
//     }
    
//     return 'general';
//   };

//   const generateResponse = async (text, type) => {
//     let prompt = '';
//     const amount = extractAmount(text);
//     const years = extractTimeframe(text);
    
//     switch(type) {
//       case 'compare':
//         const [stock1, stock2] = text.toLowerCase().split('vs').map(s => s.trim());
//         prompt = `
//         Compare ${stock1} and ${stock2} for Indian investors with these details:
//         1. Fundamentals (P/E, ROE, Debt/Equity)
//         2. Technical indicators (1Y performance, support/resistance)
//         3. Sector outlook in Indian context
//         4. Which is better for long-term investment and why?
//         ${riskAssessment ? "5. Risk comparison specific to Indian market\n" : ""}
//         Provide the comparison in a structured table format.
//         `;
//         break;
        
//       case 'portfolio':
//         prompt = `
//         Analyze this Indian portfolio mentioned:
//         "${text}"
        
//         Provide specific recommendations for:
//         1. Sector allocation (percentage breakdown)
//         2. Risk assessment (India-specific factors)
//         3. Rebalancing suggestions
//         4. Tax-efficient strategies for Indian investors
//         ${riskAssessment ? "5. Detailed risk factors with mitigation\n" : ""}
//         `;
//         break;
        
//       case 'investment':
//         prompt = `
//         Create detailed Indian investment plan based on:
//         "${text}"
        
//         Include:
//         1. Asset allocation (equity:debt:gold ratio)
//         2. Recommended funds/stocks with Indian examples
//         3. Tax implications under Indian tax laws
//         4. SIP vs lump sum strategy
//         ${riskAssessment ? "5. Risk management strategy\n" : ""}
//         Provide monthly/yearly breakdown if applicable.
//         `;
//         break;
        
//       case 'retirement':
//         prompt = `
//         Create retirement plan for Indian investor based on:
//         "${text}"
        
//         Cover:
//         1. Corpus calculation (accounting for Indian inflation)
//         2. Asset allocation strategy
//         3. Withdrawal rate suggestions
//         4. Tax-efficient withdrawal methods in India
//         5. Healthcare cost estimation in Indian context
//         ${riskAssessment ? "6. Longevity risk mitigation\n" : ""}
//         `;
//         break;
        
//       case 'house':
//         prompt = `
//         Create home purchase plan for Indian buyer based on:
//         "${text}"
        
//         Amount: ₹${amount ? amount.toLocaleString('en-IN') : 'X'} 
//         Timeframe: ${years} years
        
//         Include:
//         1. Down payment savings strategy (20-25%)
//         2. Loan eligibility calculation (Indian rates)
//         3. Property selection criteria for India
//         4. Tax benefits under Indian laws (Section 24, 80C)
//         5. Hidden costs in Indian real estate
//         ${riskAssessment ? "6. Property market risks in current Indian scenario\n" : ""}
        
//         Provide exact calculations for:
//         - Monthly investment needed
//         - EMI estimates
//         - Total interest payable
//         - Registration charges (6%)
//         `;
//         break;
        
//       case 'car':
//         prompt = `
//         Create car purchase plan based on:
//         "${text}"
        
//         Cover for Indian context:
//         1. New vs used car analysis
//         2. Loan vs cash purchase comparison
//         3. Insurance requirements in India
//         4. Maintenance cost estimation
//         5. Depreciation impact
//         ${riskAssessment ? "6. Fuel price fluctuation risks\n" : ""}
//         `;
//         break;
        
//       case 'marriage':
//         prompt = `
//         Create marriage financial plan based on:
//         "${text}"
        
//         Include for Indian weddings:
//         1. Budget breakdown (venue, catering, etc.)
//         2. Regional cost variations in India
//         3. Gold purchase strategy
//         4. Tax implications of wedding expenses
//         5. Post-wedding financial planning
//         ${riskAssessment ? "6. Financial risks and mitigation\n" : ""}
//         `;
//         break;
        
//       case 'stock_analysis':
//         prompt = `
//         Analyze this Indian stock:
//         "${text}"
        
//         Provide:
//         1. Fundamental analysis (valuation ratios)
//         2. Technical analysis (key levels)
//         3. Sector position in Indian market
//         4. Management quality assessment
//         5. Long-term growth potential in India
//         ${riskAssessment ? "6. India-specific risk factors\n" : ""}
//         `;
//         break;
        
//       default:
//         prompt = `
//         As financial advisor for Indian investors, answer:
//         "${text}"
        
//         Requirements:
//         - Focus specifically on Indian financial context
//         - Include relevant tax implications
//         - ${riskAssessment ? "Highlight risks prominently" : "Mention risks briefly"}
//         - Provide actionable advice with concrete steps
//         `;
//     }
    
//     return await generateFinancialAdvice(prompt);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;

//     const userMessage = { text: inputValue, sender: 'user' };
//     setMessages(prev => [...prev, userMessage]);
//     setInputValue('');
//     setIsLoading(true);

//     try {
//       // Translate input to English if needed
//       let englishInput = inputValue;
//       if (language !== 'en') {
//         englishInput = await translateText(inputValue, 'en');
//       }

//       const queryType = detectQueryType(englishInput);
//       let response = await generateResponse(englishInput, queryType);
      
//       // Translate response back to user's language if needed
//       if (language !== 'en') {
//         response = await translateText(response, language);
//       }

//       let responseText = response;
//       if (queryType === 'compare') {
//         responseText = `🔍 Comparison:\n\n${response}`;
//       } else if (queryType === 'portfolio') {
//         responseText = `📊 Portfolio Analysis:\n\n${response}`;
//       } else if (queryType === 'investment') {
//         responseText = `📈 Investment Plan:\n\n${response}`;
//       } else if (queryType === 'retirement') {
//         responseText = `🏦 Retirement Plan:\n\n${response}`;
//       } else if (queryType === 'house') {
//         responseText = `🏠 Home Purchase Plan:\n\n${response}`;
//       } else if (queryType === 'car') {
//         responseText = `🚗 Car Purchase Plan:\n\n${response}`;
//       } else if (queryType === 'marriage') {
//         responseText = `💍 Marriage Plan:\n\n${response}`;
//       }
      
//       setMessages(prev => [...prev, { text: responseText, sender: 'bot' }]);
//     } catch (error) {
//       setMessages(prev => [...prev, { 
//         text: "⚠️ Error processing your request. Please try again.", 
//         sender: 'bot' 
//       }]);
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const clearChat = () => {
//     setMessages([{
//       text: "Chat cleared. How can I assist with your financial planning today?",
//       sender: 'bot'
//     }]);
//   };

//   return (
//     <div className="w-full h-screen relative bg-gray-100 overflow-hidden">
//       <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[996px] h-[80vh] bg-white shadow-md rounded-[34px] border border-gray-100 flex flex-col">
//         {/* Header Section */}
//         <div className="p-6 border-b border-gray-200">
//           <h1 className="text-[#CACACA] text-[40px] font-normal font-['Aeonik_TRIAL'] leading-[40px] break-words text-center mb-2">
//             Portfolio Analyzer
//           </h1>
//           <p className="text-[#6F6C90] text-lg font-normal font-['Aeonik_TRIAL'] text-center">
//             Complete Indian Financial Planning
//           </p>
//         </div>

//         {/* Chat Container */}
//         <div className="flex-1 p-6 overflow-y-auto">
//           <div className="space-y-4">
//             {messages.map((msg, index) => (
//               <div 
//                 key={index} 
//                 className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div 
//                   className={`max-w-[80%] rounded-lg p-4 ${msg.sender === 'user' 
//                     ? 'bg-gradient-to-br from-[#4A25E1] to-[#7B5AFF] text-white rounded-br-none shadow-[0px_21px_27px_-10px_rgba(96,60,255,0.48)]' 
//                     : 'bg-gray-100 text-black rounded-bl-none'}`}
//                 >
//                   {msg.text.split('\n').map((paragraph, i) => (
//                     <p key={i} className="mb-2 last:mb-0">{paragraph}</p>
//                   ))}
//                 </div>
//               </div>
//             ))}
            
//             {isLoading && (
//               <div className="flex justify-start">
//                 <div className="max-w-[80%] rounded-lg rounded-bl-none bg-gray-100 p-4 flex items-center">
//                   <div className="flex space-x-1 mr-2">
//                     <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
//                     <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                     <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                   </div>
//                   <span className="text-gray-500 text-sm">Analyzing your request...</span>
//                 </div>
//               </div>
//             )}

//             <div ref={messagesEndRef} />
//           </div>
//         </div>

//         {/* Input Area */}
//         <div className="p-6 border-t border-gray-200">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="risk-assessment"
//                   checked={riskAssessment}
//                   onChange={() => setRiskAssessment(!riskAssessment)}
//                   className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="risk-assessment" className="text-sm text-gray-700">
//                   Include risk assessment
//                 </label>
//               </div>
              
//               <div className="relative">
//                 <select
//                   value={language}
//                   onChange={(e) => setLanguage(e.target.value)}
//                   className="appearance-none bg-white border border-gray-300 rounded-md py-1 pl-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
//                 >
//                   {LANGUAGES.map((lang) => (
//                     <option key={lang.code} value={lang.code}>
//                       {lang.name}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
//                   <FontAwesomeIcon icon={faLanguage} className="text-gray-500 text-sm" />
//                 </div>
//               </div>
//             </div>
            
//             <button 
//               onClick={clearChat}
//               className="text-sm text-gray-500 hover:text-gray-700"
//             >
//               Clear chat
//             </button>
//           </div>
          
//           <form onSubmit={handleSubmit} className="flex gap-4">
//             <input
//               type="text"
//               value={inputValue}
//               onChange={handleInputChange}
//               placeholder="Ask about stocks, investments, or financial goals..."
//               className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//             />
//             <button
//               type="button"
//               onClick={isListening ? stopListening : startListening}
//               disabled={isLoading}
//               className={`w-12 h-[50px] flex items-center justify-center rounded-lg border ${
//                 isListening 
//                   ? 'bg-red-100 border-red-300 text-red-500' 
//                   : 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200'
//               }`}
//             >
//               <FontAwesomeIcon 
//                 icon={isListening ? faMicrophoneSlash : faMicrophone} 
//                 className={isListening ? 'animate-pulse' : ''}
//               />
//             </button>
//             <button 
//               type="submit" 
//               className="w-full max-w-[120px] h-[50px] bg-gradient-to-br from-[#4A25E1] to-[#7B5AFF] rounded-[45px] shadow-[0px_21px_27px_-10px_rgba(96,60,255,0.48)] flex justify-center items-center text-white text-sm font-normal font-['Aeonik_TRIAL'] leading-4 hover:opacity-90 transition-opacity"
//               disabled={isLoading || !inputValue.trim()}
//             >
//               {isLoading ? (
//                 <div className="flex items-center">
//                   <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
//                   Analyzing
//                 </div>
//               ) : 'Submit'}
//             </button>
//           </form>
          
//           <div className="mt-2 text-xs text-gray-500">
//             <p>Examples: "Compare TCS vs INFY" or "Need ₹3Cr home plan in 5 years"</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export function PortfolioAnalyzerApp() {
//   const [activeSection, setActiveSection] = useState("PortfolioAnalyzer");

//   return (
//     <div>
//       <Navbar />
//       <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
//         <FinancialAdvisor />
//       </DashboardLayout>
//     </div>
//   );
// }

// export default PortfolioAnalyzerApp;
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMicrophone, 
  faMicrophoneSlash,
  faLanguage,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import Navbar from "../navbarModule";
import DashboardLayout from "../DashboardLayout";
import { translateText } from '../../services/translationService';

// Language options
const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
  { code: 'zh', name: '中文' },
];

const GOOGLE_API_KEY = "AIzaSyAAvV790SgykzvhGIvBoqYYRh3rwoip_2Q";
const SPEECH_API_URL = "https://speech.googleapis.com/v1/speech:recognize";

const FinancialAdvisor = () => {
  // Chat state
  const [messages, setMessages] = useState([{
    text: "Welcome to Comprehensive Financial Advisor! I can help with:\n\n• Stock comparisons (e.g., 'Compare TCS.NS vs INFY.NS')\n• Portfolio analysis (e.g., 'I have 10 ITC and 5 HDFCBANK')\n• Investment plans (e.g., 'Plan to invest ₹50K monthly')\n• Life goals (e.g., 'Need ₹3Cr house plan in 5 years')\n• Indian stock analysis (e.g., 'Analyze RELIANCE.NS')",
    sender: 'bot'
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [riskAssessment, setRiskAssessment] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en');
  const messagesEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsUserTyping(e.target.value.length > 0);
  };

  // Get speech recognition language code
  const getSpeechRecognitionLanguageCode = (lang) => {
    const languageMap = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'de': 'de-DE',
      'ja': 'ja-JP',
      'zh': 'zh-CN',
    };
    return languageMap[lang] || 'en-US';
  };

  // Voice recording functions
  const startListening = async () => {
    try {
      setIsListening(true);
      setInputValue(prev => `${prev} 🎤 `);
      
      const audioStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      
      streamRef.current = audioStream;
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(audioStream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        try {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          await processAudio(audioBlob);
        } catch (error) {
          console.error("Audio processing error:", error);
          setMessages(prev => [...prev, { 
            text: "Error processing voice input", 
            sender: "system" 
          }]);
        } finally {
          cleanupRecording();
        }
      };

      recorder.start(100);
      setTimeout(() => recorder.state === 'recording' && stopListening(), 15000);

    } catch (error) {
      console.error("Microphone error:", error);
      cleanupRecording();
      setMessages(prev => [...prev, { 
        text: "Please enable microphone permissions", 
        sender: "system" 
      }]);
    }
  };

  const stopListening = () => {
    mediaRecorderRef.current?.stop();
  };

  const cleanupRecording = () => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach(track => track.stop());
    mediaRecorderRef.current = null;
    streamRef.current = null;
    setIsListening(false);
    setInputValue(prev => prev.replace(" 🎤 ", "").trim());
  };

  const processAudio = async (audioBlob) => {
    if (!audioBlob?.size) return;
    
    try {
      setIsLoading(true);
      const audioBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(audioBlob);
      });

      const recognitionLang = getSpeechRecognitionLanguageCode(language);
      
      const response = await fetch(`${SPEECH_API_URL}?key=${GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          config: {
            encoding: 'WEBM_OPUS',
            sampleRateHertz: 48000,
            languageCode: recognitionLang,
            enableAutomaticPunctuation: true
          },
          audio: { content: audioBase64 }
        })
      });

      const data = await response.json();
      const transcript = data.results?.[0]?.alternatives?.[0]?.transcript;
      if (transcript) {
        setInputValue(prev => `${prev.replace(" 🎤 ", "")} ${transcript}`.trim());
      }
    } catch (error) {
      console.error("Speech API error:", error);
      setMessages(prev => [...prev, { 
        text: "Voice recognition failed", 
        sender: "system" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFinancialAdvice = async (prompt) => {
    const GROQ_API_KEY = "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"; // Replace with your key
    
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          model: "llama3-70b-8192",
          temperature: 0.3,
          max_tokens: 2000
        })
      });

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "Could not generate analysis.";
    } catch (error) {
      console.error("API Error:", error);
      return "⚠️ Failed to connect to analysis service. Please try again later.";
    }
  };

  const extractAmount = (text) => {
    const match = text.match(/(\d+\.?\d*)\s*(crore|cr|lakh|lk|₹|rs|rupees?|lacs?)?/i);
    if (!match) return null;
    
    let amount = parseFloat(match[1]);
    const unit = match[2] ? match[2].toLowerCase() : '';
    
    if (unit.includes('crore') || unit.includes('cr')) {
      amount *= 10000000;
    } else if (unit.includes('lakh') || unit.includes('lk') || unit.includes('lac')) {
      amount *= 100000;
    }
    
    return amount;
  };

  const extractTimeframe = (text) => {
    const match = text.match(/(\d+)\s*(years?|yrs?|months?|mos?)/i);
    return match ? parseInt(match[1]) : 3;
  };

  const detectQueryType = (text) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('compare') && lowerText.includes('vs')) {
      return 'compare';
    }
    
    if (/(\d+)\s*(shares\s*of\s*)?([A-Za-z]+\.?[A-Za-z]*)/i.test(text) || 
        lowerText.includes('my portfolio') || 
        (lowerText.includes('i have') && 
         (lowerText.includes('shares') || lowerText.includes('stocks')))) {
      return 'portfolio';
    }
    
    if (lowerText.includes('invest') && 
        (lowerText.includes('monthly') || 
         lowerText.includes('lump sum') || 
         /\d+.*(rupees|rs|₹)/i.test(text))) {
      return 'investment';
    }
    
    if (lowerText.includes('retirement')) {
      return 'retirement';
    }
    
    if (lowerText.includes('house') || lowerText.includes('home')) {
      return 'house';
    }
    
    if (lowerText.includes('car')) {
      return 'car';
    }
    
    if (lowerText.includes('marriage') || lowerText.includes('wedding')) {
      return 'marriage';
    }
    
    if (lowerText.includes('analyze') || 
        /[A-Za-z]+\.NS/i.test(text) || 
        lowerText.includes('stock') || 
        lowerText.includes('nse') || 
        lowerText.includes('bse')) {
      return 'stock_analysis';
    }
    
    return 'general';
  };

  const generateResponse = async (text, type) => {
    let prompt = '';
    const amount = extractAmount(text);
    const years = extractTimeframe(text);
    
    switch(type) {
      case 'compare':
        const [stock1, stock2] = text.toLowerCase().split('vs').map(s => s.trim());
        prompt = `
        Compare ${stock1} and ${stock2} for Indian investors with these details:
        1. Fundamentals (P/E, ROE, Debt/Equity)
        2. Technical indicators (1Y performance, support/resistance)
        3. Sector outlook in Indian context
        4. Which is better for long-term investment and why?
        ${riskAssessment ? "5. Risk comparison specific to Indian market\n" : ""}
        Provide the comparison in a structured table format.
        `;
        break;
        
      case 'portfolio':
        prompt = `
        Analyze this Indian portfolio mentioned:
        "${text}"
        
        Provide specific recommendations for:
        1. Sector allocation (percentage breakdown)
        2. Risk assessment (India-specific factors)
        3. Rebalancing suggestions
        4. Tax-efficient strategies for Indian investors
        ${riskAssessment ? "5. Detailed risk factors with mitigation\n" : ""}
        `;
        break;
        
      case 'investment':
        prompt = `
        Create detailed Indian investment plan based on:
        "${text}"
        
        Include:
        1. Asset allocation (equity:debt:gold ratio)
        2. Recommended funds/stocks with Indian examples
        3. Tax implications under Indian tax laws
        4. SIP vs lump sum strategy
        ${riskAssessment ? "5. Risk management strategy\n" : ""}
        Provide monthly/yearly breakdown if applicable.
        `;
        break;
        
      case 'retirement':
        prompt = `
        Create retirement plan for Indian investor based on:
        "${text}"
        
        Cover:
        1. Corpus calculation (accounting for Indian inflation)
        2. Asset allocation strategy
        3. Withdrawal rate suggestions
        4. Tax-efficient withdrawal methods in India
        5. Healthcare cost estimation in Indian context
        ${riskAssessment ? "6. Longevity risk mitigation\n" : ""}
        `;
        break;
        
      case 'house':
        prompt = `
        Create home purchase plan for Indian buyer based on:
        "${text}"
        
        Amount: ₹${amount ? amount.toLocaleString('en-IN') : 'X'} 
        Timeframe: ${years} years
        
        Include:
        1. Down payment savings strategy (20-25%)
        2. Loan eligibility calculation (Indian rates)
        3. Property selection criteria for India
        4. Tax benefits under Indian laws (Section 24, 80C)
        5. Hidden costs in Indian real estate
        ${riskAssessment ? "6. Property market risks in current Indian scenario\n" : ""}
        
        Provide exact calculations for:
        - Monthly investment needed
        - EMI estimates
        - Total interest payable
        - Registration charges (6%)
        `;
        break;
        
      case 'car':
        prompt = `
        Create car purchase plan based on:
        "${text}"
        
        Cover for Indian context:
        1. New vs used car analysis
        2. Loan vs cash purchase comparison
        3. Insurance requirements in India
        4. Maintenance cost estimation
        5. Depreciation impact
        ${riskAssessment ? "6. Fuel price fluctuation risks\n" : ""}
        `;
        break;
        
      case 'marriage':
        prompt = `
        Create marriage financial plan based on:
        "${text}"
        
        Include for Indian weddings:
        1. Budget breakdown (venue, catering, etc.)
        2. Regional cost variations in India
        3. Gold purchase strategy
        4. Tax implications of wedding expenses
        5. Post-wedding financial planning
        ${riskAssessment ? "6. Financial risks and mitigation\n" : ""}
        `;
        break;
        
      case 'stock_analysis':
        prompt = `
        Analyze this Indian stock:
        "${text}"
        
        Provide:
        1. Fundamental analysis (valuation ratios)
        2. Technical analysis (key levels)
        3. Sector position in Indian market
        4. Management quality assessment
        5. Long-term growth potential in India
        ${riskAssessment ? "6. India-specific risk factors\n" : ""}
        `;
        break;
        
      default:
        prompt = `
        As financial advisor for Indian investors, answer:
        "${text}"
        
        Requirements:
        - Focus specifically on Indian financial context
        - Include relevant tax implications
        - ${riskAssessment ? "Highlight risks prominently" : "Mention risks briefly"}
        - Provide actionable advice with concrete steps
        `;
    }
    
    return await generateFinancialAdvice(prompt);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Translate input to English if needed
      let englishInput = inputValue;
      if (language !== 'en') {
        englishInput = await translateText(inputValue, 'en');
      }

      const queryType = detectQueryType(englishInput);
      let response = await generateResponse(englishInput, queryType);
      
      // Translate response back to user's language if needed
      if (language !== 'en') {
        response = await translateText(response, language);
      }

      let responseText = response;
      if (queryType === 'compare') {
        responseText = `🔍 Comparison:\n\n${response}`;
      } else if (queryType === 'portfolio') {
        responseText = `📊 Portfolio Analysis:\n\n${response}`;
      } else if (queryType === 'investment') {
        responseText = `📈 Investment Plan:\n\n${response}`;
      } else if (queryType === 'retirement') {
        responseText = `🏦 Retirement Plan:\n\n${response}`;
      } else if (queryType === 'house') {
        responseText = `🏠 Home Purchase Plan:\n\n${response}`;
      } else if (queryType === 'car') {
        responseText = `🚗 Car Purchase Plan:\n\n${response}`;
      } else if (queryType === 'marriage') {
        responseText = `💍 Marriage Plan:\n\n${response}`;
      }
      
      setMessages(prev => [...prev, { text: responseText, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "⚠️ Error processing your request. Please try again.", 
        sender: 'bot' 
      }]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      text: "Chat cleared. How can I assist with your financial planning today?",
      sender: 'bot'
    }]);
  };

  const FormattedMessage = ({ text, sender }) => (
    <div className={`whitespace-pre-wrap ${sender === 'user' ? 'text-white' : 'text-black'}`}>
      {text.split('\n').map((paragraph, i) => (
        <p key={i} className="mb-2 last:mb-0">{paragraph}</p>
      ))}
    </div>
  );

  return (
    <div className="w-full h-screen relative bg-gray-100 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[996px] h-[80vh] bg-white shadow-md rounded-[34px] border border-gray-100 flex flex-col">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-[#CACACA] text-[40px] font-normal font-['Aeonik_TRIAL'] leading-[40px] break-words text-center mb-2">
            Portfolio Analyzer
          </h1>
          <p className="text-[#6F6C90] text-lg font-normal font-['Aeonik_TRIAL'] text-center">
            Complete Indian Financial Planning
          </p>
        </div>

        {/* Chat Container */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-4 ${msg.sender === 'user' 
                    ? 'bg-gradient-to-br from-[#4A25E1] to-[#7B5AFF] text-white rounded-br-none shadow-[0px_21px_27px_-10px_rgba(96,60,255,0.48)]' 
                    : 'bg-gray-100 text-black rounded-bl-none'}`}
                >
                  <FormattedMessage text={msg.text} sender={msg.sender} />
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg rounded-bl-none bg-gray-100 p-4 flex items-center">
                  <div className="flex space-x-1 mr-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-gray-500 text-sm">Analyzing your request...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="risk-assessment"
                  checked={riskAssessment}
                  onChange={() => setRiskAssessment(!riskAssessment)}
                  className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="risk-assessment" className="text-sm text-gray-700">
                  Include risk assessment
                </label>
              </div>
              
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md py-1 pl-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <FontAwesomeIcon icon={faLanguage} className="text-gray-500 text-sm" />
                </div>
              </div>
            </div>
            
            <button 
              onClick={clearChat}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear chat
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ask about stocks, investments, or financial goals..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              disabled={isLoading}
              className={`w-12 h-[50px] flex items-center justify-center rounded-lg border ${
                isListening 
                  ? 'bg-red-100 border-red-300 text-red-500' 
                  : 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <FontAwesomeIcon 
                icon={isListening ? faMicrophoneSlash : faMicrophone} 
                className={isListening ? 'animate-pulse' : ''}
              />
            </button>
            <button 
              type="submit" 
              className="w-full max-w-[120px] h-[50px] bg-gradient-to-br from-[#4A25E1] to-[#7B5AFF] rounded-[45px] shadow-[0px_21px_27px_-10px_rgba(96,60,255,0.48)] flex justify-center items-center text-white text-sm font-normal font-['Aeonik_TRIAL'] leading-4 hover:opacity-90 transition-opacity"
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                  Analyzing
                </div>
              ) : 'Submit'}
            </button>
          </form>
          
          <div className="mt-2 text-xs text-gray-500">
            <p>Examples: "Compare TCS vs INFY" or "Need ₹3Cr home plan in 5 years"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export function PortfolioAnalyzerApp() {
  const [activeSection, setActiveSection] = useState("PortfolioAnalyzer");

  return (
    <div>
      <Navbar />
      <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
        <FinancialAdvisor />
      </DashboardLayout>
    </div>
  );
}

export default PortfolioAnalyzerApp;