import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FileText, Menu } from 'lucide-react';

const SIDEBAR_LINKS = ['Home', 'Announcements', 'Modules', 'Ed Discussion', 'Assignments', 'Lecture Capture', 'Grades', 'Gradescope', 'Quizzes'];

const MODULE_SECTIONS = [
    {
        title: 'Subject and staff information',
        expanded: true,
        items: [
            'Subject guide and staff information',
            'Weekly Consultations',
            'List of Tutorials',
            'Pre-final exam Consults',
        ],
    },
    { title: 'Student support', expanded: false, items: [] },
    { title: 'Week-1 (Wed): Introduction to Microeconomics', expanded: false, items: [] },
    { title: 'Week-1 (Fri): Supply and Demand/ Market Equilibrium and Comparative Statics', expanded: false, items: [] },
];

export default function LMSContent({ onBack }) {
    const [expandedSections, setExpandedSections] = useState({ 0: true });

    const toggleSection = (idx) => {
        setExpandedSections(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    return (
        <div className="flex-1 min-h-screen bg-white">
            {/* Top breadcrumb bar */}
            <div className="bg-[#f5f5f5] border-b border-gray-200 px-4 py-2.5 flex items-center gap-2 text-sm">
                <button onClick={onBack} className="hover:bg-gray-200 p-1 rounded transition-colors">
                    <Menu className="h-4 w-4 text-gray-600" />
                </button>
                <span className="font-semibold text-[#0c1f42]">ECON10004_2026_SUM</span>
                <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-gray-600">Modules</span>
            </div>

            <div className="flex">
                {/* Left nav */}
                <div className="w-[170px] border-r border-gray-200 p-4 hidden md:block shrink-0">
                    <p className="text-[11px] text-gray-500 mb-3 italic">2026 Summer Term</p>
                    {SIDEBAR_LINKS.map((link, i) => (
                        <a
                            key={i}
                            href="#"
                            className={`block text-sm py-1 transition-colors ${
                                link === 'Modules'
                                    ? 'text-[#0c1f42] font-semibold'
                                    : 'text-[#003087] hover:underline'
                            }`}
                        >
                            {link}
                        </a>
                    ))}
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <button className="px-3 py-1.5 border border-gray-300 rounded text-xs hover:bg-gray-50">Collapse All</button>
                        <button className="px-3 py-1.5 border border-gray-300 rounded text-xs hover:bg-gray-50 flex items-center gap-1">
                            <span>⊕</span> Export Subject Content
                        </button>
                    </div>

                    <div className="space-y-2">
                        {MODULE_SECTIONS.map((section, idx) => (
                            <div key={idx} className="border-b border-gray-100">
                                <button
                                    onClick={() => toggleSection(idx)}
                                    className="flex items-center gap-2 py-3 w-full text-left hover:bg-gray-50 px-2 rounded transition-colors"
                                >
                                    {expandedSections[idx] ? (
                                        <ChevronDown className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                                    ) : (
                                        <ChevronRight className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                                    )}
                                    <span className="font-semibold text-sm text-[#0c1f42]">{section.title}</span>
                                </button>
                                {expandedSections[idx] && section.items.length > 0 && (
                                    <div className="pl-6 pb-3 space-y-1">
                                        {section.items.map((item, ii) => (
                                            <div key={ii} className="flex items-center gap-2 py-2 px-3 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                                                <FileText className="h-4 w-4 text-[#003087] shrink-0" />
                                                <span className="text-sm text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="w-[220px] p-4 border-l border-gray-200 hidden lg:block shrink-0">
                    <div className="space-y-2 mb-6">
                        <a href="#" className="flex items-center gap-1.5 text-sm text-[#003087] hover:underline">
                            📊 View Subject Stream
                        </a>
                        <a href="#" className="flex items-center gap-1.5 text-sm text-[#003087] hover:underline">
                            📅 View Subject Calendar
                        </a>
                        <a href="#" className="flex items-center gap-1.5 text-sm text-[#003087] hover:underline">
                            🔔 View Subject Notifications
                        </a>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-bold text-sm text-[#0c1f42] mb-2">To Do</h4>
                        <p className="text-xs text-gray-500">Nothing for now</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm text-[#0c1f42] mb-2">Recent Feedback</h4>
                        <div className="space-y-2">
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-green-600">✓</span>
                                    <a href="#" className="text-xs text-[#003087] hover:underline">Pre-tutorial Quiz for Week-6 (Fri)</a>
                                </div>
                                <p className="text-[11px] text-gray-500 ml-5">10 out of 10</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-green-600">✓</span>
                                    <a href="#" className="text-xs text-[#003087] hover:underline">Pre-tutorial Quiz for Week-6 (Wed)</a>
                                </div>
                                <p className="text-[11px] text-gray-500 ml-5">9 out of 9</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}