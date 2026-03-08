import React from 'react';
import { User, LayoutDashboard, BookOpen, Users, Calendar, Mail, History, HelpCircle, BookMarked, Sparkles, ArrowLeftFromLine } from 'lucide-react';

const NAV_ITEMS = [
    { icon: User, label: 'Account' },
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: BookOpen, label: 'Subjects' },
    { icon: Users, label: 'Groups' },
    { icon: Calendar, label: 'Calendar' },
    { icon: Mail, label: 'Inbox', badge: '1' },
    { icon: History, label: 'History' },
    { icon: HelpCircle, label: 'LMS support' },
    { icon: BookMarked, label: 'Library' },
    { icon: Sparkles, label: 'Study skills' },
    { icon: ArrowLeftFromLine, label: 'Student\nsupport' },
];

export default function LMSSidebar() {
    return (
        <div className="w-[60px] min-h-screen bg-[#0c1f42] flex flex-col items-center py-2 shrink-0">
            <div className="mb-2 p-1">
                <img
                    src="https://about.unimelb.edu.au/__data/assets/image/0025/31966/uom-logo.png"
                    alt="UoM"
                    className="h-10 w-10 object-contain"
                />
            </div>
            <div className="flex flex-col items-center gap-0.5 w-full">
                {NAV_ITEMS.map((item, i) => (
                    <button
                        key={i}
                        className="flex flex-col items-center gap-0.5 py-2 px-1 w-full hover:bg-white/10 transition-colors group"
                    >
                        <item.icon className="h-4 w-4 text-white/80 group-hover:text-white" />
                        {item.badge && (
                            <span className="absolute mt-[-2px] ml-3 bg-red-500 text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center">{item.badge}</span>
                        )}
                        <span className="text-[9px] text-white/70 text-center leading-tight whitespace-pre-line">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}