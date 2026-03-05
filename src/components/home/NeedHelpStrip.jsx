import React from 'react';

export default function NeedHelpStrip({ onChatClick }) {
    return (
        <div className="bg-[#003087] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col items-start sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold mb-1">Need Help?</h3>
                    <p className="text-white/80 text-sm">Stop 1 can answer your questions and connect you with student services.</p>
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-3">
                    <a href="https://students.unimelb.edu.au/support-and-wellbeing/stop-1" target="_blank" rel="noreferrer"
                        className="bg-white/20 hover:bg-white/30 border border-white/40 px-5 py-2.5 text-sm font-semibold transition-colors text-center">
                        Contact Stop 1
                    </a>
                    <button onClick={onChatClick}
                        className="bg-[#00B2A9] hover:bg-[#009990] px-5 py-2.5 text-sm font-semibold transition-colors text-center">
                        Chat with BarryAI
                    </button>
                </div>
            </div>
        </div>
    );
}