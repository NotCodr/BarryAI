import React from 'react';
import { GraduationCap, Globe } from 'lucide-react';

export default function ModeSwitcher({ isStudentMode, onToggle }) {
    return (
        <div className="flex items-center gap-1 px-3 py-1.5 bg-[#002060] flex-shrink-0">
            <div className="flex w-full bg-white/10 rounded-full p-0.5">
                <button
                    onClick={onToggle}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-300 ${
                        !isStudentMode
                            ? 'bg-white text-[#003087] shadow-sm'
                            : 'text-white/50 hover:text-white/80'
                    }`}
                >
                    <Globe className="h-3 w-3" />
                    Visitor
                </button>
                <button
                    onClick={onToggle}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-300 ${
                        isStudentMode
                            ? 'bg-white text-[#003087] shadow-sm'
                            : 'text-white/50 hover:text-white/80'
                    }`}
                >
                    <GraduationCap className="h-3 w-3" />
                    Student Mode
                </button>
            </div>
        </div>
    );
}