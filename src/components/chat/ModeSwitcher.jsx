import React from 'react';
import { GraduationCap, Globe } from 'lucide-react';

export default function ModeSwitcher({ isStudentMode, onToggle }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/10 flex-shrink-0">
            <button
                onClick={() => !isStudentMode && onToggle()}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                    !isStudentMode
                        ? 'bg-white text-[#003087] shadow-sm'
                        : 'text-white/60 hover:text-white/80'
                }`}
            >
                <Globe className="h-3 w-3" />
                Visitor
            </button>
            <button
                onClick={() => isStudentMode ? null : onToggle()}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                    isStudentMode
                        ? 'bg-white text-[#003087] shadow-sm'
                        : 'text-white/60 hover:text-white/80'
                }`}
            >
                <GraduationCap className="h-3 w-3" />
                Student Mode
            </button>
        </div>
    );
}