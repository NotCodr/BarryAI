import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const BARRY_AVATAR = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a899204895a2076449c374/6dad36f12_BarryAIProfile.png";

export default function ChatButton({ isOpen, onClick }) {
    return (
        <motion.button
            onClick={onClick}
            className="fixed bottom-6 right-4 md:right-6 z-50 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="relative">
                {/* Pulse animation when closed */}
                {!isOpen && (
                    <>
                        <div className="absolute inset-0 bg-[#094183] rounded-full animate-ping opacity-25"></div>
                        <div className="absolute inset-0 bg-[#094183] rounded-full animate-pulse opacity-40"></div>
                    </>
                )}
                
                {/* Main button */}
                <div className={`
                    relative h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300
                    ${isOpen 
                        ? 'bg-gray-600 hover:bg-gray-700' 
                        : 'bg-gradient-to-br from-[#094183] to-[#0d5299] hover:from-[#0d5299] hover:to-[#094183]'
                    }
                `}>
                    {isOpen ? (
                        <X className="h-6 w-6 text-white" />
                    ) : (
                        <div className="relative">
                            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white/50">
                                <img 
                                    src={BARRY_AVATAR} 
                                    alt="Barry" 
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                                <MessageCircle className="h-2 w-2 text-white" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Tooltip */}
                {!isOpen && (
                    <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                            Chat with Barry! 👋
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                        </div>
                    </div>
                )}
            </div>
        </motion.button>
    );
}