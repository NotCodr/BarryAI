import React from 'react';
import { Mail, Grid3X3, Bell, BookOpen, HelpCircle, Clock, FileText, MapPin, Briefcase, Plus, Pencil } from 'lucide-react';

const LINKS_ROW_1 = [
    { icon: Mail, label: 'Email' },
    { icon: Grid3X3, label: 'M365' },
    { icon: Bell, label: 'Notices' },
    { icon: BookOpen, label: 'LMS' },
];

const LINKS_ROW_2 = [
    { icon: HelpCircle, label: 'Stop 1' },
    { icon: Clock, label: 'Timetable' },
    { icon: FileText, label: 'Study Plan' },
    { icon: BookOpen, label: 'Follow\nLifeatUnimelb' },
];

const LINKS_ROW_3 = [
    { icon: FileText, label: 'Handbook' },
    { icon: BookOpen, label: 'Library' },
    { icon: MapPin, label: 'Maps' },
    { icon: Briefcase, label: 'Employability' },
];

export default function QuickLinksGrid({ onNavigate }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <h3 className="font-bold text-[#0c1f42] text-sm">My quick links</h3>
                <Pencil className="h-3.5 w-3.5 text-[#003087] cursor-pointer" />
            </div>
            <div className="p-3 space-y-1">
                {[LINKS_ROW_1, LINKS_ROW_2, LINKS_ROW_3].map((row, ri) => (
                    <div key={ri} className="grid grid-cols-4 gap-1">
                        {row.map((link, li) => (
                            <button
                                key={li}
                                className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-lg hover:bg-[#f0f4ff] transition-colors group"
                                onClick={() => link.label === 'LMS' && onNavigate && onNavigate('lms')}
                            >
                                <link.icon className="h-5 w-5 text-[#003087] group-hover:text-[#001a4d]" />
                                <span className="text-[10px] text-center text-gray-600 leading-tight whitespace-pre-line">{link.label}</span>
                            </button>
                        ))}
                    </div>
                ))}
                {/* Plus buttons row */}
                <div className="grid grid-cols-4 gap-1">
                    {[0, 1, 2, 3].map(i => (
                        <button key={i} className="flex items-center justify-center py-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <Plus className="h-5 w-5 text-gray-300" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}