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
import MyUniMelbDashboard from '@/components/myunimelb/MyUniMelbDashboard';

export default function Home() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [appMode, setAppMode] = useState('visitor');

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

            {appMode === 'visitor' ? (
                <>
                    {/* Disclaimer Banner */}
                    <DisclaimerBar />

                    {/* Header */}
                    <header className="bg-[#0c1f42] text-white sticky top-0 z-40">
                        {/* Top row: logo + utility links */}
                        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
                            <div className="flex items-center py-1">
                                <img 
                                    src="https://d2glwx35mhbfwf.cloudfront.net/v13.4.1/logo-with-padding.svg" 
                                    alt="University of Melbourne" 
                                    className="h-[44px] sm:h-[58px]"
                                />
                            </div>
                            <div className="flex items-center">
                                <div className="hidden sm:flex text-[11px] tracking-wider uppercase">
                                    {['Students', 'Library', 'Staff', 'Alumni', 'Giving', 'Contact'].map(item => (
                                        <a key={item} href="#" className="px-3 py-2 hover:underline transition-colors">{item}</a>
                                    ))}
                                </div>
                                {isAuthenticated && (
                                    <button onClick={handleSignOut} className="px-2 py-2 hover:bg-white/10 transition-colors flex items-center gap-1 text-[11px] uppercase tracking-wider" title="Sign out">
                                        <LogOut className="h-3.5 w-3.5" />
                                        <span className="hidden sm:inline">Sign out</span>
                                    </button>
                                )}
                                <button className="ml-1 p-2.5 bg-[#003087] hover:bg-white/20 transition-colors">
                                    <Search className="h-4 w-4" />
                                </button>
                                <button
                                    className="sm:hidden ml-1 p-2 hover:bg-white/10 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(prev => !prev)}
                                    aria-label="Toggle menu"
                                >
                                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        {/* Bottom row: main nav right-aligned */}
                        <div className="max-w-7xl mx-auto px-4 sm:px-8 hidden md:flex justify-end border-t border-white/10">
                            {['Study', 'Research', 'About us'].map(item => (
                                <a key={item} href="#" className="flex items-center gap-1 text-[13px] text-white/80 hover:text-white transition-colors px-4 py-2">
                                    {item}
                                    <ChevronDown className="h-3.5 w-3.5" />
                                </a>
                            ))}
                        </div>
                        {/* Mobile menu */}
                        <AnimatePresence>
                            {isMobileMenuOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="sm:hidden overflow-hidden border-t border-white/10"
                                >
                                    <div className="py-2 px-6 space-y-1">
                                        {['Study', 'Research', 'About us', 'Students', 'Library', 'Staff', 'Alumni', 'Giving', 'Contact'].map(item => (
                                            <a key={item} href="#" className="block py-2 text-sm text-white/80 hover:text-white">{item}</a>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </header>

                    <HeroSection />
                    <QuickLinks />
                    <StudentResources />
                    <NeedHelpStrip onChatClick={handleChatClick} />
                    <NewsSection />
                    <AcknowledgementFooter />
                    <SiteFooter />
                </>
            ) : (
                <MyUniMelbDashboard />
            )}

            {/* Barry Chat Widget */}
            <ChatButton isOpen={isChatOpen} onClick={handleChatClick} />
            <AnimatePresence>
                {isChatOpen && (
                    <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} onModeChange={(mode) => setAppMode(mode)} />
                )}
            </AnimatePresence>
        </div>
    );
}