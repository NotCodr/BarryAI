import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBubble from './MessageBubble';

const BARRY_AVATAR = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a899204895a2076449c374/ea56736be_generated_image.png";

const QUICK_PROMPTS = [
    "Where are the libraries?",
    "How do I join clubs?",
    "Help with enrollment",
    "Student support services"
];

export default function ChatWindow({ isOpen, onClose }) {
    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
        try {
            const newConversation = await base44.agents.createConversation({
                agent_name: "barry_ai",
                metadata: { name: "BarryAI Chat" }
            });
            setConversation(newConversation);
            setMessages([{
                role: 'assistant',
                content: "G'day! 👋 I'm Barry, your friendly University of Melbourne guide! Whether you're looking for the best study spots, need help with enrollment, or want to find your tribe through clubs and societies - I'm here to help! What can I help you with today?"
            }]);
        } catch (error) {
            console.error('Failed to create conversation:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async (content) => {
        if (!content.trim() || !conversation || isSending) return;
        
        setIsSending(true);
        setInputValue('');
        
        // Optimistically add user message
        setMessages(prev => [...prev, { role: 'user', content }]);
        
        try {
            await base44.agents.addMessage(conversation, {
                role: 'user',
                content
            });
        } catch (error) {
            console.error('Failed to send message:', error);
            setIsSending(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(inputValue);
    };

    const handleQuickPrompt = (prompt) => {
        sendMessage(prompt);
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] md:w-[400px] h-[600px] max-h-[80vh] bg-gradient-to-b from-[#f0f7ff] to-white rounded-3xl shadow-2xl overflow-hidden z-50 flex flex-col border border-[#094183]/10"
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#094183] to-[#0d5299] p-4 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white/30 shadow-lg">
                                <img 
                                    src={BARRY_AVATAR} 
                                    alt="Barry" 
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                BarryAI
                                <Sparkles className="h-4 w-4 text-yellow-300" />
                            </h3>
                            <p className="text-white/80 text-xs">Your UoM Student Guide</p>
                        </div>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={onClose}
                        className="text-white hover:bg-white/20 rounded-full"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-[#094183]" />
                    </div>
                ) : (
                    <>
                        {messages.map((message, index) => (
                            <MessageBubble 
                                key={index} 
                                message={message} 
                                barryAvatar={BARRY_AVATAR}
                            />
                        ))}
                        
                        {isSending && (
                            <div className="flex gap-3 items-start">
                                <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 shadow-md border-2 border-white">
                                    <img src={BARRY_AVATAR} alt="Barry" className="h-full w-full object-cover" />
                                </div>
                                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 bg-[#094183] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-[#094183] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-[#094183] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Quick Prompts */}
            {messages.length <= 1 && !isLoading && (
                <div className="px-4 pb-2">
                    <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-2">
                        {QUICK_PROMPTS.map((prompt, index) => (
                            <button
                                key={index}
                                onClick={() => handleQuickPrompt(prompt)}
                                className="text-xs px-3 py-1.5 bg-[#094183]/10 text-[#094183] rounded-full hover:bg-[#094183]/20 transition-colors"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-2">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask Barry anything..."
                        className="flex-1 rounded-full border-gray-200 focus:border-[#094183] focus:ring-[#094183]/20"
                        disabled={isLoading || isSending}
                    />
                    <Button 
                        type="submit"
                        disabled={!inputValue.trim() || isLoading || isSending}
                        className="rounded-full bg-[#094183] hover:bg-[#0d5299] h-10 w-10 p-0"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-center text-xs text-gray-400 mt-2">
                    Powered by University of Melbourne Student Services
                </p>
            </form>
        </motion.div>
    );
}