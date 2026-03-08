import React from 'react';
import { Search, ChevronDown, User } from 'lucide-react';

export default function MyUniMelbHeader() {
    return (
        <header className="bg-[#0c1f42] text-white sticky top-0 z-40">
            {/* Top nav */}
            <div className="flex items-center justify-between px-4 sm:px-6 h-12">
                <div className="flex items-center gap-4">
                    <img 
                        src="https://d2glwx35mhbfwf.cloudfront.net/v13.4.1/logo-with-padding.svg" 
                        alt="University of Melbourne" 
                        className="h-[36px] sm:h-[42px]"
                    />
                    <span className="text-sm font-medium tracking-wide hidden sm:inline">my.unimelb</span>
                </div>
                <div className="hidden md:flex items-center gap-1 text-[12px]">
                    <span className="px-3 py-1.5 hover:underline cursor-pointer uppercase tracking-wider">Maps</span>
                    <span className="px-3 py-1.5 hover:underline cursor-pointer uppercase tracking-wider">Library</span>
                    <span className="px-3 py-1.5 hover:underline cursor-pointer uppercase tracking-wider">Announcements</span>
                    <span className="px-3 py-1.5 hover:underline cursor-pointer uppercase tracking-wider">Notices</span>
                </div>
            </div>
            {/* Secondary nav */}
            <div className="bg-[#003087] flex items-center justify-between px-4 sm:px-6 h-10">
                <div className="flex items-center gap-1 text-[12px]">
                    <span className="px-3 py-1.5 hover:bg-white/10 cursor-pointer rounded flex items-center gap-1">
                        Student admin <ChevronDown className="h-3 w-3" />
                    </span>
                    <span className="px-3 py-1.5 hover:bg-white/10 cursor-pointer rounded flex items-center gap-1">
                        Peer and academic mentoring <ChevronDown className="h-3 w-3" />
                    </span>
                    <span className="px-3 py-1.5 hover:bg-white/10 cursor-pointer rounded hidden sm:inline">
                        Student services
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center">
                        <User className="h-4 w-4" />
                    </div>
                </div>
            </div>
            {/* Date / weather bar */}
            <div className="bg-[#f5f5f5] text-[#333] flex items-center justify-end px-4 sm:px-6 h-8 text-[12px] gap-3">
                <span>Today: <strong>8 March 2026</strong></span>
                <span className="flex items-center gap-1">☁️ Now 24°</span>
                <Search className="h-3.5 w-3.5 text-gray-500 cursor-pointer" />
            </div>
        </header>
    );
}