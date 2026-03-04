import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const LANGUAGES = [
    { code: 'en', label: 'EN', full: 'English' },
    { code: 'zh', label: '中文', full: 'Chinese' },
    { code: 'hi', label: 'हिंदी', full: 'Hindi' },
    { code: 'es', label: 'ES', full: 'Spanish' },
];

export default function LanguageSwitcher({ currentLang, onLanguageChange }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 text-white/80 hover:text-white text-xs px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
                title="Switch Language"
            >
                <Globe className="h-3.5 w-3.5" />
                <span>{LANGUAGES.find(l => l.code === currentLang)?.label || 'EN'}</span>
            </button>

            {open && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-10 min-w-[110px]">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => { onLanguageChange(lang.code); setOpen(false); }}
                            className={cn(
                                "w-full text-left px-3 py-2 text-xs hover:bg-[#094183]/10 transition-colors flex items-center gap-2",
                                currentLang === lang.code ? "bg-[#094183]/10 text-[#094183] font-semibold" : "text-gray-700"
                            )}
                        >
                            <span className="font-medium">{lang.label}</span>
                            <span className="text-gray-400">{lang.full}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}