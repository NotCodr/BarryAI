import React from 'react';
import MyUniMelbHeader from './MyUniMelbHeader';
import StudentProfile from './StudentProfile';
import QuickLinksGrid from './QuickLinksGrid';
import MyDayPanel from './MyDayPanel';
import PromoBanner from './PromoBanner';

export default function MyUniMelbDashboard({ onNavigate }) {
    return (
        <div className="min-h-screen bg-[#e8e8e8]">
            <MyUniMelbHeader />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-[260px_1fr_1fr] gap-4">
                    {/* Left column - Profile */}
                    <div>
                        <StudentProfile />
                    </div>
                    {/* Middle column - Quick Links */}
                    <div>
                        <QuickLinksGrid onNavigate={onNavigate} />
                    </div>
                    {/* Right column - My Day */}
                    <div>
                        <MyDayPanel />
                    </div>
                </div>
                <PromoBanner />
            </div>
        </div>
    );
}