import React from 'react';
import { ArrowRight } from 'lucide-react';

const LINKS = [
    { title: 'Courses', desc: 'Find the right course and see why studying with us is different.', href: 'https://study.unimelb.edu.au' },
    { title: 'Research', desc: "Find out how we're making a difference.", href: 'https://research.unimelb.edu.au' },
    { title: 'Partnership', desc: 'Innovate with our people, technology and outstanding facilities.', href: 'https://research.unimelb.edu.au/work-with-us' },
    { title: 'Events', desc: 'Connect with our community, in person and online.', href: 'https://events.unimelb.edu.au' },
];

export default function QuickLinks() {
    return (
        <div className="border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
                    {LINKS.map(item => (
                        <a key={item.title} href={item.href} target="_blank" rel="noreferrer"
                            className="group flex items-start justify-between px-5 py-6 hover:bg-gray-50 transition-colors">
                            <div>
                                <h3 className="font-bold text-[#0c1f42] text-[15px] mb-1">{item.title}</h3>
                                <p className="text-[13px] text-gray-500 leading-snug hidden md:block">{item.desc}</p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-[#003087] flex items-center justify-center flex-shrink-0 ml-3 group-hover:bg-[#0c1f42] transition-colors">
                                <ArrowRight className="h-4 w-4 text-white" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}