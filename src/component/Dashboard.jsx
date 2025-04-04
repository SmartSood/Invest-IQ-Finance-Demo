import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbarModule";
import DashboardLayout from "./DashboardLayout";
import { Client } from "@gradio/client";
import TranslatorText from './Text';
import { useTranslationContext } from '../context/TranslationContext';
import { translateText } from '../services/translationService';
import { Chatbot } from "./ChatBot";

export function Dashboard() {
  const navigate = useNavigate();
  const { t, language } = useTranslationContext();
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(t("All Finance News"));
  const [searchMode, setSearchMode] = useState("category");
  const [customQuery, setCustomQuery] = useState("");
  const [location, setLocation] = useState(t("All India")); // Added location state
  const [newsResults, setNewsResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);
  const [gradioClient, setGradioClient] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState({ // Added dropdown options
    categoryOptions: [t("All Finance News")],
    locationOptions: [t("All India")]
  });

  const slides = [
    {
      id: 1,
      imageUrl: "https://images.pexels.com/photos/6771882/pexels-photo-6771882.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: t("Financial Planning"),
      description: t("Learn smart budgeting techniques")
    },
    {
      id: 2,
      imageUrl: "https://images.pexels.com/photos/3943727/pexels-photo-3943727.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: t("Investment Strategies"),
      description: t("Grow your wealth effectively")
    },
    {
      id: 3,
      imageUrl: "https://images.pexels.com/photos/7063771/pexels-photo-7063771.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: t("Savings Tips"),
      description: t("Build your financial safety net")
    }
  ];

  const categories = [
    "All Finance News",
    "Stock Market",
    "Banking & RBI",
    "Taxation",
    "Investments",
    "Economic Indicators",
    "Corporate Finance",
    "Personal Finance"
  ];

  const locations = [ // Added locations array
    "All India",
    "Delhi NCR",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    
    const initializeClient = async () => {
      try {
        const client = await Client.connect("ayushraj0906/FinNews");
        setGradioClient(client);
        
        // Initialize dropdown options
        const toggleResult = await client.predict("/toggle_search_ui", {
          search_mode: searchMode
        });
        
        if (toggleResult?.data && toggleResult.data.length >= 2) {
          setDropdownOptions({
            categoryOptions: categories.map(cat => t(cat)),
            locationOptions: locations.map(loc => t(loc))
          });
        }
      } catch (error) {
        console.error("Failed to initialize Gradio client:", error);
        setError(t("Failed to connect to news service. Please refresh the page."));
      }
    };
    
    initializeClient();

    return () => clearInterval(interval);
  }, [slides.length, t]);

  const handleArticleClick = (articleUrl) => {
    if (articleUrl && articleUrl !== "#") {
      window.open(articleUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const translateContent = async (text) => {
    if (language === 'en') return text;
    
    try {
      setIsTranslating(true);
      const translated = await translateText(text, language);
      return translated;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  };

  const processNewsContent = async (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    const body = doc.body;
    const textNodes = [];
    const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null, false);
    
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent.trim()) {
        textNodes.push(node);
      }
    }
    
    for (const node of textNodes) {
      const translated = await translateContent(node.textContent);
      node.textContent = translated;
    }
    
    const articleElements = body.querySelectorAll('[data-article], article, .news-item');
    
    if (articleElements.length > 0) {
      return Array.from(articleElements).map(article => ({
        content: article.innerHTML,
        link: article.querySelector('a')?.href || "#"
      }));
    }
    
    return [{
      content: body.innerHTML,
      link: body.querySelector('a')?.href || "#"
    }];
  };

  const handleGetNews = async () => {
    if (!gradioClient) {
      setError(t("News service is not ready yet. Please wait..."));
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      let result;
      const params = {
        search_mode: searchMode,
        category_query: selectedCategory,
        custom_query: searchMode === "custom" ? customQuery : "N/A",
        location: location // Added location to params
      };

      if (searchMode === "category") {
        result = await gradioClient.predict("/news_interface", params);
      } else {
        result = await gradioClient.predict("/news_interface_1", params);
      }

      if (!result?.data) {
        throw new Error(t("No data received from API"));
      }

      const processedNews = await processNewsContent(result.data);
      
      if (processedNews.length === 0) {
        setNewsResults([{
          content: `<p>${t("No recent news found for")} ${selectedCategory}. ${t("Try another category or search term.")}</p>`,
          link: "#"
        }]);
      } else {
        setNewsResults(processedNews);
      }

    } catch (error) {
      console.error("Error fetching news:", error);
      setError(`${t("Failed to fetch news")}: ${error.message}`);
      setNewsResults([{
        content: `<p>${t("Error loading news content. Please try again later.")}</p>`,
        link: "#"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchModeChange = async (mode) => {
    setSearchMode(mode);
    if (gradioClient) {
      try {
        const result = await gradioClient.predict("/toggle_search_ui", {
          search_mode: mode
        });
        
        if (result?.data && result.data.length >= 2) {
          setDropdownOptions({
            categoryOptions: categories.map(cat => t(cat)),
            locationOptions: locations.map(loc => t(loc))
          });
        }
      } catch (error) {
        console.error("Error toggling search UI:", error);
      }
    }
  };

  return (
    <div className="w-full">
      <Navbar />
      <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
        <div className="bg-gray-100 p-6 min-h-screen w-full flex flex-col">
          <div className="flex flex-col flex-1 gap-6" style={{ minHeight: 0 }}>
            
            {/* Image Carousel */}
            <div className="relative bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden" 
                 style={{ 
                   height: '35vh', 
                   minHeight: '250px', 
                   maxHeight: '350px', 
                   flexShrink: 0 
                 }}>
              <div className="relative h-full w-full">
                {slides.map((slide, index) => (
                  <div 
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="absolute inset-0">
                      <img 
                        src={slide.imageUrl} 
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-2xl font-bold text-white"><TranslatorText>{slide.title}</TranslatorText></h3>
                      <p className="text-white/90"><TranslatorText>{slide.description}</TranslatorText></p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </div>

            {/* News Container */}
            <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="p-6 flex-shrink-0 border-b border-gray-200">
                <h1 className="text-2xl font-bold mb-4 text-gray-800"><TranslatorText>Indian Finance News Agent</TranslatorText></h1>
                <p className="text-gray-600 mb-6"><TranslatorText>Get concise gists of financial news from India</TranslatorText></p>
                
                {(error || isTranslating) && (
                  <div className="mb-4">
                    {error && (
                      <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        <TranslatorText>{error}</TranslatorText>
                      </div>
                    )}
                    {isTranslating && (
                      <div className="p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
                        <TranslatorText>Translating news content...</TranslatorText>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mb-2">
                  <div className="flex items-center mb-4">
                    <span className="font-medium mr-2"><TranslatorText>Search Mode</TranslatorText></span>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-blue-600"
                          name="searchMode"
                          checked={searchMode === "category"}
                          onChange={() => handleSearchModeChange("category")}
                        />
                        <span className="ml-2"><TranslatorText>category</TranslatorText></span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-blue-600"
                          name="searchMode"
                          checked={searchMode === "custom"}
                          onChange={() => handleSearchModeChange("custom")}
                        />
                        <span className="ml-2"><TranslatorText>custom</TranslatorText></span>
                      </label>
                    </div>
                  </div>
                  
                  {searchMode === "category" ? (
                    <div className="mb-4">
                      <label className="block font-medium mb-2"><TranslatorText>Select Finance Category</TranslatorText></label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        {dropdownOptions.categoryOptions.map((category) => (
                          <option key={category} value={category}>
                            <TranslatorText>{category}</TranslatorText>
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <label className="block font-medium mb-2"><TranslatorText>Enter Custom Search Query</TranslatorText></label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t("e.g. RBI rate decision or Sensex today...")}
                        value={customQuery}
                        onChange={(e) => setCustomQuery(e.target.value)}
                      />
                    </div>
                  )}
                  
                  {/* Added Location Dropdown */}
                  <div className="mb-4">
                    <label className="block font-medium mb-2"><TranslatorText>Select Location</TranslatorText></label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      {dropdownOptions.locationOptions.map((loc) => (
                        <option key={loc} value={loc}>
                          <TranslatorText>{loc}</TranslatorText>
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <button
                    onClick={handleGetNews}
                    disabled={isLoading || isTranslating || (searchMode === "custom" && !customQuery.trim())}
                    className={`bg-black text-white px-4 py-2 rounded-3xl hover:bg-gray-400 transition-colors ${
                      isLoading || isTranslating ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? t('Fetching...') : isTranslating ? t('Translating...') : t('Get News')}
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {newsResults.length > 0 ? (
                  <div className="space-y-6">
                    <h3 className="font-medium mb-2"><TranslatorText>Latest News:</TranslatorText></h3>
                    {newsResults.map((news, index) => (
                      <div key={index} className="news-item mb-6 last:mb-0">
                        <div 
                          className="news-content mb-3 prose max-w-none" 
                          dangerouslySetInnerHTML={{ __html: news.content }}
                        />
                        {news.link !== "#" && (
                          <button
                            onClick={() => handleArticleClick(news.link)}
                            className="bg-black text-white px-4 py-2 rounded-3xl hover:bg-gray-400 transition-colors"
                          >
                            <TranslatorText>Read Full Article</TranslatorText>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  !isLoading && !isTranslating && !error && (
                    <div className="text-gray-500">
                      <TranslatorText>No news to display. Try searching for a different category or term.</TranslatorText>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
      <Chatbot></Chatbot>
    </div>
  );
};