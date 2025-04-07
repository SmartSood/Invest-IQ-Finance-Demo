import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCommentDots, faPaperPlane, faSpinner,
    faMicrophone, faMicrophoneSlash, faTimes,
    faExpand, faCompress, faLanguage,
    faVolumeUp, faVolumeMute
} from '@fortawesome/free-solid-svg-icons';
import { Client } from "@gradio/client";
import { useTranslationContext } from '../context/TranslationContext';
import { translateText } from '../services/translationService';

// Should be moved to environment variables in production
const GOOGLE_API_KEY = "AIzaSyAAvV790SgykzvhGIvBoqYYRh3rwoip_2Q";
const SPEECH_API_URL = "https://speech.googleapis.com/v1/speech:recognize";
const TEXT_TO_SPEECH_API_URL = "https://texttospeech.googleapis.com/v1/text:synthesize";

// Language code mapping for speech recognition
const getSpeechRecognitionLanguageCode = (appLanguage) => {
    const languageMap = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'es': 'es-ES',
        'fr': 'fr-FR',
        'de': 'de-DE',
        'ja': 'ja-JP',
        'zh': 'zh-CN',
        'ar': 'ar-SA',
        'ru': 'ru-RU',
        'pt': 'pt-PT',
    };
    return languageMap[appLanguage] || 'en-US';
};

// Get text-to-speech voice parameters
const getVoiceParams = (lang) => {
    const voiceMap = {
        'en': { languageCode: 'en-US', name: 'en-US-Wavenet-D' },
        'hi': { languageCode: 'hi-IN', name: 'hi-IN-Wavenet-A' },
        'es': { languageCode: 'es-ES', name: 'es-ES-Wavenet-B' },
        'fr': { languageCode: 'fr-FR', name: 'fr-FR-Wavenet-B' },
        'de': { languageCode: 'de-DE', name: 'de-DE-Wavenet-B' },
        'ja': { languageCode: 'ja-JP', name: 'ja-JP-Wavenet-B' },
        'zh': { languageCode: 'cmn-CN', name: 'cmn-CN-Wavenet-C' },
        'ar': { languageCode: 'ar-XA', name: 'ar-XA-Wavenet-B' },
        'ru': { languageCode: 'ru-RU', name: 'ru-RU-Wavenet-B' },
        'pt': { languageCode: 'pt-PT', name: 'pt-PT-Wavenet-B' },
    };
    return voiceMap[lang] || voiceMap['en'];
};

export function Chatbot() {
    const { t, language: currentAppLanguage, changeLanguage } = useTranslationContext();
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [client, setClient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [currentSpeakingId, setCurrentSpeakingId] = useState(null);

    const audioRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const streamRef = useRef(null);
    const clientInitializedRef = useRef(false);

    const toggleChatbot = () => setIsOpen(!isOpen);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    // Initialize client
    useEffect(() => {
        const initializeClient = async () => {
            try {
                if (!clientInitializedRef.current) {
                    const newClient = await Client.connect("ayushraj0906/FinBot");
                    setClient(newClient);
                    clientInitializedRef.current = true;

                    setMessages([{
                        text: t("Hello! I'm SAM bot. How can I help you today?"),
                        sender: "bot"
                    }]);
                }
            } catch (error) {
                console.error("Error initializing chatbot:", error);
                setMessages([{
                    text: t("Chatbot service is currently unavailable. Please try again later."),
                    sender: "system"
                }]);
            }
        };

        if (isOpen) initializeClient();

        return () => {
            if (mediaRecorderRef.current?.state === 'recording') {
                mediaRecorderRef.current.stop();
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [isOpen, t]);

    // Text-to-speech function
    const speakText = async (text, messageId) => {
        if (isSpeaking && audioRef.current) {
            audioRef.current.pause();
            setIsSpeaking(false);
            setCurrentSpeakingId(null);
            return;
        }

        try {
            setIsSpeaking(true);
            setCurrentSpeakingId(messageId);

            const voiceParams = getVoiceParams(currentAppLanguage);

            const response = await fetch(`${TEXT_TO_SPEECH_API_URL}?key=${GOOGLE_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input: { text },
                    voice: voiceParams,
                    audioConfig: {
                        audioEncoding: 'MP3',
                        speakingRate: 1.0,
                        pitch: 0,
                        volumeGainDb: 0
                    }
                })
            });

            const data = await response.json();
            if (data.audioContent) {
                const audioBlob = base64ToBlob(data.audioContent, 'audio/mp3');
                const audioUrl = URL.createObjectURL(audioBlob);

                if (audioRef.current) {
                    audioRef.current.pause();
                }

                audioRef.current = new Audio(audioUrl);
                audioRef.current.play();

                audioRef.current.onended = () => {
                    setIsSpeaking(false);
                    setCurrentSpeakingId(null);
                };

                audioRef.current.onerror = () => {
                    setIsSpeaking(false);
                    setCurrentSpeakingId(null);
                };
            }
        } catch (error) {
            console.error("Text-to-speech error:", error);
            setIsSpeaking(false);
            setCurrentSpeakingId(null);
        }
    };

    const base64ToBlob = (base64, mimeType) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    };

    // Voice recording functions
    const startListening = async () => {
        try {
            setIsListening(true);
            setInput(prev => `${prev} 🎤 `);

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
                        text: t("Error processing voice input"),
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
                text: t("Please enable microphone permissions"),
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
        setInput(prev => prev.replace(" 🎤 ", "").trim());
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

            const recognitionLang = getSpeechRecognitionLanguageCode(currentAppLanguage);

            const response = await fetch(`${SPEECH_API_URL}?key=${GOOGLE_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    config: {
                        encoding: 'WEBM_OPUS',
                        sampleRateHertz: 48000,
                        languageCode: recognitionLang,
                        enableAutomaticPunctuation: true,
                        speechContexts: [{
                            phrases: ["50", "fifty", "nifty 50"],
                            boost: 20
                        }]
                    },
                    audio: { content: audioBase64 }
                })
            });

            const data = await response.json();
            let transcript = data.results?.[0]?.alternatives?.[0]?.transcript;

            if (transcript) {
                transcript = transcript.replace(/\b500\b/g, '50')
                    .replace(/\bfive hundred\b/g, 'fifty');

                setInput(prev => `${prev.replace(" 🎤 ", "")} ${transcript}`.trim());
            }
        } catch (error) {
            console.error("Speech API error:", error);
            setMessages(prev => [...prev, {
                text: t("Voice recognition failed"),
                sender: "system"
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!client || !input.trim() || isLoading) return;

        const userMessage = { text: input, sender: "user" };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const history = messages.reduce((acc, msg, i, arr) => {
                if (msg.sender === 'user') {
                    acc.push([
                        msg.text,
                        arr[i + 1]?.sender === 'bot' ? arr[i + 1].text : null
                    ]);
                }
                return acc;
            }, []);

            let englishInput = input;
            if (currentAppLanguage !== 'en') {
                try {
                    englishInput = await translateText(input, 'en');
                } catch (error) {
                    console.error("Translation error:", error);
                    englishInput = input;
                }
            }

            const response = await client.predict("/chatbot_response", {
                message: englishInput,
                history: history
            });

            let chatbotResponse = "";
            if (Array.isArray(response?.data)) {
                const responseData = response.data[0];
                if (Array.isArray(responseData)) {
                    chatbotResponse = responseData[1]?.[1] ||
                        responseData[0]?.[1] ||
                        responseData[1] ||
                        responseData[0] ||
                        t("I didn't understand that. Could you rephrase?");
                } else if (typeof responseData === 'string') {
                    chatbotResponse = responseData;
                }
            } else if (response?.data) {
                chatbotResponse = response.data;
            }

            if (typeof chatbotResponse === 'string') {
                chatbotResponse = cleanResponse(chatbotResponse);
            }

            let translatedResponse = chatbotResponse;
            if (currentAppLanguage !== 'en' && chatbotResponse) {
                try {
                    translatedResponse = await translateText(chatbotResponse, currentAppLanguage);
                    translatedResponse = cleanResponse(translatedResponse);
                } catch (error) {
                    console.error("Translation error:", error);
                }
            }

            setMessages(prev => [...prev, {
                text: formatResponse(translatedResponse),
                sender: "bot"
            }]);

        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, {
                text: t("Sorry, I encountered an error"),
                sender: "bot"
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const cleanResponse = (text) => {
        if (!text) return text;

        text = text.replace(/\r\n/g, '\n')
            .replace(/[\u200B-\u200D\uFEFF]/g, '');

        text = text.replace(/^0+(Warning:|Disclaimer:)/gm, (match, p1) => p1);

        const sectionHeaders = [
            'Answer:', 'Explanation:', 'Related Topics:',
            'Actionable Steps:', 'Warning:', 'Disclaimer:',
            'Sources & References:', 'Suggested Follow-up Questions:'
        ];

        sectionHeaders.forEach(header => {
            const regex = new RegExp(`^\\s*[0•*]*\\s${header}`, 'gmi');
            text = text.replace(regex, `**${header}**`);
        });

        text = text.replace(/^(\d+\.|\|\-)\s/gm, '• ');

        return text.replace(/\\\\/g, '')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    };

    const formatResponse = (text) => {
        if (!text) return t("No response received");

        text = cleanResponse(text);

        const translations = {
            'Answer:': t('Answer') + ':',
            'Explanation:': t('Explanation') + ':',
            'Related Topics:': t('Related Topics') + ':',
            'Actionable Steps:': t('Actionable Steps') + ':',
            'Warning:': t('Warning') + ':',
            'Disclaimer:': t('Disclaimer') + ':',
            'Sources & References:': t('Sources & References') + ':',
            'Suggested Follow-up Questions:': t('Suggested Follow-up Questions') + ':'
        };

        Object.entries(translations).forEach(([original, translated]) => {
            text = text.replace(new RegExp(`\\*\\*${original}\\*\\*`, 'gi'), `${translated}`);
        });

        return text.replace(/\\(.?)\\/g, '\n\n$1*\n')
            .replace(/•/g, '\n•')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    };

    const clearChat = () => {
        setMessages([{
            text: t("Chat cleared. Ask me anything!"),
            sender: "bot"
        }]);
    };

    const FormattedMessage = ({ text, sender, id }) => (
        <div className="whitespace-pre-wrap">
            {text.split(/\\(.?)\\*/).map((part, i) => (
                <span key={i} className={i % 2 ? "font-semibold" : ""}>
                    {t(part)}
                    {i % 2 && <br />}
                </span>
            ))}
            {sender === 'bot' && (
                <button
                    onClick={() => speakText(text, id)}
                    className={`mt-1 ml-1 p-1 rounded-full ${currentSpeakingId === id ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:text-purple-600'}`}
                    aria-label={isSpeaking && currentSpeakingId === id ? t("Stop speaking") : t("Read aloud")}
                >
                    <FontAwesomeIcon
                        icon={isSpeaking && currentSpeakingId === id ? faVolumeMute : faVolumeUp}
                        className="text-sm"
                    />
                </button>
            )}
        </div>
    );

    return (
        <div className="font-sans">
            {/* Chat container */}
            <div className={`fixed ${isExpanded ? 'inset-0' : 'right-4 bottom-20 w-[800px]'} 
                bg-white p-6 rounded-lg shadow-lg z-50 ${isOpen ? '' : 'hidden'}`}
                style={isExpanded ? {} : { maxWidth: 'calc(100vw - 32px)', maxHeight: 'calc(100vh - 120px)' }}>

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-purple-600">{t("SAM Bot Assistant")}</h1>
                    <div className="flex gap-2">
                        <button onClick={toggleExpand} className="text-gray-500 hover:text-purple-600">
                            <FontAwesomeIcon icon={isExpanded ? faCompress : faExpand} />
                        </button>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-purple-600">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>

                {/* Quick actions */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <button onClick={() => setInput(t("What can you do?"))} className="quick-action-btn">
                        {t("Help")}
                    </button>
                    <button onClick={() => setInput(t("Tell me a joke"))} className="quick-action-btn">
                        {t("Joke")}
                    </button>
                    <button onClick={clearChat} className="quick-action-btn">
                        {t("Clear")}
                    </button>
                    <button
                        onClick={() => changeLanguage(currentAppLanguage === 'en' ? 'hi' : 'en')}
                        className="quick-action-btn flex items-center"
                    >
                        <FontAwesomeIcon icon={faLanguage} className="mr-1" />
                        {currentAppLanguage === 'en' ? 'हिंदी' : 'English'}
                    </button>
                </div>

                {/* Messages */}
                <div className={`mb-4 border rounded-lg p-3 bg-gray-50 overflow-y-auto ${isExpanded ? 'h-[calc(100%-220px)]' : 'h-[300px]'}`}>
                    {messages.length ? messages.map((msg, i) => (
                        <div key={i} className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                            <div className={`inline-block px-3 py-2 rounded-lg max-w-[90%] ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                <FormattedMessage text={msg.text} sender={msg.sender} id={i} />
                            </div>
                        </div>
                    )) : (
                        <div className="text-center text-gray-500 py-8">
                            {t("How can I help you today?")}
                        </div>
                    )}
                    {isLoading && (
                        <div className="text-left">
                            <div className="inline-block px-3 py-2 rounded-lg bg-gray-200">
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                                {t("Thinking...")}
                            </div>
                        </div>
                    )}
                </div>

                {/* Input area */}
                <div className="flex items-center border rounded-full px-3 bg-white">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder={t("Type your message...")}
                        className="flex-1 py-2 px-3 outline-none text-sm bg-transparent"
                        disabled={isLoading}
                    />
                    <button
                        onClick={isListening ? stopListening : startListening}
                        disabled={isLoading}
                        className={`p-2 ${isListening ? 'text-red-500' : 'text-gray-500 hover:text-purple-600'}`}
                    >
                        <FontAwesomeIcon icon={isListening ? faMicrophoneSlash : faMicrophone} />
                    </button>
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || isLoading}
                        className="p-2 text-purple-600 hover:text-purple-800 disabled:opacity-50"
                    >
                        <FontAwesomeIcon icon={isLoading ? faSpinner : faPaperPlane} spin={isLoading} />
                    </button>
                </div>
            </div>

            {/* Toggle button */}
            <button
                onClick={toggleChatbot}
                className={`fixed bottom-4 right-4 p-4 rounded-full shadow-lg z-40 transition-all ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'} text-white`}
            >
                <FontAwesomeIcon icon={isOpen ? faTimes : faCommentDots} size="lg" />
            </button>

            <style jsx>{`
                .quick-action-btn {
                    border: 1px solid #9c27b0;
                    color: black;
                    border-radius: 9999px;
                    padding: 0.5rem 1rem;
                    font-size: 0.875rem;
                    transition: all 0.2s;
                }
                .quick-action-btn:hover {
                    background-color: #f3e5f5;
                }
            `}</style>
        </div>
    );
}