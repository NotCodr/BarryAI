import React from 'react';
import { ArrowRight } from 'lucide-react';

const CARDS = [
    { title: 'New Students', desc: 'Orientation, enrolment guides, and everything you need to get started at UoM.', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80', href: 'https://students.unimelb.edu.au' },
    { title: 'Current Students', desc: 'Access the student portal, LMS, class timetables, and academic support.', img: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=600&q=80', href: 'https://my.unimelb.edu.au' },
    { title: 'International Students', desc: 'Visa support, OSHC, cultural resources and community for international students.', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', href: 'https://students.unimelb.edu.au/support-and-wellbeing/support-for-international-students' },
];

export default function StudentResources() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            <h2 className="text-2xl font-bold text-[#0c1f42] mb-8">Student Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {CARDS.map(card => (
                    <a key={card.title} href={card.href} target="_blank" rel="noreferrer"
                        className="group block overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                        <div className="h-48 overflow-hidden">
                            <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-5">
                            <h3 className="font-bold text-[#0c1f42] mb-2 flex items-center justify-between text-[15px]">
                                {card.title}
                                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#003087]" />
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}