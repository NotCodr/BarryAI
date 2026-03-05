import React from 'react';
import { ArrowRight } from 'lucide-react';

const FEATURED = {
    tag: 'Newsroom',
    title: 'Seventh cohort of Hansen Scholars joins the University of Melbourne',
    desc: 'The Hansen Scholarship Program provides fully-funded accommodation and scholarship support during undergraduate studies.',
    img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    href: 'https://www.unimelb.edu.au/newsroom',
};

const STORIES = [
    { tag: 'Newsroom', title: 'Seventh cohort of Hansen Scholars joins the University of Melbourne', href: 'https://www.unimelb.edu.au/newsroom' },
    { tag: 'Pursuit', title: "'Why I think I have AI anxiety'", href: 'https://pursuit.unimelb.edu.au' },
    { tag: 'Pursuit', title: 'How Indigenous business enterprise is rewriting Australian economics', href: 'https://pursuit.unimelb.edu.au' },
];

export default function NewsSection() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
            {/* Featured story */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-3">{FEATURED.tag}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0c1f42] leading-snug mb-3">{FEATURED.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{FEATURED.desc}</p>
                    <a href={FEATURED.href} target="_blank" rel="noreferrer"
                        className="text-[#0c1f42] text-sm font-semibold flex items-center gap-1.5 hover:underline">
                        <ArrowRight className="h-3.5 w-3.5" /> Read more
                    </a>
                </div>
                <div>
                    <img src={FEATURED.img} alt={FEATURED.title} className="w-full h-64 sm:h-80 object-cover" />
                </div>
            </div>

            {/* Story links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-200 pt-8">
                {STORIES.map((story, i) => (
                    <a key={i} href={story.href} target="_blank" rel="noreferrer"
                        className="group">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em]">{story.tag}</span>
                        <h4 className="text-sm font-bold text-[#0c1f42] mt-1.5 leading-snug flex items-start gap-1.5 group-hover:underline">
                            <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                            {story.title}
                        </h4>
                    </a>
                ))}
            </div>
        </div>
    );
}