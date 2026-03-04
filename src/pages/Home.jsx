import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatButton from '@/components/chat/ChatButton';
import ChatWindow from '@/components/chat/ChatWindow';

export default function Home() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Demo header simulating UoM website */}
            <header className="bg-[#094183] text-white py-4 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold tracking-tight">
                            University of Melbourne
                        </div>
                    </div>
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        <a href="#" className="hover:underline">Study</a>
                        <a href="#" className="hover:underline">Research</a>
                        <a href="#" className="hover:underline">Engage</a>
                        <a href="#" className="hover:underline">About</a>
                    </nav>
                </div>
            </header>

            {/* Demo content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="bg-gradient-to-br from-[#094183] to-[#0d5299] rounded-3xl p-8 md:p-12 text-white mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                        Welcome to Melbourne
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-6">
                        Begin your journey at one of Australia's leading universities. 
                        Discover world-class education, research, and endless opportunities.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-white text-[#094183] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                            Explore Courses
                        </button>
                        <button className="bg-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors border border-white/30">
                            Virtual Tour
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {[
                        { title: "New Students", desc: "Everything you need to start your journey" },
                        { title: "Current Students", desc: "Services and support for your studies" },
                        { title: "International", desc: "Join our global community" }
                    ].map((card, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                            <p className="text-gray-600">{card.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
                    <p className="text-yellow-800">
                        👋 <strong>Need help?</strong> Click on Barry in the bottom right corner to chat with our AI assistant!
                    </p>
                </div>
            </main>

            {/* Barry Chat Widget */}
            <ChatButton 
                isOpen={isChatOpen} 
                onClick={() => setIsChatOpen(!isChatOpen)} 
            />
            
            <AnimatePresence>
                {isChatOpen && (
                    <ChatWindow 
                        isOpen={isChatOpen} 
                        onClose={() => setIsChatOpen(false)} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
}