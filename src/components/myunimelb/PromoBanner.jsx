import React from 'react';

export default function PromoBanner() {
    return (
        <div className="mt-6 rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <div className="relative h-32 sm:h-40 bg-[#0c1f42] flex items-center">
                <div className="px-6 sm:px-8 flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#e6a817] leading-tight">
                        Employability Week
                    </h2>
                </div>
                <div className="flex items-center gap-0 h-full">
                    <img
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80"
                        alt="Students"
                        className="h-full w-32 sm:w-48 object-cover"
                    />
                    <div className="bg-[#e6a817] h-full flex items-center px-4 sm:px-6">
                        <span className="text-[#0c1f42] font-bold text-sm sm:text-base whitespace-nowrap">16-20 March</span>
                    </div>
                </div>
            </div>
        </div>
    );
}