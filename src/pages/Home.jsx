import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, ChevronRight, ArrowRight, Menu, X } from 'lucide-react';
import ChatButton from '@/components/chat/ChatButton';
import ChatWindow from '@/components/chat/ChatWindow';

const UOM_LOGO = "https://www.unimelb.edu.au/__data/assets/image/0007/3843821/UOM_logo_REV_RGB.png";

export default function Home() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white font-sans">

            {/* Top utility bar - desktop only */}
            <div className="bg-[#003087] text-white hidden sm:block">
                <div className="max-w-7xl mx-auto px-4 flex justify-end">
                    <div className="flex text-[11px] divide-x divide-white/20">
                        {['Students', 'Library', 'Staff', 'Alumni', 'Giving', 'Contact'].map(item => (
                            <a key={item} href="#" className="px-3 py-2 hover:bg-white/10 transition-colors">{item}</a>
                        ))}
                        <button className="px-3 py-2 hover:bg-white/10 transition-colors">
                            <Search className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main nav */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col leading-tight">
                            <span className="text-[9px] font-semibold text-[#003087] tracking-widest uppercase">The University of</span>
                            <span className="text-xl font-bold text-[#003087] tracking-tight">MELBOURNE</span>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
                        {['Study', 'Research', 'About'].map(item => (
                            <a key={item} href="#" className="flex items-center gap-1 hover:text-[#003087] transition-colors py-5 border-b-2 border-transparent hover:border-[#003087]">
                                {item}
                                <ChevronRight className="h-3.5 w-3.5 rotate-90" />
                            </a>
                        ))}
                    </div>
                    {/* Mobile right controls */}
                    <div className="sm:hidden flex items-center gap-1">
                        <button className="flex items-center justify-center h-9 w-9 text-[#003087]" aria-label="Search">
                            <Search className="h-4 w-4" />
                        </button>
                        <button
                            className="flex items-center justify-center h-9 w-9 text-[#003087]"
                            onClick={() => setIsMobileMenuOpen(prev => !prev)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile utility links - expands below header */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="sm:hidden overflow-hidden bg-[#003087]"
                        >
                            <div className="flex justify-between divide-x divide-white/20 text-[11px]">
                                {['Students', 'Library', 'Staff', 'Alumni', 'Giving', 'Contact'].map(item => (
                                    <a key={item} href="#" className="flex-1 text-center py-2.5 text-white hover:bg-white/10 transition-colors">{item}</a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Banner */}
            <div className="relative h-[360px] sm:h-[480px] md:h-[560px] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80"
                    alt="University of Melbourne campus"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[#003087]/90 via-[#003087]/60 to-transparent" />
                <div className="absolute inset-0 flex items-end sm:items-center pb-8 sm:pb-0">
                    <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 w-full">
                        <div className="max-w-lg">
                            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4">
                                Welcome to the University of Melbourne
                            </h1>
                            <p className="text-white/90 text-sm sm:text-lg mb-5 sm:mb-8 hidden sm:block">
                                Australia's leading university — shaping the next generation of thinkers, leaders and innovators.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <a href="https://study.unimelb.edu.au" target="_blank" rel="noreferrer"
                                    className="bg-[#00B2A9] hover:bg-[#009990] text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                                    Explore Courses <ArrowRight className="h-4 w-4" />
                                </a>
                                <a href="https://study.unimelb.edu.au/discover/virtual-tour" target="_blank" rel="noreferrer"
                                    className="bg-white/20 hover:bg-white/30 border border-white/50 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                                    Virtual Campus Tour
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 divide-x divide-gray-200">
                        {[
                            { title: 'Courses', desc: 'Find the right course and see why studying with us is different.', href: 'https://study.unimelb.edu.au' },
                            { title: 'Research', desc: "Find out how we're making a difference.", href: 'https://research.unimelb.edu.au' },
                            { title: 'Partnership', desc: 'Innovate with our people, technology and outstanding facilities.', href: 'https://research.unimelb.edu.au/work-with-us' },
                            { title: 'Events', desc: 'Connect with our community, in person and online.', href: 'https://events.unimelb.edu.au' },
                        ].map(item => (
                            <a key={item.title} href={item.href} target="_blank" rel="noreferrer"
                                className="group flex items-start justify-between px-4 sm:px-6 py-4 sm:py-6 hover:bg-gray-50 transition-colors">
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                                    <p className="text-xs text-gray-500 leading-snug hidden md:block">{item.desc}</p>
                                </div>
                                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#003087] flex items-center justify-center flex-shrink-0 ml-2 mt-0.5 group-hover:bg-[#00B2A9] transition-colors">
                                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Student Resources Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
                <h2 className="text-xl sm:text-2xl font-bold text-[#003087] mb-5 sm:mb-8">Student Resources</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {[
                        { title: 'New Students', desc: 'Orientation, enrolment guides, and everything you need to get started at UoM.', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80', href: 'https://students.unimelb.edu.au' },
                        { title: 'Current Students', desc: 'Access the student portal, LMS, class timetables, and academic support.', img: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=600&q=80', href: 'https://my.unimelb.edu.au' },
                        { title: 'International Students', desc: 'Visa support, OSHC, cultural resources and community for international students.', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', href: 'https://students.unimelb.edu.au/support-and-wellbeing/support-for-international-students' },
                    ].map(card => (
                        <a key={card.title} href={card.href} target="_blank" rel="noreferrer"
                            className="group block overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="h-44 overflow-hidden">
                                <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-[#003087] mb-2 flex items-center justify-between">
                                    {card.title}
                                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Need Help Strip */}
            <div className="bg-[#003087] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-start sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-1">Need Help?</h3>
                        <p className="text-white/80 text-sm">Stop 1 can answer your questions and connect you with student services.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-3">
                        <a href="https://students.unimelb.edu.au/support-and-wellbeing/stop-1" target="_blank" rel="noreferrer"
                            className="bg-[#00B2A9] hover:bg-[#009990] px-5 py-2.5 text-sm font-semibold transition-colors text-center">
                            Contact Stop 1
                        </a>
                        <button onClick={() => setIsChatOpen(true)}
                            className="bg-white/20 hover:bg-white/30 border border-white/40 px-5 py-2.5 text-sm font-semibold transition-colors text-center">
                            Chat with BarryAI
                        </button>
                    </div>
                </div>
            </div>

            {/* News */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
                <h2 className="text-xl sm:text-2xl font-bold text-[#003087] mb-5 sm:mb-8">News &amp; Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {[
                        { tag: 'Newsroom', title: 'Seventh cohort of Hansen Scholars joins the University of Melbourne', img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80', href: 'https://www.unimelb.edu.au/newsroom' },
                        { tag: 'Pursuit', title: 'How Indigenous business enterprise is rewriting Australian economics', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', href: 'https://pursuit.unimelb.edu.au' },
                    ].map(item => (
                        <a key={item.title} href={item.href} target="_blank" rel="noreferrer"
                            className="group flex gap-3 sm:gap-4 border border-gray-200 hover:shadow-md transition-shadow p-3 sm:p-4">
                            <img src={item.img} alt={item.title} className="w-20 h-20 sm:w-28 sm:h-28 object-cover flex-shrink-0" />
                            <div>
                                <span className="text-[10px] font-bold text-[#00B2A9] uppercase tracking-wider">{item.tag}</span>
                                <h4 className="text-sm font-semibold text-gray-900 mt-1 leading-snug group-hover:text-[#003087] transition-colors">{item.title}</h4>
                                <span className="text-[#003087] text-xs flex items-center gap-1 mt-2 font-medium">Read more <ArrowRight className="h-3 w-3" /></span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#002060] text-white py-8 sm:py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                        <div>
                            <div className="text-[9px] tracking-widest uppercase text-white/60 mb-0.5">The University of</div>
                            <div className="text-2xl font-bold tracking-tight">MELBOURNE</div>
                            <p className="text-white/50 text-xs mt-3 max-w-xs">Grattan St, Parkville VIC 3010, Australia</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                            {[
                                { head: 'Study', links: ['Courses', 'International', 'Scholarships', 'Accommodation'] },
                                { head: 'Student Life', links: ['Student Portal', 'Library', 'Health & Wellbeing', 'Stop 1'] },
                                { head: 'About', links: ['Faculties', 'Research', 'Campus Map', 'Contact'] },
                            ].map(col => (
                                <div key={col.head}>
                                    <h4 className="font-semibold text-white/90 mb-3 text-xs uppercase tracking-wider">{col.head}</h4>
                                    {col.links.map(l => (
                                        <a key={l} href="#" className="block text-white/50 hover:text-white text-xs mb-1.5 transition-colors">{l}</a>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
                        <p className="text-white/40 text-xs">© 2026 The University of Melbourne. ABN 84 002 705 224.</p>
                        <p className="text-white/30 text-[10px] text-center">
                            BarryAI is a student-led project by Team BarryAI and is not officially affiliated with the University of Melbourne.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Barry Chat Widget */}
            <ChatButton isOpen={isChatOpen} onClick={() => setIsChatOpen(!isChatOpen)} />

            <AnimatePresence>
                {isChatOpen && (
                    <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
                )}
            </AnimatePresence>
        </div>
    );
}