import React, { useState } from 'react';
import { X, Info } from 'lucide-react';

export default function DisclaimerBanner() {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    return (
        <div className="bg-amber-50 border-b border-amber-200 px-3 py-2">
            <div className="flex items-start gap-2">
                <Info className="h-3.5 w-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-amber-800 leading-snug">
                        This is <strong>not officially endorsed or affiliated</strong> with The University of Melbourne or its related parties.
                    </p>
                    <p className="text-[10px] text-amber-700 leading-snug mt-0.5">
                        This is a student-led project made by <strong>Team BarryAI</strong>.
                    </p>
                </div>
                <button
                    onClick={() => setDismissed(true)}
                    className="flex-shrink-0 text-amber-500 hover:text-amber-700 transition-colors"
                >
                    <X className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
}