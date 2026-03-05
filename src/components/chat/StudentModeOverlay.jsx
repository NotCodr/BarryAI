import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { GraduationCap, Sparkles } from 'lucide-react';

const LMS_BG = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a899204895a2076449c374/e291a2ef5_BackgroundPhoto.png";

const STUDENT_PROMPTS = [
    "Are there any internships that the uni posted, can you check my email please?",
    "What assignments are due this week",
    "When is my exam for Principles of Finance"
];

export default function StudentModeOverlay({ onComplete }) {
    const [step, setStep] = useState('welcome'); // 'welcome' | 'prompts'

    if (step === 'welcome') {
        return (
            <div className="absolute inset-0 z-10 flex flex-col">
                <div className="absolute inset-0">
                    <img src={LMS_BG} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#003087]/85 backdrop-blur-sm" />
                </div>
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center">
                    <div className="h-16 w-16 rounded-full bg-white/15 flex items-center justify-center mb-5 border border-white/20">
                        <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Student Mode</h3>
                    <p className="text-white/85 text-sm leading-relaxed mb-8">
                        Hey! This is Barry — but now imagine I'm a part of your LMS!
                    </p>
                    <Button
                        onClick={() => setStep('prompts')}
                        className="bg-white text-[#003087] hover:bg-white/90 font-semibold px-8 py-2.5 rounded-full"
                    >
                        Okay, continue
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 z-10 flex flex-col">
            <div className="absolute inset-0">
                <img src={LMS_BG} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#003087]/85 backdrop-blur-sm" />
            </div>
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
                <Sparkles className="h-6 w-6 text-[#00B2A9] mb-3" />
                <h3 className="text-white font-bold text-base mb-2">Personalise Barry?</h3>
                <p className="text-white/80 text-sm mb-5">
                    Do you want to personalise me? Otherwise, let's get straight into it!
                </p>
                <p className="text-white/60 text-[11px] uppercase tracking-wider font-medium mb-3">You can ask me things like:</p>
                <div className="space-y-2 w-full mb-6">
                    {STUDENT_PROMPTS.map((prompt, i) => (
                        <div key={i} className="bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-white/90 text-xs text-left leading-relaxed">
                            "{prompt}"
                        </div>
                    ))}
                </div>
                <div className="flex gap-3 w-full">
                    <Button
                        variant="outline"
                        onClick={() => onComplete(false)}
                        className="flex-1 border-white/30 text-white hover:bg-white/10 bg-transparent rounded-full text-xs"
                    >
                        Skip for now
                    </Button>
                    <Button
                        onClick={() => onComplete(true)}
                        className="flex-1 bg-[#00B2A9] hover:bg-[#009990] text-white rounded-full text-xs"
                    >
                        Personalise me
                    </Button>
                </div>
            </div>
        </div>
    );
}