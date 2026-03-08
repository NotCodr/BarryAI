import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const DAYS = [
    { date: '08', day: 'Sun', active: true },
    { date: '09', day: 'Mon' },
    { date: '10', day: 'Tue' },
    { date: '11', day: 'Wed' },
    { date: '12', day: 'Thu' },
    { date: '13', day: 'Fri' },
    { date: '14', day: 'Sat' },
];

export default function MyDayPanel() {
    const [activeTab, setActiveTab] = useState('day');

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
                <button
                    onClick={() => setActiveTab('day')}
                    className={`px-5 py-3 text-sm font-bold transition-colors ${
                        activeTab === 'day' 
                            ? 'text-[#003087] border-b-2 border-[#003087]' 
                            : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    My Day
                </button>
                <button
                    onClick={() => setActiveTab('exams')}
                    className={`px-5 py-3 text-sm font-bold transition-colors ${
                        activeTab === 'exams' 
                            ? 'text-[#003087] border-b-2 border-[#003087]' 
                            : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    My Exams
                </button>
            </div>

            <div className="p-4">
                {/* Key dates link */}
                <p className="text-xs text-gray-600 mb-4">
                    Check <a href="#" className="text-[#003087] underline font-medium">key dates</a> to help you manage your studies and enrolment.
                    <ExternalLink className="h-3 w-3 inline ml-1 text-[#003087]" />
                </p>

                {/* Calendar strip */}
                <div className="flex gap-0 mb-4 border-b border-gray-200">
                    {DAYS.map((d, i) => (
                        <div
                            key={i}
                            className={`flex-1 text-center py-2 cursor-pointer transition-colors ${
                                d.active 
                                    ? 'border-b-2 border-[#003087] text-[#003087]' 
                                    : 'text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            <div className={`text-lg font-bold ${d.active ? 'text-[#003087]' : ''}`}>{d.date}</div>
                            <div className="text-[10px]">{d.day}</div>
                        </div>
                    ))}
                </div>

                {/* Day content */}
                <div>
                    <h4 className="text-sm font-semibold text-[#0c1f42] border-b border-gray-200 pb-2 mb-4">
                        Sunday - 08 March
                    </h4>
                    <p className="text-sm text-gray-400 italic">You have no events.</p>
                </div>
            </div>
        </div>
    );
}