import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function DisclaimerBar() {
    const [visible, setVisible] = useState(true);
    if (!visible) return null;

    return (
        <div className="bg-[#e6a817] text-[#0c1f42] relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-semibold flex-1">
                    This is <span className="underline">not</span> the official University of Melbourne website. This is a student-led project by Team BarryAI and is not affiliated with, endorsed by, or connected to the University of Melbourne.
                </p>
                <button onClick={() => setVisible(false)} className="flex-shrink-0 p-1 hover:bg-black/10 rounded transition-colors" aria-label="Dismiss">
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}