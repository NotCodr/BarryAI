import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, ChevronDown, ArrowRight, Menu, X, LogOut } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ChatButton from '@/components/chat/ChatButton';
import ChatWindow from '@/components/chat/ChatWindow';
import DisclaimerBar from '@/components/home/DisclaimerBar';
import HeroSection from '@/components/home/HeroSection';
import QuickLinks from '@/components/home/QuickLinks';
import StudentResources from '@/components/home/StudentResources';
import NeedHelpStrip from '@/components/home/NeedHelpStrip';
import NewsSection from '@/components/home/NewsSection';
import AcknowledgementFooter from '@/components/home/AcknowledgementFooter';
import SiteFooter from '@/components/home/SiteFooter';

export default function Home() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        base44.auth.isAuthenticated().then(setIsAuthenticated);
    }, []);

    const handleChatClick = async () => {
        if (isChatOpen) {
            setIsChatOpen(false);
            return;
        }
        const authed = await base44.auth.isAuthenticated();
        if (!authed) {
            base44.auth.redirectToLogin(window.location.href);
            return;
        }
        setIsChatOpen(true);
    };

    const handleSignOut = () => {
        base44.auth.logout(window.location.href);
    };

    return (
        <div className="min-h-screen bg-white font-sans">

            {/* Disclaimer Banner */}
            <DisclaimerBar />

            {/* Top utility bar */}
            <div className="bg-[#0c1f42] text-white hidden sm:block">
                <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center py-2">
                        <img 
                            src="https://d2glwx35mhbfwf.cloudfront.net/v13.4.1/logo-with-padding.svg" 
                            alt="University of Melbourne" 
                            className="h-[58px]"
                        />
                    </div>
                    <div className="flex items-center">
                        <div className="flex text-[11px] tracking-wider uppercase divide-x divide-white/20">
                            {['Students', 'Library', 'Staff', 'Alumni', 'Giving', 'Contact'].map(item => (
                                <a key={item} href="#" className="px-4 py-3 hover:underline transition-colors">{item}</a>
                            ))}
                        </div>
                        <button className="ml-2 p-2.5 bg-[#003087] hover:bg-white/20 transition-colors">
                            <Search className="h-4 w-4" />
                        </button>
                        {isAuthenticated && (
                            <button onClick={handleSignOut} className="ml-1 px-3 py-2 hover:bg-white/10 transition-colors flex items-center gap-1.5 text-[11px] uppercase tracking-wider" title="Sign out">
                                <LogOut className="h-3.5 w-3.5" />
                                <span>Sign out</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Secondary nav */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-12">
                    {/* Mobile logo */}
                    <div className="flex items-center gap-2 sm:hidden">
                        <span className="text-[9px] font-semibold text-[#0c1f42] tracking-widest uppercase leading-none">The University of</span>
                        <span className="text-base font-bold text-[#0c1f42] tracking-tight">Melbourne</span>
                    </div>
                    <div className="hidden sm:block" /> {/* spacer on desktop */}
                    <div className="hidden md:flex items-center gap-0">
                        {['Study', 'Research', 'About us'].map(item => (
                            <a key={item} href="#" className="flex items-center gap-1 text-sm text-gray-700 hover:text-[#0c1f42] transition-colors px-5 py-3 border-b-2 border-transparent hover:border-[#003087]">
                                {item}
                                <ChevronDown className="h-3.5 w-3.5" />
                            </a>
                        ))}
                    </div>
                    <div className="sm:hidden flex items-center gap-1">
                        {isAuthenticated && (
                            <button onClick={handleSignOut} className="flex items-center justify-center h-9 w-9 text-[#0c1f42]" aria-label="Sign out">
                                <LogOut className="h-4 w-4" />
                            </button>
                        )}
                        <button className="flex items-center justify-center h-9 w-9 text-[#0c1f42]" aria-label="Search">
                            <Search className="h-4 w-4" />
                        </button>
                        <button
                            className="flex items-center justify-center h-9 w-9 text-[#0c1f42]"
                            onClick={() => setIsMobileMenuOpen(prev => !prev)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="sm:hidden overflow-hidden border-t border-gray-100"
                        >
                            <div className="py-2 px-4 space-y-1">
                                {['Study', 'Research', 'About us', 'Students', 'Library', 'Staff', 'Alumni', 'Giving', 'Contact'].map(item => (
                                    <a key={item} href="#" className="block py-2 text-sm text-gray-700 hover:text-[#003087]">{item}</a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <HeroSection />
            <QuickLinks />
            <StudentResources />
            <NeedHelpStrip onChatClick={handleChatClick} />
            <NewsSection />
            <AcknowledgementFooter />
            <SiteFooter />

            {/* Barry Chat Widget */}
            <ChatButton isOpen={isChatOpen} onClick={handleChatClick} />
            <AnimatePresence>
                {isChatOpen && (
                    <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
                )}
            </AnimatePresence>
        </div>
    );
}