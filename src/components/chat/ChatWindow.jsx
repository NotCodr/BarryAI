import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Loader2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const BG_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a899204895a2076449c374/e291a2ef5_BackgroundPhoto.png";
import { motion } from 'framer-motion';
import MessageBubble from './MessageBubble';
import LanguageSwitcher from './LanguageSwitcher';
import VoiceInput from './VoiceInput';
import DisclaimerBanner from './DisclaimerBanner';
import ModeSwitcher from './ModeSwitcher';
import StudentModeOverlay from './StudentModeOverlay';
import WelcomeScreen from './WelcomeScreen';

const BARRY_AVATAR = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a899204895a2076449c374/6dad36f12_BarryAIProfile.png";
const BARRY_WELCOME = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a899204895a2076449c374/1a17c4ad9_BarryAIPrototypeNatualAestheticwithHeadsetNonCommercialUse.png";

const QUICK_PROMPTS = {
  en: ["Where are the libraries?", "How do I enrol in subjects?", "Student support services", "UMSU clubs & societies"],
  zh: ["图书馆在哪里？", "如何选课？", "学生支持服务", "社团活动"],
  hi: ["पुस्तकालय कहाँ हैं?", "विषयों में नामांकन कैसे करें?", "छात्र सहायता सेवाएं", "क्लब और समाज"],
  es: ["¿Dónde están las bibliotecas?", "¿Cómo me matriculo?", "Servicios de apoyo estudiantil", "Clubes y sociedades"]
};

const LANG_INSTRUCTIONS = {
  en: "Please respond in English.",
  zh: "请用简体中文回答。",
  hi: "कृपया हिंदी में उत्तर दें।",
  es: "Por favor responde en español."
};

const GREETING = {
  en: "Welcome to BarryAI. I am Barry, your University of Melbourne student assistant. I can help you navigate university services, enrollment, campus facilities, student support, and more. How may I assist you today?",
  zh: "欢迎使用 BarryAI。我是 Barry，您的墨尔本大学学生助手。我可以帮助您了解大学服务、选课、校园设施、学生支持等信息。请问有什么可以帮您的吗？",
  hi: "BarryAI में आपका स्वागत है। मैं Barry हूं, आपका University of Melbourne छात्र सहायक। मैं विश्वविद्यालय सेवाओं, नामांकन, परिसर सुविधाओं और छात्र सहायता में आपकी मदद कर सकता हूं। आज मैं आपकी किस प्रकार सहायता कर सकता हूं?",
  es: "Bienvenido a BarryAI. Soy Barry, tu asistente estudiantil de la Universidad de Melbourne. Puedo ayudarte con servicios universitarios, inscripción, instalaciones del campus y más. ¿En qué puedo asistirte hoy?"
};

export default function ChatWindow({ isOpen, onClose, onStudentModeChange }) {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [outOfBoundsCount, setOutOfBoundsCount] = useState(0);
  const [isStudentMode, setIsStudentMode] = useState(false);
  const [showStudentOverlay, setShowStudentOverlay] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {scrollToBottom();}, [messages]);

  useEffect(() => {
    if (isOpen && !conversation) {
      initConversation();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!conversation?.id) return;
    const unsubscribe = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages || []);
      const lastMessage = data.messages?.[data.messages.length - 1];
      if (lastMessage?.role === 'assistant') {
        setIsSending(false);
      }
    });
    return () => unsubscribe();
  }, [conversation?.id]);

  const initConversation = async () => {
    setIsLoading(true);
    const newConversation = await base44.agents.createConversation({
      agent_name: "barry_ai",
      metadata: { name: "BarryAI Chat" }
    });
    setConversation(newConversation);
    setMessages([{ role: 'assistant', content: GREETING['en'] }]);
    setIsLoading(false);
  };

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    if (conversation) {
      setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: GREETING[lang] }]
      );
    }
  };

  const sendMessage = async (content) => {
    if (!content.trim() || !conversation || isSending) return;
    setIsSending(true);
    setInputValue('');

    const messageWithLang = `[${LANG_INSTRUCTIONS[currentLang]}] ${content}`;
    setMessages((prev) => [...prev, { role: 'user', content }]);

    await base44.agents.addMessage(conversation, {
      role: 'user',
      content: messageWithLang
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleVoiceTranscript = (transcript) => {
    setInputValue(transcript);
  };

  const handleModeToggle = () => {
    if (isStudentMode) {
      // Switch back to visitor: clear chat, reset to welcome
      setIsStudentMode(false);
      setShowStudentOverlay(false);
      setMessages([{ role: 'assistant', content: GREETING[currentLang] }]);
    } else {
      // Switch to student mode: add system divider and show overlay
      setIsStudentMode(true);
      setShowStudentOverlay(true);
      setMessages(prev => [
        ...prev,
        { role: 'system', content: 'Switched to Student Mode' }
      ]);
    }
  };

  const handleStudentOverlayComplete = (wantsPersonalise) => {
    setShowStudentOverlay(false);
    // Add the student mode greeting
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: wantsPersonalise
        ? "Great! Let's personalise your experience. What course are you studying, and what year are you in? This will help me tailor my responses to your specific needs — like your timetable, assignments, and exam schedule."
        : "No worries! I'm ready to help. You can ask me about your classes, assignments, exams, internships, emails, and everything else — just like having a personal assistant built into your LMS. What would you like to know?"
    }]);
  };

  const STUDENT_QUICK_PROMPTS = [
    "What are my classes today?",
    "Assignments due this week",
    "When is my next exam?",
    "Check my uni email"
  ];

  const prompts = QUICK_PROMPTS[currentLang] || QUICK_PROMPTS.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] md:w-[400px] h-[620px] max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden z-50 flex flex-col border border-gray-200"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}>

            {/* Welcome Screen Overlay */}
            <AnimatePresence>
                {showWelcome && !isLoading && (
                    <WelcomeScreen onContinue={() => {
                        setIsTransitioning(true);
                        setShowWelcome(false);
                        setTimeout(() => setIsTransitioning(false), 700);
                    }} />
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="bg-[#003087] p-4 text-white flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="relative"
                            initial={isTransitioning ? { scale: 3, x: 100, y: 120 } : false}
                            animate={{ scale: 1, x: 0, y: 0 }}
                            transition={{ type: "spring", damping: 20, stiffness: 200, duration: 0.6 }}
                        >
                            <div className="h-11 w-11 rounded-full overflow-hidden border-2 border-white/40 shadow-lg">
                                <img src={isTransitioning ? BARRY_WELCOME : BARRY_AVATAR} alt="Barry" className="h-full w-full object-cover" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-green-400 rounded-full border-2 border-white"></div>
                        </motion.div>
                        <div>
                            <h3 className="font-bold text-base flex items-center gap-1.5">
                                BarryAI
                            </h3>
                            <p className="text-white/75 text-[11px]">University of Melbourne Student Assistant</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <LanguageSwitcher currentLang={currentLang} onLanguageChange={handleLanguageChange} />
                        <Button variant="ghost" size="icon" onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full h-8 w-8">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mode Switcher */}
            <ModeSwitcher isStudentMode={isStudentMode} onToggle={handleModeToggle} />

            {/* Disclaimer */}
            <DisclaimerBanner />

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 relative ${isStudentMode ? 'bg-[#001a4d]' : ''}`}
                 style={!isStudentMode ? {
                   backgroundImage: `url(${BG_IMAGE})`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center',
                 } : undefined}>
                {/* Background tint - only in visitor mode */}
                {!isStudentMode && <div className="absolute inset-0 bg-gray-50/90 pointer-events-none" />}

                {isLoading ?
        <div className="relative z-10 flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-[#003087]" />
                    </div> :

        <>
                        {messages.map((message, index) =>
          message.role === 'system' ? (
            <div key={index} className="relative z-10 flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-[#003087]/20" />
              <span className="text-[10px] font-semibold text-[#003087] uppercase tracking-wider bg-white/80 px-3 py-1 rounded-full border border-[#003087]/20">
                {message.content}
              </span>
              <div className="flex-1 h-px bg-[#003087]/20" />
            </div>
          ) : (
            <div key={index} className="relative z-10">
              <MessageBubble message={message} barryAvatar={BARRY_AVATAR} />
            </div>
          )
          )}

                        {isSending &&
          <div className="relative z-10 flex gap-3 items-start">
                                <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 shadow border border-white relative">
                                    <img src={BARRY_AVATAR} alt="Barry" className="h-full w-full object-cover" />
                                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#003087] animate-spin"></div>
                                </div>
                                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500 italic">Just a moment</span>
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 bg-[#003087] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-1.5 h-1.5 bg-[#003087] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-1.5 h-1.5 bg-[#003087] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
          }
                        <div ref={messagesEndRef} />
                    </>
        }
            </div>

            {/* Student Mode Overlay - covers entire chat body */}
            <AnimatePresence>
                {showStudentOverlay && (
                    <div className="absolute inset-0 z-40" style={{ top: 0 }}>
                        <StudentModeOverlay onComplete={handleStudentOverlayComplete} />
                    </div>
                )}
            </AnimatePresence>

            {/* Quick Prompts */}
            {messages.length <= 1 && !isLoading && !showStudentOverlay &&
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex-shrink-0">
                    <p className="text-[10px] text-gray-400 mb-1.5 uppercase tracking-wide font-medium">Suggested questions</p>
                    <div className="flex flex-wrap gap-1.5">
                        {(isStudentMode ? STUDENT_QUICK_PROMPTS : prompts).map((prompt, index) =>
          <button key={index} onClick={() => sendMessage(prompt)}
          className="text-[11px] px-3 py-1.5 bg-[#003087]/10 text-[#003087] rounded-full hover:bg-[#003087]/20 transition-colors font-medium">
                                {prompt}
                            </button>
          )}
                    </div>
                </div>
      }

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200 flex-shrink-0">
                <div className="flex gap-2 items-center">
                    <VoiceInput onTranscript={handleVoiceTranscript} disabled={isLoading || isSending} lang={currentLang} />
                    <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={currentLang === 'zh' ? '向 Barry 提问...' : currentLang === 'hi' ? 'Barry से पूछें...' : currentLang === 'es' ? 'Pregunta a Barry...' : 'Ask Barry a question...'}
            className="flex-1 rounded-full border-gray-200 text-sm h-10"
            disabled={isLoading || isSending} />

                    <Button type="submit" disabled={!inputValue.trim() || isLoading || isSending}
          className="rounded-full bg-[#003087] hover:bg-[#002060] h-10 w-10 p-0 flex-shrink-0">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-center text-[9px] text-gray-300 mt-2">
                    BarryAI · Team BarryAI · Not officially affiliated with The University of Melbourne
                </p>
            </form>
        </motion.div>);

}