import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function AcknowledgementFooter() {
    return (
        <div className="bg-[#0c1f42] border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
                <div className="grid md:grid-cols-[240px_1fr] gap-6 items-start">
                    <div>
                        <h4 className="text-white font-bold text-sm mb-3">Acknowledgement of Country</h4>
                        <div className="flex gap-2">
                            <div className="w-8 h-5 rounded-sm overflow-hidden">
                                <div className="h-full w-full" style={{ background: 'linear-gradient(to bottom, #000 33%, #c00 33% 66%, #fc0 66%)' }}>
                                    <div className="flex items-center justify-center h-full">
                                        <div className="w-2 h-2 rounded-full bg-yellow-400 border border-yellow-500" style={{ marginTop: '-1px' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-8 h-5 rounded-sm overflow-hidden bg-[#003580] flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-[#003580] border-2 border-yellow-400"></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-white/80 text-sm leading-relaxed mb-3">
                            We acknowledge Aboriginal and Torres Strait Islander people as the Traditional Owners of the unceded lands on which we work, learn and live. We pay respect to Elders past, present and future, and acknowledge the importance of Indigenous knowledge in the Academy.
                        </p>
                        <a href="https://www.unimelb.edu.au/reconciliation" target="_blank" rel="noreferrer"
                            className="text-white text-sm font-semibold flex items-center gap-1.5 hover:underline">
                            <ArrowRight className="h-3.5 w-3.5" /> Read about our Indigenous priorities
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}