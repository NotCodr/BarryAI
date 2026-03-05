import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
    return (
        <div className="relative h-[340px] sm:h-[460px] md:h-[540px] overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80"
                alt="University of Melbourne campus"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c1f42]/95 via-[#0c1f42]/70 to-transparent" />
            <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
                    <div className="max-w-lg">
                        <h1 className="text-3xl sm:text-[42px] md:text-[50px] font-bold text-white leading-[1.1] mb-4 font-serif">
                            Welcome to the University of Melbourne
                        </h1>
                        <p className="text-white/90 text-base sm:text-lg mb-6 leading-relaxed">
                            Australia's leading university — shaping the next generation of thinkers, leaders and innovators.
                        </p>
                        <a href="https://study.unimelb.edu.au" target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-[#003087] hover:bg-[#002266] text-white px-6 py-3 text-sm font-semibold transition-colors rounded-sm">
                            <ArrowRight className="h-4 w-4" />
                            Explore Courses
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}